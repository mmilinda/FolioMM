import { useState, useEffect } from "react";
import api from "../services/api";
import staticProjects from "../data/projects";

function getLocalProjects(includeHidden = false) {
  try {
    const custom = JSON.parse(localStorage.getItem("custom_projects") || "[]");
    const deletedIds = new Set(JSON.parse(localStorage.getItem("deleted_project_ids") || "[]").map(String));
    const hiddenIds = new Set(JSON.parse(localStorage.getItem("hidden_project_ids") || "[]").map(String));
    const editedMap = JSON.parse(localStorage.getItem("edited_projects") || "{}");

    const combined = [...staticProjects, ...custom];
    const filtered = combined.filter((p) => !deletedIds.has(String(p.id)) && !deletedIds.has(p.slug));

    const processed = filtered.map((p) => {
      const key = String(p.id);
      const edited = editedMap[key] || editedMap[p.slug] || {};
      const isHidden = hiddenIds.has(key) || (p.slug && hiddenIds.has(p.slug));
      return { ...p, ...edited, hidden: isHidden };
    });

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
