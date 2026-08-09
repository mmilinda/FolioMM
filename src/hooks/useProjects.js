import { useState, useEffect } from "react";
import api from "../services/api";
import staticProjects from "../data/projects";

function getLocalProjects() {
  try {
    const custom = JSON.parse(localStorage.getItem("custom_projects") || "[]");
    const deletedIds = new Set(JSON.parse(localStorage.getItem("deleted_project_ids") || "[]").map(String));

    const combined = [...staticProjects, ...custom];
    return combined.filter((p) => !deletedIds.has(String(p.id)) && !deletedIds.has(p.slug));
  } catch {
    return staticProjects;
  }
}

export function useProjects() {
  const [projects, setProjects] = useState(getLocalProjects);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;

    function refresh() {
      if (isMounted) {
        setProjects(getLocalProjects());
      }
    }

    async function fetchProjects() {
      try {
        const res = await api.get("/projects", { timeout: 2000 });
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const apiMap = new Map(res.data.map((p) => [String(p.id), p]));
          const baseList = getLocalProjects();
          const mergedStatic = baseList.map((sp) => {
            const apiItem = apiMap.get(String(sp.id)) || res.data.find((p) => p.slug === sp.slug);
            return apiItem ? { ...sp, ...apiItem, image: apiItem.image || sp.image } : sp;
          });

          const existingSlugs = new Set(mergedStatic.map((p) => p.slug));
          const extraApiProjects = res.data.filter((p) => p.slug && !existingSlugs.has(p.slug));

          setProjects([...mergedStatic, ...extraApiProjects]);
          setIsFallback(false);
        }
      } catch (err) {
        if (isMounted) {
          setProjects(getLocalProjects());
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
  }, []);

  return { projects, loading, isFallback };
}

export default useProjects;
