'use client';

import { useState } from 'react';
import Image from 'next/image';

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
  proteinesCrues: string;
  proteinesCuites: string;
  lipides: string;
  kcal: string;
};

const aliments: Record<string, Aliment> = {
  // Glucides
  "Riz basmati (cru)": { kcal: 353, glucides: 77.8, proteines: 7.7, lipides: 0.8, ratio: 3.2, categorie: 'glucide' },
  "Riz complet (cru)": { kcal: 362, glucides: 76, proteines: 7.5, lipides: 2.2, ratio: 3.1, categorie: 'glucide' },
  "Pâtes complètes (crues)": { kcal: 348, glucides: 65, proteines: 13, lipides: 2.5, ratio: 2.5, categorie: 'glucide' },
  "Lentilles (crues)": { kcal: 352, glucides: 63.4, proteines: 24.6, lipides: 1.1, ratio: 2.5, categorie: 'glucide' },
  "Patate douce (crue)": { kcal: 86, glucides: 20.1, proteines: 1.6, lipides: 0.1, ratio: 2.5, categorie: 'glucide' },
  "Flocons d’avoine": { kcal: 367, glucides: 58.7, proteines: 13.5, lipides: 7, ratio: 2.1, categorie: 'glucide' },
  "Pain complet": { kcal: 247, glucides: 41.5, proteines: 8.4, lipides: 2.1, ratio: 1.0, categorie: 'glucide' },
  "Pomme de terre (crue)": { kcal: 77, glucides: 17.5, proteines: 2, lipides: 0.1, ratio: 1.5, categorie: 'glucide' },
  "Boulgour (cru)": { kcal: 342, glucides: 76.5, proteines: 12.3, lipides: 1.3, ratio: 2.5, categorie: 'glucide' },
  "Quinoa (cru)": { kcal: 368, glucides: 64.2, proteines: 14.1, lipides: 6.1, ratio: 2.5, categorie: 'glucide' },

  // Protéines
  "Blanc de poulet (cru)": { kcal: 110, glucides: 0, proteines: 23.5, lipides: 1.2, ratio: 0.75, categorie: 'proteine' },
  "Escalope de dinde (crue)": { kcal: 105, glucides: 0, proteines: 24, lipides: 1.0, ratio: 0.75, categorie: 'proteine' },
  "Steak haché 5% (cru)": { kcal: 133, glucides: 0, proteines: 21, lipides: 5, ratio: 0.8, categorie: 'proteine' },
  "Saumon (cru)": { kcal: 206, glucides: 0, proteines: 20, lipides: 13, ratio: 0.85, categorie: 'proteine' },
  "Oeuf entier (60g)": { kcal: 90, glucides: 0.6, proteines: 7.5, lipides: 6.5, ratio: 1.0, categorie: 'proteine' },
  "Tofu ferme nature": { kcal: 126, glucides: 1.6, proteines: 13, lipides: 7.7, ratio: 1.0, categorie: 'proteine' },
  "Cabillaud (cru)": { kcal: 82, glucides: 0, proteines: 18.1, lipides: 0.7, ratio: 0.8, categorie: 'proteine' },
  "Thon en boîte (égoutté)": { kcal: 169, glucides: 0, proteines: 28.6, lipides: 6, ratio: 1.0, categorie: 'proteine' },
  "Fromage blanc 0%": { kcal: 46, glucides: 3.6, proteines: 8.4, lipides: 0.2, ratio: 1.0, categorie: 'proteine' }
};

