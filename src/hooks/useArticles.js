import { useState, useEffect } from "react";
import api from "../services/api";
import staticArticles from "../data/articles";

function getLocalArticles() {
  try {
    const custom = JSON.parse(localStorage.getItem("custom_articles") || "[]");
    const deletedIds = new Set(JSON.parse(localStorage.getItem("deleted_article_ids") || "[]").map(String));

    const combined = [...staticArticles, ...custom];
    return combined.filter((a) => !deletedIds.has(String(a.id)) && !deletedIds.has(a.slug));
  } catch {
    return staticArticles;
  }
}

export function useArticles() {
  const [articles, setArticles] = useState(getLocalArticles);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;

    function refresh() {
      if (isMounted) {
        setArticles(getLocalArticles());
      }
    }

    async function fetchArticles() {
      try {
        const res = await api.get("/articles", { timeout: 1500 });
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const baseList = getLocalArticles();
          const apiMap = new Map(res.data.map((item) => [String(item.id), item]));
          const merged = baseList.map((item) => {
            const match = apiMap.get(String(item.id)) || res.data.find((s) => s.slug === item.slug);
            return match ? { ...item, ...match } : item;
          });
          setArticles(merged);
          setIsFallback(false);
        }
      } catch (err) {
        if (isMounted) {
          setArticles(getLocalArticles());
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
  }, []);

  return { articles, loading, isFallback };
}

export function useArticle(id) {
  const findItem = () => {
    const all = getLocalArticles();
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
