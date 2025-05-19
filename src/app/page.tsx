'use client';

import { useState } from "react";

type Aliment = {
  kcal: number;
  glucides: number;
  proteines: number;
  lipides: number;
  ratio: number;
  categorie: 'glucide' | 'proteine';
};

type Resultat = {
  nom: string;
  qCrue: string;
  qCuire: string;
  glucides: string;
  proteines: string;
  lipides: string;
  kcal: string;
};

const aliments: Record<string, Aliment> = {
  // Glucides
  "Riz basmati (cru)": { kcal: 353, glucides: 77.8, proteines: 7.7, lipides: 0.8, ratio: 3.2, categorie: 'glucide' },
  "Riz complet (cru)": { kcal: 362, glucides: 76, proteines: 7.5, lipides: 2.2, ratio: 3.1, categorie: 'glucide' },
  "Pâtes blé dur (crues)": { kcal: 353, glucides: 71, proteines: 12, lipides: 1.5, ratio: 2.5, categorie: 'glucide' },
  "Pâtes complètes (crues)": { kcal: 348, glucides: 65, proteines: 13, lipides: 2.5, ratio: 2.4, categorie: 'glucide' },
  "Lentilles vertes (crues)": { kcal: 352, glucides: 63.4, proteines: 24.6, lipides: 1.1, ratio: 2.7, categorie: 'glucide' },
  "Lentilles corail (crues)": { kcal: 352, glucides: 63.4, proteines: 24.6, lipides: 1.1, ratio: 2.5, categorie: 'glucide' },
  "Quinoa (cru)": { kcal: 358, glucides: 58.1, proteines: 14, lipides: 6.1, ratio: 2.5, categorie: 'glucide' },
  "Pomme de terre (crue)": { kcal: 77, glucides: 17, proteines: 2, lipides: 0.1, ratio: 1.05, categorie: 'glucide' },
  "Patate douce (crue)": { kcal: 86, glucides: 20.1, proteines: 1.6, lipides: 0.1, ratio: 2.5, categorie: 'glucide' },
  "Flocons d’avoine": { kcal: 367, glucides: 58.7, proteines: 13.5, lipides: 7, ratio: 2.1, categorie: 'glucide' },
  "Semoule (crue)": { kcal: 360, glucides: 72, proteines: 11, lipides: 1.5, ratio: 2.7, categorie: 'glucide' },
  "Boulgour (cru)": { kcal: 342, glucides: 76, proteines: 12.3, lipides: 1.8, ratio: 2.5, categorie: 'glucide' },
  "Pain complet": { kcal: 247, glucides: 41.5, proteines: 8.4, lipides: 2.1, ratio: 1.0, categorie: 'glucide' },

  // Protéines
  "Blanc de poulet (cru)": { kcal: 110, glucides: 0, proteines: 23.5, lipides: 1.2, ratio: 1.0, categorie: 'proteine' },
  "Escalope de dinde (crue)": { kcal: 105, glucides: 0, proteines: 24, lipides: 1.0, ratio: 1.0, categorie: 'proteine' },
  "Steak haché 5% (cru)": { kcal: 133, glucides: 0, proteines: 21, lipides: 5, ratio: 1.0, categorie: 'proteine' },
  "Steak haché 15% (cru)": { kcal: 211, glucides: 0, proteines: 18, lipides: 15, ratio: 1.0, categorie: 'proteine' },
  "Oeuf entier (60g)": { kcal: 90, glucides: 0.6, proteines: 7.5, lipides: 6.5, ratio: 1.0, categorie: 'proteine' },
  "Blanc d’oeuf (30g)": { kcal: 15, glucides: 0.2, proteines: 3.5, lipides: 0, ratio: 1.0, categorie: 'proteine' },
  "Saumon (cru)": { kcal: 206, glucides: 0, proteines: 20, lipides: 13, ratio: 1.0, categorie: 'proteine' },
  "Thon naturel (boîte)": { kcal: 113, glucides: 0, proteines: 25, lipides: 1, ratio: 1.0, categorie: 'proteine' },
  "Cabillaud (cru)": { kcal: 82, glucides: 0, proteines: 18, lipides: 0.7, ratio: 1.0, categorie: 'proteine' },
  "Crevettes (cuites)": { kcal: 90, glucides: 0.9, proteines: 19, lipides: 1, ratio: 1.0, categorie: 'proteine' }
};

