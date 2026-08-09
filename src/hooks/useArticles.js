import { useState, useEffect } from "react";
import api from "../services/api";
import staticArticles from "../data/articles";

function getLocalArticles(includeHidden = false) {
  try {
    const custom = JSON.parse(localStorage.getItem("custom_articles") || "[]");
    const deletedIds = new Set(JSON.parse(localStorage.getItem("deleted_article_ids") || "[]").map(String));
    const hiddenIds = new Set(JSON.parse(localStorage.getItem("hidden_article_ids") || "[]").map(String));
    const editedMap = JSON.parse(localStorage.getItem("edited_articles") || "{}");

    const combined = [...staticArticles, ...custom];
    const filtered = combined.filter((a) => !deletedIds.has(String(a.id)) && !deletedIds.has(a.slug));

    const processed = filtered.map((a) => {
      const key = String(a.id);
      const edited = editedMap[key] || editedMap[a.slug] || {};
      const isHidden = hiddenIds.has(key) || (a.slug && hiddenIds.has(a.slug));
      return { ...a, ...edited, hidden: isHidden };
    });

    if (includeHidden) return processed;
    return processed.filter((a) => !a.hidden);
  } catch {
    return staticArticles;
  }
}

export function useArticles(includeHidden = false) {
  const [articles, setArticles] = useState(() => getLocalArticles(includeHidden));
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;

    function refresh() {
      if (isMounted) {
        setArticles(getLocalArticles(includeHidden));
      }
    }

    async function fetchArticles() {
      try {
        const res = await api.get("/articles", { timeout: 1500 });
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const baseList = getLocalArticles(includeHidden);
          const apiMap = new Map(res.data.map((item) => [String(item.id), item]));
          const merged = baseList.map((item) => {
            const match = apiMap.get(String(item.id)) || res.data.find((s) => s.slug === item.slug);
            return match ? { ...item, ...match } : item;
          });

          setArticles(includeHidden ? merged : merged.filter((a) => !a.hidden));
          setIsFallback(false);
        }
      } catch (err) {
        if (isMounted) {
          setArticles(getLocalArticles(includeHidden));
          setIsFallback(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchArticles();
    window.addEventListener("articles_updated", refresh);

    return () => {
      isMounted = false;
      window.removeEventListener("articles_updated", refresh);
    };
  }, [includeHidden]);

  return { articles, loading, isFallback };
}

export function useArticle(id) {
  const findItem = () => {
    const all = getLocalArticles(true);
    return all.find(
      (a) => String(a.id) === String(id) || a.slug === id || String(a.slug) === String(id)
    );
  };

  const found = findItem();
  const [article, setArticle] = useState(found || staticArticles[0]);

  useEffect(() => {
    const currentStatic = findItem();
    if (currentStatic) {
      setArticle(currentStatic);
    }
  }, [id]);

  return { article: article || found || staticArticles[0], loading: false };
}

export default useArticles;
