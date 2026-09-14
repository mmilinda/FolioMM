import { useState, useEffect } from "react";
import api from "../services/api";
import staticProjects from "../data/projects";

function getLocalProjects(includeHidden = false) {
  try {
    const custom = JSON.parse(localStorage.getItem("custom_projects") || "[]");
    const deletedIds = new Set(JSON.parse(localStorage.getItem("deleted_project_ids") || "[]").map(String));
    const hiddenIds = new Set(JSON.parse(localStorage.getItem("hidden_project_ids") || "[]").map(String));
    const editedMap = JSON.parse(localStorage.getItem("edited_projects") || "{}");
    const orderList = JSON.parse(localStorage.getItem("projects_order") || "[]");

    const combined = [...staticProjects, ...custom];
    const filtered = combined.filter((p) => {
      if (p.slug && deletedIds.has(p.slug)) return false;
      if (!p.slug && deletedIds.has(String(p.id))) return false;
      return true;
    });

    const processed = filtered.map((p) => {
      const slugKey = p.slug;
      const idKey = String(p.id);
      const edited = (slugKey && editedMap[slugKey]) || (!slugKey && editedMap[idKey]) || {};
      const isHidden = (slugKey && hiddenIds.has(slugKey)) || (!slugKey && hiddenIds.has(idKey));
      return { ...p, ...edited, hidden: isHidden };
    });

    if (orderList && Array.isArray(orderList) && orderList.length > 0) {
      const orderMap = new Map();
      orderList.forEach((idOrSlug, index) => {
        orderMap.set(String(idOrSlug), index);
      });

      processed.sort((a, b) => {
        const orderA = a.slug && orderMap.has(a.slug) ? orderMap.get(a.slug) : (orderMap.has(String(a.id)) ? orderMap.get(String(a.id)) : 9999);
        const orderB = b.slug && orderMap.has(b.slug) ? orderMap.get(b.slug) : (orderMap.has(String(b.id)) ? orderMap.get(String(b.id)) : 9999);
        return orderA - orderB;
      });
    }

    if (includeHidden) return processed;
    return processed.filter((p) => !p.hidden);
  } catch {
    return staticProjects;
  }
}

export function useProjects(includeHidden = false) {
  const [projects, setProjects] = useState(() => getLocalProjects(includeHidden));
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;

    function refresh() {
      if (isMounted) {
        setProjects(getLocalProjects(includeHidden));
      }
    }

    async function fetchProjects() {
      try {
        const res = await api.get("/projects", { timeout: 2000 });
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const apiMap = new Map(res.data.map((p) => [String(p.id), p]));
          const baseList = getLocalProjects(includeHidden);
          const mergedStatic = baseList.map((sp) => {
            const apiItem = apiMap.get(String(sp.id)) || res.data.find((p) => p.slug === sp.slug);
            return apiItem ? { ...sp, ...apiItem, image: apiItem.image || sp.image } : sp;
          });

          const existingSlugs = new Set(mergedStatic.map((p) => p.slug));
          const extraApiProjects = res.data.filter((p) => p.slug && !existingSlugs.has(p.slug));

          const allMerged = [...mergedStatic, ...extraApiProjects];
          setProjects(includeHidden ? allMerged : allMerged.filter((p) => !p.hidden));
          setIsFallback(false);
        }
      } catch (err) {
        if (isMounted) {
          setProjects(getLocalProjects(includeHidden));
          setIsFallback(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();
    window.addEventListener("projects_updated", refresh);

    return () => {
      isMounted = false;
      window.removeEventListener("projects_updated", refresh);
    };
  }, [includeHidden]);

  return { projects, loading, isFallback };
}

export default useProjects;
