import { useState, useEffect } from "react";
import api from "../services/api";
import staticArticles from "../data/articles";

export function useArticles() {
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchArticles() {
      try {
        const res = await api.get("/articles", { timeout: 3000 });
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setArticles(res.data);
          setIsFallback(false);
        } else if (isMounted) {
          setArticles(staticArticles);
          setIsFallback(true);
        }
      } catch (err) {
        if (isMounted) {
          // Backend API is offline or not reachable -> use static articles data
          setArticles(staticArticles);
          setIsFallback(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  return { articles, loading, isFallback };
}

export default useArticles;
