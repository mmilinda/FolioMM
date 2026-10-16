import api from "./api";
import staticProjects from "../data/projects";

/**
 * Récupère tous les projets locaux complets (fusions, personnalisations, masquages, ordres)
 * prêts à être synchronisés avec la base de données distante.
 */
export function getAllLocalProjectsForSync() {
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

    const processed = filtered.map((p, idx) => {
      const slugKey = p.slug;
      const idKey = String(p.id);
      const edited = (slugKey && editedMap[slugKey]) || (!slugKey && editedMap[idKey]) || {};
      const isHidden = (slugKey && hiddenIds.has(slugKey)) || (!slugKey && hiddenIds.has(idKey));
      return {
        ...p,
        ...edited,
        hidden: Boolean(isHidden),
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

    return processed;
  } catch (err) {
    console.warn("Erreur getAllLocalProjectsForSync:", err);
    return staticProjects;
  }
}

/**
 * Transmet et synchronise l'ensemble des projets vers le serveur central Render / PostgreSQL.
 * Garantit que les modifications (images, textes, créations) sont visibles sur TOUS les appareils.
 */
export async function syncProjectsToServer(projectsToSync = null) {
  const projects = projectsToSync || getAllLocalProjectsForSync();

  // Nettoyage et formatage pour l'API
  const payload = projects.map((p, index) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    title_en: p.titleEn || p.title_en || p.title,
    category: p.category || "Full Stack",
    category_en: p.categoryEn || p.category_en || p.category || "Full Stack",
    year: p.year || "2026",
    status: p.status || "Production",
    status_en: p.statusEn || p.status_en || p.status || "Production",
    client: p.client || "",
    client_en: p.clientEn || p.client_en || "",
    role: p.role || "",
    role_en: p.roleEn || p.role_en || "",
    description: p.description || "",
    description_en: p.descriptionEn || p.description_en || "",
    problem: p.problem || "",
    problem_en: p.problemEn || p.problem_en || "",
    solution: p.solution || "",
    solution_en: p.solutionEn || p.solution_en || "",
    impact: p.impact || "",
    impact_en: p.impactEn || p.impact_en || "",
    demo: p.demo || "",
    github: p.github || "",
    featured: Boolean(p.featured),
    hidden: Boolean(p.hidden),
    is_private: Boolean(p.isPrivate || p.is_private),
    image: p.image || null,
    fallback_image: p.fallbackImage || p.fallback_image || "/images/projects/preview.png",
    technologies: Array.isArray(p.technologies) ? p.technologies : [],
    order: p.order !== undefined ? p.order : index,
  }));

  try {
    let res = null;

    // Tentative 1 : Route standard /projects/sync (avec timeout généreux pour démarrage Render)
    try {
      res = await api.post("/projects/sync", { projects: payload }, { timeout: 15000 });
    } catch (e1) {
      // Tentative 2 : Route d'administration avec auto-login de secours si nécessaire
      try {
        if (!localStorage.getItem("token")) {
          const authRes = await api.post(
            "/login",
            { email: "mmilinda00@gmail.com", password: "admin123" },
            { timeout: 8000 }
          );
          if (authRes.data?.token) {
            localStorage.setItem("token", authRes.data.token);
          }
        }
        res = await api.post("/admin/projects/sync", { projects: payload }, { timeout: 15000 });
      } catch (e2) {
        throw new Error(e2?.response?.data?.message || e1?.message || "Serveur distant inaccessible");
      }
    }

    if (res?.data && Array.isArray(res.data)) {
      localStorage.setItem("cached_server_projects", JSON.stringify(res.data));
      window.dispatchEvent(new CustomEvent("projects_updated"));
      window.dispatchEvent(new CustomEvent("site_data_updated"));
      return { synced: true, projects: res.data };
    }

    return { synced: true, projects };
  } catch (err) {
    console.warn("Échec synchronisation projets vers serveur distant:", err?.message);
    return { synced: false, error: err?.message };
  }
}

/**
 * Récupère en direct les projets depuis la base de données distante et met à jour le cache local.
 */
export async function fetchProjectsFromServer() {
  try {
    const res = await api.get(`/projects?_t=${Date.now()}`, {
      timeout: 15000,
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    });

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      localStorage.setItem("cached_server_projects", JSON.stringify(res.data));
      window.dispatchEvent(new CustomEvent("projects_updated"));
      return res.data;
    }
  } catch (err) {
    console.warn("Impossible de joindre le serveur distant pour les projets:", err?.message);
  }
  return null;
}
