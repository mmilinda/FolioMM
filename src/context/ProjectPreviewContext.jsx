import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ProjectPreviewContext = createContext(null);

export function ProjectPreviewProvider({ children }) {
  const [activeProject, setActiveProject] = useState(null);

  const openPreview = useCallback((project) => {
    setActiveProject(project);
  }, []);

  const closePreview = useCallback(() => {
    setActiveProject(null);
  }, []);

  // Lock body scroll when preview is active
  useEffect(() => {
    if (activeProject) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activeProject]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeProject) {
        closePreview();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, closePreview]);

  return (
    <ProjectPreviewContext.Provider
      value={{
        activeProject,
        isOpen: Boolean(activeProject),
        openPreview,
        closePreview,
      }}
    >
      {children}
    </ProjectPreviewContext.Provider>
  );
}

export function useProjectPreview() {
  const ctx = useContext(ProjectPreviewContext);
  if (!ctx) {
    throw new Error("useProjectPreview must be used within a ProjectPreviewProvider");
  }
  return ctx;
}
