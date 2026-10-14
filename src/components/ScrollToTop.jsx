import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Réinitialise automatiquement le défilement de la fenêtre vers le haut
 * à chaque changement de page / route dans l'application.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
