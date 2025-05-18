'use client';

import { useState } from "react";

type Aliment = {
  kcal: number;
  glucides: number;
  proteines: number;
  lipides: number;
  ratio: number;
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
  "Riz basmati (cru)": { kcal: 358, glucides: 78, proteines: 8, lipides: 1, ratio: 3.2 },
  "Riz complet (cru)": { kcal: 362, glucides: 76, proteines: 7.5, lipides: 2.2, ratio: 3.1 },
  "Pâtes blé dur (cru)": { kcal: 353, glucides: 71, proteines: 12, lipides: 1.5, ratio: 2.5 },
  "Pâtes complètes (cru)": { kcal: 348, glucides: 65, proteines: 13, lipides: 2.5, ratio: 2.4 },
  "Lentilles vertes (cru)": { kcal: 339, glucides: 52, proteines: 25, lipides: 1.1, ratio: 2.7 },
  "Lentilles corail (cru)": { kcal: 358, glucides: 60, proteines: 24, lipides: 1.5, ratio: 2.5 },
  "Quinoa (cru)": { kcal: 368, glucides: 64, proteines: 14, lipides: 5.5, ratio: 2.5 },
  "Pomme de terre (cru)": { kcal: 77, glucides: 17, proteines: 2, lipides: 0.1, ratio: 1.05 },
};

export default function Home() {
  const [aliment, setAliment] = useState("Riz basmati (cru)");
  const [quantite, setQuantite] = useState(100);
  const [resultats, setResultats] = useState<Resultat[]>([]);

  const calculer = () => {
    const ref = aliments[aliment];
    const glucidesRef = (quantite * ref.glucides) / 100;

    const resultatsEquivalents = Object.entries(aliments).map(([nom, val]) => {
      const qCrue = (glucidesRef * 100) / val.glucides;
      const qCuire = qCrue * val.ratio;
      const prot = (qCrue * val.proteines) / 100;
      const lip = (qCrue * val.lipides) / 100;
      const kcal = (qCrue * val.kcal) / 100;

      return {
        nom,
        qCrue: qCrue.toFixed(1),
        qCuire: qCuire.toFixed(1),
        glucides: glucidesRef.toFixed(1),
        proteines: prot.toFixed(1),
        lipides: lip.toFixed(1),
        kcal: kcal.toFixed(1),
      };
    });

    setResultats(resultatsEquivalents);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Convertisseur de Glucides</h1>

      <div style={{ marginTop: 20 }}>
        <label>Choisissez un aliment :</label><br />
        <select value={aliment} onChange={(e) => setAliment(e.target.value)}>
          {Object.keys(aliments).map((nom) => (
            <option key={nom} value={nom}>{nom}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Quantité (en grammes) :</label><br />
        <input
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(Number(e.target.value))}
        />
      </div>

      <button onClick={calculer} style={{ marginTop: 10 }}>Calculer</button>

      {resultats.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2>Résultats :</h2>
          {resultats.map((res) => (
            <div key={res.nom} style={{ borderBottom: "1px solid #ccc", marginBottom: 10, paddingBottom: 10 }}>
              <strong>{res.nom}</strong><br />
              Quantité crue équivalente : {res.qCrue} g<br />
              Quantité cuite équivalente : {res.qCuire} g<br />
              Glucides : {res.glucides} g<br />
              Protéines : {res.proteines} g<br />
              Lipides : {res.lipides} g<br />
              Kcal : {res.kcal}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
