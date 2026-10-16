import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import staticProjects from "../data/projects";

function resolveProjectImage(apiImage, fallbackStaticImage) {
  if (!apiImage) return fallbackStaticImage;
  // Support des images Base64 (sauvegardées en direct dans la base de données distante)
  if (typeof apiImage === "string" && apiImage.startsWith("data:image/")) {
    return apiImage;
  }
  // Normalisation des chemins relatifs
  if (typeof apiImage === "string" && apiImage.startsWith("/src/assets/projects/")) {
    const filename = apiImage.replace("/src/assets/projects/", "");
    return `/images/projects/${filename}`;
  }
  return apiImage;
}

export function getLocalProjects(includeHidden = false) {
  try {
    // 1. Si des données du serveur sont déjà en cache local, les utiliser comme base prioritaire
    const cachedServer = JSON.parse(localStorage.getItem("cached_server_projects") || "null");
    const custom = JSON.parse(localStorage.getItem("custom_projects") || "[]");
    const deletedIds = new Set(JSON.parse(localStorage.getItem("deleted_project_ids") || "[]").map(String));
    const hiddenIds = new Set(JSON.parse(localStorage.getItem("hidden_project_ids") || "[]").map(String));
    const editedMap = JSON.parse(localStorage.getItem("edited_projects") || "{}");
    const orderList = JSON.parse(localStorage.getItem("projects_order") || "[]");

    let baseList = staticProjects;
    if (Array.isArray(cachedServer) && cachedServer.length > 0) {
      const staticMap = new Map(staticProjects.map((p) => [p.slug || String(p.id), p]));
      baseList = cachedServer.map((cs) => {
        const fallback = staticMap.get(cs.slug || String(cs.id));
        return {
          ...cs,
          image: resolveProjectImage(cs.image, fallback?.image),
          fallbackImage: cs.fallback_image || fallback?.fallbackImage || "/images/projects/preview.png",
          titleEn: cs.title_en || cs.titleEn || fallback?.titleEn || cs.title,
          categoryEn: cs.category_en || cs.categoryEn || fallback?.categoryEn || cs.category,
          descriptionEn: cs.description_en || cs.descriptionEn || fallback?.descriptionEn || cs.description,
          problemEn: cs.problem_en || cs.problemEn || fallback?.problemEn || cs.problem,
          solutionEn: cs.solution_en || cs.solutionEn || fallback?.solutionEn || cs.solution,
          impactEn: cs.impact_en || cs.impactEn || fallback?.impactEn || cs.impact,
          statusEn: cs.status_en || cs.statusEn || fallback?.statusEn || cs.status,
          clientEn: cs.client_en || cs.clientEn || fallback?.clientEn || cs.client,
          roleEn: cs.role_en || cs.roleEn || fallback?.roleEn || cs.role,
        };
      });
    }

    const combined = [...baseList, ...custom];
    const filtered = combined.filter((p) => {
      if (p.slug && deletedIds.has(p.slug)) return false;
      if (!p.slug && deletedIds.has(String(p.id))) return false;
      return true;
    });

    const processed = filtered.map((p, idx) => {
      const slugKey = p.slug;
      const idKey = String(p.id);
      const edited = (slugKey && editedMap[slugKey]) || (!slugKey && editedMap[idKey]) || {};
      const isHidden = (slugKey && hiddenIds.has(slugKey)) || (!slugKey && hiddenIds.has(idKey));
      return {
        ...p,
        ...edited,
        image: resolveProjectImage(edited.image || p.image, p.fallbackImage || "/images/projects/preview.png"),
        hidden: Boolean(p.hidden || isHidden),
        order: p.order !== undefined ? p.order : idx,
      };
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

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      // Timeout généreux (15s) pour gérer le réveil à froid éventuel du serveur Render
      const res = await api.get(`/projects?_t=${Date.now()}`, {
        timeout: 15000,
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      });

      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        // Mettre à jour le cache local avec les données fraîches du serveur distant
        localStorage.setItem("cached_server_projects", JSON.stringify(res.data));

        const apiMap = new Map(res.data.map((p) => [p.slug || String(p.id), p]));
        const staticMap = new Map(staticProjects.map((p) => [p.slug || String(p.id), p]));

        const formattedApiProjects = res.data.map((p) => {
          const fallback = staticMap.get(p.slug || String(p.id));
          return {
            ...p,
            id: p.id,
            slug: p.slug,
            title: p.title,
            titleEn: p.title_en || p.titleEn || fallback?.titleEn || p.title,
            category: p.category || fallback?.category || "Full Stack",
            categoryEn: p.category_en || p.categoryEn || fallback?.categoryEn || p.category,
            year: p.year || fallback?.year || "2026",
            status: p.status || fallback?.status || "Production",
            statusEn: p.status_en || p.statusEn || fallback?.statusEn || p.status,
            client: p.client || fallback?.client || "",
            clientEn: p.client_en || p.clientEn || fallback?.clientEn || "",
            role: p.role || fallback?.role || "",
            roleEn: p.role_en || p.roleEn || fallback?.roleEn || "",
            description: p.description || fallback?.description || "",
            descriptionEn: p.description_en || p.descriptionEn || fallback?.descriptionEn || "",
            problem: p.problem || fallback?.problem || "",
            problemEn: p.problem_en || p.problemEn || fallback?.problemEn || "",
            solution: p.solution || fallback?.solution || "",
            solutionEn: p.solution_en || p.solutionEn || fallback?.solutionEn || "",
            impact: p.impact || fallback?.impact || "",
            impactEn: p.impact_en || p.impactEn || fallback?.impactEn || "",
            demo: p.demo || fallback?.demo || "",
            github: p.github || fallback?.github || "",
            featured: Boolean(p.featured),
            hidden: Boolean(p.hidden),
            isPrivate: Boolean(p.is_private || p.isPrivate),
            image: resolveProjectImage(p.image, fallback?.image || "/images/projects/preview.png"),
            fallbackImage: p.fallback_image || fallback?.fallbackImage || "/images/projects/preview.png",
            technologies: Array.isArray(p.technologies) ? p.technologies : (fallback?.technologies || []),
            order: p.order !== undefined ? p.order : 0,
          };
        });

        // Appliquer l'ordre défini
        formattedApiProjects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setProjects(includeHidden ? formattedApiProjects : formattedApiProjects.filter((p) => !p.hidden));
        setIsFallback(false);
      }
    } catch (err) {
      console.warn("Utilisation de la liste de projets locale:", err?.message);
      setProjects(getLocalProjects(includeHidden));
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, [includeHidden]);

  useEffect(() => {
    fetchProjects();

    const refreshLocal = () => {
      setProjects(getLocalProjects(includeHidden));
    };

    // Recharger automatiquement lorsque l'utilisateur revient sur l'onglet ou change d'appareil
    const handleFocusOrVisible = () => {
      fetchProjects();
    };

    window.addEventListener("projects_updated", refreshLocal);
    window.addEventListener("focus", handleFocusOrVisible);
    document.addEventListener("visibilitychange", handleFocusOrVisible);

    return () => {
      window.removeEventListener("projects_updated", refreshLocal);
      window.removeEventListener("focus", handleFocusOrVisible);
      document.removeEventListener("visibilitychange", handleFocusOrVisible);
    };
  }, [includeHidden, fetchProjects]);

  return { projects, loading, isFallback, refetch: fetchProjects };
}

export default useProjects;