export default function Page() {
  const [aliment, setAliment] = useState("Riz basmati (cru)");
  const [quantite, setQuantite] = useState(100);
  const [categorie, setCategorie] = useState<'glucide' | 'proteine'>('glucide');
  const [mode, setMode] = useState<'glucides' | 'kcal' | 'proteines'>('glucides');
  const [avecHuile, setAvecHuile] = useState(false);
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [sexe, setSexe] = useState<'homme' | 'femme'>('homme');
  const [age, setAge] = useState(25);
  const [taille, setTaille] = useState(175);
  const [poids, setPoids] = useState(70);
  const [activite, setActivite] = useState(1.55);
  const [dej, setDej] = useState<number | null>(null);

  const calculer = () => {
    const ref = aliments[aliment];
    const valeurRef = mode === 'glucides'
      ? (quantite * ref.glucides) / 100
      : mode === 'proteines'
      ? (quantite * ref.proteines) / 100
      : (quantite * ref.kcal) / 100;

    const filtres = Object.entries(aliments).filter(([, a]) => a.categorie === categorie);

    const res = filtres.map(([nom, val]) => {
      const refNutri = mode === 'glucides' ? val.glucides : mode === 'proteines' ? val.proteines : val.kcal;
      const qCrue = (valeurRef * 100) / refNutri;
      const qCuire = qCrue * val.ratio;
      const glucides = (qCrue * val.glucides) / 100;
      const proteinesCrues = (qCrue * val.proteines) / 100;
      const proteinesCuites = qCuire > 0 ? (proteinesCrues / qCuire) * 100 : 0;
      let lipides = (qCrue * val.lipides) / 100;
      let kcal = (qCrue * val.kcal) / 100;
      if (avecHuile) { lipides += 10; kcal += 90; }

      return {
        nom,
        qCrue: qCrue.toFixed(1),
        qCuire: qCuire.toFixed(1),
        glucides: glucides.toFixed(1),
        proteinesCrues: proteinesCrues.toFixed(1),
        proteinesCuites: proteinesCuites.toFixed(1),
        lipides: lipides.toFixed(1),
        kcal: kcal.toFixed(1)
      };
    });

    setResultats(res);
  };

  const calculerDEJ = () => {
    const bmr = sexe === 'homme'
      ? 10 * poids + 6.25 * taille - 5 * age + 5
      : 10 * poids + 6.25 * taille - 5 * age - 161;
    setDej(Math.round(bmr * activite));
  };

  return (
    <main className="max-w-3xl mx-auto p-4 text-white bg-zinc-900 min-h-screen">
      <header className="flex items-center gap-4 mb-6">
        <Image src="/image krakito.png" alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-bold text-red-500">Convertisseur Nutrition</h1>
      </header>

      <section className="mb-6 text-sm text-zinc-300">
        <p><strong>Glucides</strong> = énergie rapide (riz, flocons, lentilles…)</p>
        <p><strong>Protéines</strong> = muscles & récupération (viandes, poissons…)</p>
        <p><strong>Calories</strong> = total énergétique (glucides + prot + lipides)</p>
        <p><strong>CRU / CUIT :</strong> Les viandes perdent de l’eau à la cuisson (poids ↓), les pâtes en absorbent (poids ↑). Ce site ajuste automatiquement les quantités pour t’afficher des comparaisons cohérentes.</p>
        <p><strong>Exemple :</strong> 100g cru de poulet = 75g cuit ≈ 23g prot. L'affichage s’adapte selon le ratio.</p>
      </section>

      <div className="mb-4">
        <label>Catégorie :</label>
        <select value={categorie} onChange={(e) => {
          const val = e.target.value as 'glucide' | 'proteine';
          setCategorie(val);
          setMode(val === 'glucide' ? 'glucides' : 'proteines');
        }} className="w-full p-2 bg-zinc-800 rounded">
          <option value="glucide">Glucides</option>
          <option value="proteine">Protéines</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Objectif :</label>
        <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="w-full p-2 bg-zinc-800 rounded">
          {categorie === 'glucide' && (
            <>
              <option value="glucides">Glucides</option>
              <option value="kcal">Calories</option>
            </>
          )}
          {categorie === 'proteine' && (
            <>
              <option value="proteines">Protéines</option>
              <option value="kcal">Calories</option>
            </>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label>Aliment de référence :</label>
        <select value={aliment} onChange={(e) => setAliment(e.target.value)} className="w-full p-2 bg-zinc-800 rounded">
          {Object.entries(aliments).filter(([, a]) => a.categorie === categorie).map(([nom]) => (
            <option key={nom} value={nom}>{nom}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label>Quantité (g cru) :</label>
        <input type="number" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full p-2 bg-zinc-800 rounded" />
      </div>

      <div className="mb-4">
        <label><input type="checkbox" checked={avecHuile} onChange={() => setAvecHuile(!avecHuile)} className="mr-2" />Cuisson avec 1 c.à.s. d’huile (+90 kcal)</label>
      </div>

      <button onClick={calculer} className="w-full p-3 bg-red-600 rounded font-bold">Calculer</button>

      {resultats.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Équivalences ({mode})</h2>
          {resultats.map((res) => (
            <div key={res.nom} className="p-4 bg-zinc-800 rounded mb-4">
              <strong>{res.nom}</strong><br />
              Cru : {res.qCrue} g – Cuit : {res.qCuire} g<br />
              Glucides : {res.glucides} g<br />
              Protéines : {res.proteinesCrues} g (toujours)<br />
              → Cela correspond à {res.proteinesCuites} g pour 100 g de produit cuit<br />
              Lipides : {res.lipides} g | Kcal : {res.kcal}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 border-t border-zinc-700 pt-6">
        <h2 className="text-xl font-bold mb-4">Calculateur DEJ</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label>Sexe :</label>
            <select value={sexe} onChange={(e) => setSexe(e.target.value as 'homme' | 'femme')} className="w-full p-2 bg-zinc-800 rounded">
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div><label>Âge :</label><input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 bg-zinc-800 rounded" /></div>
          <div><label>Taille (cm) :</label><input type="number" value={taille} onChange={(e) => setTaille(Number(e.target.value))} className="w-full p-2 bg-zinc-800 rounded" /></div>
          <div><label>Poids (kg) :</label><input type="number" value={poids} onChange={(e) => setPoids(Number(e.target.value))} className="w-full p-2 bg-zinc-800 rounded" /></div>
          <div className="sm:col-span-2"><label>Activité :</label>
            <select value={activite} onChange={(e) => setActivite(Number(e.target.value))} className="w-full p-2 bg-zinc-800 rounded">
              <option value={1.2}>Sédentaire</option>
              <option value={1.375}>Légèrement actif</option>
              <option value={1.55}>Modérément actif</option>
              <option value={1.725}>Très actif</option>
              <option value={1.9}>Extrêmement actif</option>
            </select>
          </div>
        </div>
        <button onClick={calculerDEJ} className="w-full mt-4 p-3 bg-red-600 rounded font-bold">Calculer ma DEJ</button>
        {dej && <p className="mt-4 text-center text-lg">✨ Ta DEJ estimée : <strong>{dej} kcal</strong></p>}
      </div>

      <footer className="mt-10 text-center text-sm text-zinc-500 border-t border-zinc-700 pt-6">
        <p>© 2025 – Créé par Sullivan BIGAND</p>
        <p>Tous droits réservés. Reproduction interdite sans autorisation.</p>
        <p>Dépôt GitHub daté = preuve de création. Source : CIQUAL ANSES.</p>
        <p><a href="https://ciqual.anses.fr/" target="_blank" className="text-red-500 underline">CIQUAL ANSES</a> · <a href="https://www.instagram.com/krakitooo/" target="_blank" className="text-red-500 underline">@krakitooo</a></p>
      </footer>
    </main>
  );
}
