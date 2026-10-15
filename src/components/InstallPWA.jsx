import { useState, useEffect } from "react";
import { Smartphone, Download, CheckCircle, X, Share2, PlusSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPWA({ variant = "footer" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [installedToast, setInstalledToast] = useState(false);

  useEffect(() => {
    // 1. Détecter si l'app tourne déjà en mode autonome (PWA installée)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // 2. Détecter si l'appareil est sous iOS (Safari)
    const userAgent = window.navigator.userAgent || "";
    const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    setIsIos(isAppleDevice);

    // 3. Capturer l'événement natif d'installation PWA (Android / Chrome Desktop)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async (e) => {
    e?.preventDefault();

    if (isInstalled) {
      setInstalledToast(true);
      setTimeout(() => setInstalledToast(false), 3000);
      return;
    }

    // Si on a le prompt natif (Android, Chrome Desktop, Edge)
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      return;
    }

    // Si appareil iOS Safari (Apple ne supporte pas beforeinstallprompt)
    if (isIos) {
      setShowIosModal(true);
      return;
    }

    // Si aucun prompt n'est disponible (ex: Firefox ou déjà invité)
    setShowIosModal(true);
  };

  // ── Variante Mobile Menu ───────────────────────────────────────────────────
  if (variant === "mobile") {
    return (
      <>
        <button
          onClick={handleInstallClick}
          type="button"
          className="w-full text-left pt-3 mt-1 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 hover:text-cyan-400 transition cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Smartphone size={14} className="text-cyan-400/70" />
            <span>{isInstalled ? "Application installée" : "Installer l'App (PWA)"}</span>
          </span>
          <Download size={13} className="text-slate-500" />
        </button>

        {renderModals()}
      </>
    );
  }

  // ── Variante Footer (Ultra Discrète) ───────────────────────────────────────
  return (
    <>
      <button
        onClick={handleInstallClick}
        type="button"
        className="hover:text-cyan-400 transition-colors text-slate-500 flex items-center gap-1 text-[9px] sm:text-xs cursor-pointer bg-transparent border-0 p-0"
        title="Installer le portfolio en tant qu'application mobile / bureau (PWA)"
      >
        <Smartphone size={11} className="text-cyan-400/70" />
        <span>{isInstalled ? "App ✓" : "Installer l'App"}</span>
      </button>

      {renderModals()}
    </>
  );

  function renderModals() {
    return (
      <>
        {/* Toast confirmation si déjà installée */}
        <AnimatePresence>
          {installedToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-400/40 text-cyan-300 text-xs font-semibold shadow-2xl flex items-center gap-2 backdrop-blur-md"
            >
              <CheckCircle size={16} className="text-cyan-400" />
              <span>L'application est déjà installée sur cet appareil !</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Guide d'installation Mobile (iOS / Instructions manuelles) */}
        <AnimatePresence>
          {showIosModal && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl text-white"
              >
                <button
                  onClick={() => setShowIosModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <Smartphone size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white m-0">Installer l'Application</h3>
                    <p className="text-xs text-slate-400 m-0">Milinda Mendy Portfolio</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-white/5 mb-5">
                  {isIos ? (
                    <>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                        <span>Appuyez sur le bouton <strong>Partager</strong> en bas de Safari <Share2 size={13} className="inline text-cyan-400" /></span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                        <span>Faites défiler vers le bas et sélectionnez <strong>Sur l'écran d'accueil</strong> <PlusSquare size={13} className="inline text-cyan-400" /></span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                        <span>Appuyez sur <strong>Ajouter</strong> en haut à droite.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                        <span>Appuyez sur les <strong>3 petits points (⋮)</strong> en haut à droite du navigateur.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                        <span>Sélectionnez <strong>Installer l'application</strong> (ou <em>Ajouter à l'écran d'accueil</em>).</span>
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowIosModal(false)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs hover:opacity-95 transition"
                >
                  J'ai compris
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }
}
