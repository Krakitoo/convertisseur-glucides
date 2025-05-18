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
  "Riz basmati (cru)": { kcal: 353, glucides: 77.8, proteines: 7.7, lipides: 0.8, ratio: 3.2 },
  "Riz complet (cru)": { kcal: 362, glucides: 76, proteines: 7.5, lipides: 2.2, ratio: 3.1 },
  "Pâtes blé dur (crues)": { kcal: 353, glucides: 71, proteines: 12, lipides: 1.5, ratio: 2.5 },
  "Pâtes complètes (crues)": { kcal: 348, glucides: 65, proteines: 13, lipides: 2.5, ratio: 2.4 },
  "Lentilles vertes (crues)": { kcal: 352, glucides: 63.4, proteines: 24.6, lipides: 1.1, ratio: 2.7 },
  "Lentilles corail (crues)": { kcal: 352, glucides: 63.4, proteines: 24.6, lipides: 1.1, ratio: 2.5 },
  "Quinoa (cru)": { kcal: 358, glucides: 58.1, proteines: 14, lipides: 6.1, ratio: 2.5 },
  "Pomme de terre (crue)": { kcal: 77, glucides: 17, proteines: 2, lipides: 0.1, ratio: 1.05 },
};

export default function Home() {
  const [aliment, setAliment] = useState("Riz basmati (cru)");
  const [quantite, setQuantite] = useState(100);
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [mode, setMode] = useState<"glucides" | "kcal">("glucides");

  const calculer = () => {
    const ref = aliments[aliment];
    const refValue = mode === "glucides"
      ? (quantite * ref.glucides) / 100
      : (quantite * ref.kcal) / 100;

    const resultatsEquivalents = Object.entries(aliments).map(([nom, val]) => {
      const qCrue = (refValue * 100) / (mode === "glucides" ? val.glucides : val.kcal);
      const qCuire = qCrue * val.ratio;
      const glucides = (qCrue * val.glucides) / 100;
      const prot = (qCrue * val.proteines) / 100;
      const lip = (qCrue * val.lipides) / 100;
      const kcal = (qCrue * val.kcal) / 100;

      return {
        nom,
        qCrue: qCrue.toFixed(1),
        qCuire: qCuire.toFixed(1),
        glucides: glucides.toFixed(1),
        proteines: prot.toFixed(1),
        lipides: lip.toFixed(1),
        kcal: kcal.toFixed(1),
      };
    });

    setResultats(resultatsEquivalents);
  };

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 20, fontFamily: "Arial, sans-serif", backgroundColor: "#121212", color: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img src="/image krakito.png" alt="Logo" width={100} height={100} />
      </div>

      <h1 style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#ff1a1a" }}>
        Convertisseur de Glucides / Calories
      </h1>

      <p style={{ textAlign: "center", marginBottom: 10, color: "#ccc" }}>
        Cet outil vous permet de trouver des équivalents alimentaires<br />
        en fonction de votre apport en <strong>{mode === "glucides" ? "glucides" : "calories"}</strong>,
        pour mieux intégrer vos choix dans une diète ou un plan nutritionnel.
      </p>

      <p style={{ textAlign: "center", marginBottom: 30, fontSize: 13, color: "#aaa" }}>
        <strong>Glucides</strong> = source d’énergie rapide, essentiels pour l’entraînement et la performance.<br />
        <strong>Calories</strong> = mesure globale de l’énergie (glucides, lipides, protéines). Priorisez selon votre objectif : perte de poids, prise de masse, etc.
      </p>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button onClick={() => setMode("glucides")} style={{ marginRight: 10, backgroundColor: mode === "glucides" ? "#ff1a1a" : "#333", color: "white", padding: "6px 12px", border: "none", borderRadius: 5 }}>
          Basé sur glucides
        </button>
        <button onClick={() => setMode("kcal")} style={{ backgroundColor: mode === "kcal" ? "#ff1a1a" : "#333", color: "white", padding: "6px 12px", border: "none", borderRadius: 5 }}>
          Basé sur calories
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label><strong>Choisissez un aliment :</strong></label><br />
        <select value={aliment} onChange={(e) => setAliment(e.target.value)} style={{ width: "100%", padding: 8 }}>
          {Object.keys(aliments).map((nom) => (
            <option key={nom} value={nom}>{nom}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label><strong>Quantité (en grammes) :</strong></label><br />
        <input
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(Number(e.target.value))}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <button
        onClick={calculer}
        style={{
          backgroundColor: "#ff1a1a",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Calculer
      </button>

      {resultats.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            Résultats équivalents ({mode === "glucides" ? "glucides" : "calories"})
          </h2>
          {resultats.map((res) => (
            <div
              key={res.nom}
              style={{
                border: "1px solid #333",
                borderRadius: 8,
                padding: 15,
                marginBottom: 15,
                backgroundColor: "#1e1e1e",
              }}
            >
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

      <footer style={{ marginTop: 60, textAlign: "center", fontSize: 12, color: "#777" }}>
        <p>© 2025 – Créé par Sullivan BIGAND | Tous droits réservés.</p>
        <p><a href="https://ciqual.anses.fr/" target="_blank" rel="noopener noreferrer" style={{ color: "#ff1a1a" }}>
          Données issues de la table officielle Ciqual (ANSES)
        </a></p>
        <p><a href="https://www.instagram.com/krakitooo/" target="_blank" rel="noopener noreferrer" style={{ color: "#ff1a1a" }}>
          Suis-moi sur Instagram : @krakitooo
        </a></p>
      </footer>
    </main>
  );
}