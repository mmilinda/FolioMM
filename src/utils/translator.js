/**
 * Utilitaire de Traduction Automatique (Français -> Anglais)
 * Utilise l'API MyMemory et des services publics rapides pour traduire
 * automatiquement les textes saisis dans l'espace administrateur.
 */

// Cache en mémoire pour accélérer les traductions identiques
const translationCache = new Map();

/**
 * Décode les entités HTML renvoyées par certaines APIs
 */
function decodeHtmlEntities(str) {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ");
}

/**
 * Traduit un texte unitaire du Français vers l'Anglais
 * @param {string} text - Le texte en français
 * @returns {Promise<string>} - Le texte traduit en anglais
 */
export async function translateFrToEn(text) {
  if (!text || typeof text !== "string" || !text.trim()) {
    return "";
  }

  const clean = text.trim();
  if (translationCache.has(clean)) {
    return translationCache.get(clean);
  }

  // Si le texte est très court ou déjà en anglais (ex: acronyme technique)
  const isAllAsciiSymbol = /^[\d\s\-_.,;:/\\|*+()!@#$%^&=]+$/.test(clean);
  if (isAllAsciiSymbol) {
    return clean;
  }

  // Découper les textes longs (> 380 caractères) par phrases pour respecter les quotas MyMemory
  if (clean.length > 380) {
    const sentences = clean.split(/(?<=[.?!:\n])\s+/);
    const translatedParts = [];

    for (const sentence of sentences) {
      if (!sentence.trim()) continue;
      const translated = await translateSingleChunk(sentence);
      translatedParts.push(translated);
    }

    const fullResult = translatedParts.join(" ");
    translationCache.set(clean, fullResult);
    return fullResult;
  }

  const result = await translateSingleChunk(clean);
  translationCache.set(clean, result);
  return result;
}

/**
 * Appel réseau d'un bloc de texte
 */
async function translateSingleChunk(chunk) {
  const trimmed = chunk.trim();
  if (!trimmed) return "";

  // 1. Essai via l'API MyMemory
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=fr|en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        let translated = decodeHtmlEntities(data.responseData.translatedText);
        // MyMemory ajoute parfois un avertissement si quota atteint
        if (!translated.toLowerCase().includes("mymemory warning")) {
          return translated;
        }
      }
    }
  } catch (err) {
    console.warn("MyMemory API note:", err?.message || err);
  }

  // 2. Fallback via Lingva Translate public
  try {
    const url = `https://lingva.ml/api/v1/fr/en/${encodeURIComponent(trimmed)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data?.translation) {
        return decodeHtmlEntities(data.translation);
      }
    }
  } catch (err) {
    console.warn("Lingva fallback note:", err?.message || err);
  }

  // 3. Repli sécurisé : renvoyer le texte original pour ne jamais bloquer
  return trimmed;
}

/**
 * Traduit un dictionnaire complet de champs FR -> EN en parallèle
 * Exemple : translateFields({ titleEn: form.title, descriptionEn: form.description })
 * @param {Record<string, string>} fieldsToTranslate - Clé = nom de champ EN, Valeur = texte source FR
 * @returns {Promise<Record<string, string>>} - Objet avec les champs traduits
 */
export async function translateFields(fieldsToTranslate) {
  const keys = Object.keys(fieldsToTranslate);
  const results = {};

  const promises = keys.map(async (key) => {
    const sourceText = fieldsToTranslate[key];
    if (!sourceText || !sourceText.trim()) {
      results[key] = "";
      return;
    }
    const translated = await translateFrToEn(sourceText);
    results[key] = translated;
  });

  await Promise.allSettled(promises);
  return results;
}

export default {
  translateFrToEn,
  translateFields,
};
