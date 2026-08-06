import ReactGA from "react-ga4";

export function Analytics() {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  // Ne pas initialiser si la clé est absente ou contient un placeholder
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "TON_ID_ANALYTICS") {
    console.log("Google Analytics désactivé (VITE_GA_MEASUREMENT_ID non configuré).");
    return;
  }

  try {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  } catch (err) {
    console.warn("Échec de l'initialisation de Google Analytics :", err);
  }
}