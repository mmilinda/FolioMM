import { useState, useEffect } from "react";
import api from "../services/api";
import staticProjects from "../data/projects";

export function useProjects() {
  const [projects, setProjects] = useState(staticProjects);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        const res = await api.get("/projects", { timeout: 3000 });
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
          setIsFallback(false);
        } else if (isMounted) {
          setProjects(staticProjects);
          setIsFallback(true);
        }
      } catch (err) {
        if (isMounted) {
          // Backend API is offline or not reachable -> use static projects data
          setProjects(staticProjects);
          setIsFallback(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading, isFallback };
}

export default useProjects;
