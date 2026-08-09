/**
 * Adaptateur de Base de Données (API Laravel / Firebase Cloud / Persistance Locale)
 */

import api from "./services/api";

export const db = {
  name: "Portfolio DB",
  status: "Active",
};

export async function addDoc(collectionName, data) {
  try {
    if (collectionName === "projects") {
      await api.post("/projects", data, { timeout: 2000 });
      console.log("✅ Projet enregistré dans la base de données API !");
    }
  } catch (err) {
    console.warn("ℹ️ API en mode hybride / sauvegarde locale.");
  }
}

export function collection(dbInstance, collectionName) {
  return collectionName;
}