export default function Page() {
  const [aliment, setAliment] = useState("Riz basmati (cru)");
  const [quantite, setQuantite] = useState(100);
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [categorie, setCategorie] = useState<'glucide' | 'proteine'>('glucide');
  const [mode, setMode] = useState<'glucides' | 'kcal' | 'proteines'>('glucides');
  const [avecHuile, setAvecHuile] = useState(false);
  const [sexe, setSexe] = useState<'homme' | 'femme'>('homme');
  const [age, setAge] = useState(25);
  const [taille, setTaille] = useState(175);
  const [poids, setPoids] = useState(70);
  const [activite, setActivite] = useState(1.55);
  const [dej, setDej] = useState<number | null>(null);

  const alimentsFiltres = Object.entries(aliments).filter(([_, a]) => a.categorie === categorie);

  const calculer = () => {
    const ref = aliments[aliment];
    const qRef = quantite;
    const g = (qRef * ref.glucides) / 100;
    const p = (qRef * ref.proteines) / 100;
    const k = (qRef * ref.kcal) / 100;
    const valeurRef = mode === 'glucides' ? g : mode === 'proteines' ? p : k;

    const resultatsEquivalents = alimentsFiltres.map(([nom, val]) => {
      const cible = mode === 'glucides' ? val.glucides : mode === 'proteines' ? val.proteines : val.kcal;
      const qCrue = (valeurRef * 100) / cible;
      const qCuire = qCrue * val.ratio;
      let g2 = (qCrue * val.glucides) / 100;
      let p2 = (qCrue * val.proteines) / 100;
      let l2 = (qCrue * val.lipides) / 100;
      let k2 = (qCrue * val.kcal) / 100;
      if (avecHuile) { l2 += 10; k2 += 90; }
      return {
        nom,
        qCrue: qCrue.toFixed(1),
        qCuire: qCuire.toFixed(1),
        glucides: g2.toFixed(1),
        proteines: p2.toFixed(1),
        lipides: l2.toFixed(1),
        kcal: k2.toFixed(1)
      };
    });
    setResultats(resultatsEquivalents);
  };

  const calculerDEJ = () => {
    const bmr = sexe === 'homme'
      ? 10 * poids + 6.25 * taille - 5 * age + 5
      : 10 * poids + 6.25 * taille - 5 * age - 161;
    setDej(Math.round(bmr * activite));
  };

  return (
    <main className="max-w-3xl mx-auto p-4 text-white bg-zinc-900 min-h-screen">
      <h1 className="text-2xl text-red-500 font-bold text-center mb-6">Convertisseur Glucides / Protéines</h1>

      <div className="mb-4">
        <label>Catégorie :</label>
        <select value={categorie} onChange={(e) => {
          const c = e.target.value as 'glucide' | 'proteine';
          setCategorie(c);
          setMode(c === 'glucide' ? 'glucides' : 'proteines');
        }} className="w-full p-2 bg-zinc-800 rounded">
          <option value="glucide">Glucides</option>
          <option value="proteine">Viandes / Poissons</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Mode :</label>
        <div className="flex gap-2 mt-1">
          {(categorie === 'glucide' ? ['glucides', 'kcal'] : ['proteines', 'kcal']).map((m) => (
            <button key={m} onClick={() => setMode(m as any)} className={`flex-1 p-2 rounded ${mode === m ? 'bg-red-600' : 'bg-zinc-800'}`}>{m}</button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label><input type="checkbox" checked={avecHuile} onChange={() => setAvecHuile(!avecHuile)} className="mr-2" />Cuisson avec 1 c.à.s. d’huile (+90 kcal)</label>
      </div>

      <div className="mb-4">
        <label>Aliment :</label>
        <select value={aliment} onChange={(e) => setAliment(e.target.value)} className="w-full p-2 bg-zinc-800 rounded">
          {alimentsFiltres.map(([nom]) => <option key={nom} value={nom}>{nom}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label>Quantité (g) :</label>
        <input type="number" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full p-2 rounded bg-zinc-800" />
      </div>

      <button onClick={calculer} className="w-full p-3 bg-red-600 rounded font-bold text-white">Calculer</button>

      {resultats.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Résultats équivalents ({mode})</h2>
          {resultats.map((res) => (
            <div key={res.nom} className="mb-4 p-4 rounded bg-zinc-800 border border-zinc-700">
              <strong>{res.nom}</strong><br />
              Quantité crue : {res.qCrue} g<br />
              Quantité cuite : {res.qCuire} g<br />
              Glucides : {res.glucides} g – Protéines : {res.proteines} g<br />
              Lipides : {res.lipides} g – Kcal : {res.kcal}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 border-t border-zinc-700 pt-6">
        <h2 className="text-xl font-bold mb-4">🔢 Calculateur DEJ (Dépense Énergétique Journalière)</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label>Sexe :</label>
            <select value={sexe} onChange={(e) => setSexe(e.target.value as any)} className="w-full p-2 rounded bg-zinc-800">
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div>
            <label>Âge :</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 rounded bg-zinc-800" />
          </div>
          <div>
            <label>Taille (cm) :</label>
            <input type="number" value={taille} onChange={(e) => setTaille(Number(e.target.value))} className="w-full p-2 rounded bg-zinc-800" />
          </div>
          <div>
            <label>Poids (kg) :</label>
            <input type="number" value={poids} onChange={(e) => setPoids(Number(e.target.value))} className="w-full p-2 rounded bg-zinc-800" />
          </div>
          <div className="sm:col-span-2">
            <label>Activité :</label>
            <select value={activite} onChange={(e) => setActivite(Number(e.target.value))} className="w-full p-2 rounded bg-zinc-800">
              <option value={1.2}>Sédentaire (1.2)</option>
              <option value={1.375}>Légèrement actif (1.375)</option>
              <option value={1.55}>Modérément actif (1.55)</option>
              <option value={1.725}>Très actif (1.725)</option>
              <option value={1.9}>Extrêmement actif (1.9)</option>
            </select>
          </div>
        </div>
        <button onClick={calculerDEJ} className="w-full mt-4 p-3 bg-red-600 rounded font-bold text-white">Calculer ma DEJ</button>
        {dej && (
          <p className="mt-4 text-center">✨ Ta DEJ estimée : <strong>{dej} kcal</strong></p>
        )}

        <div className="mt-4 text-sm text-zinc-400">
          <p><strong>Le métabolisme de base (BMR)</strong> est l’énergie que ton corps dépense au repos.</p>
          <p><strong>La DEJ</strong> est le BMR multiplié par ton niveau d’activité. Elle représente ce que tu dépenses chaque jour en énergie totale.</p>
        </div>
      </div>

      <footer className="mt-10 text-center text-sm text-zinc-500">
        <p>© 2025 – Créé par Sullivan BIGAND</p>
        <p><a href="https://ciqual.anses.fr/" target="_blank" className="text-red-500 underline">Source : CIQUAL ANSES</a></p>
        <p><a href="https://www.instagram.com/krakitooo/" target="_blank" className="text-red-500 underline">Insta : @krakitooo</a></p>
      </footer>
    </main>
  );
}
