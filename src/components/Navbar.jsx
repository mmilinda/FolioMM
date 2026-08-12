import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSiteData } from "../context/SiteDataContext";

export default function Navbar() {
  const { i18n } = useTranslation();
  const { profile } = useSiteData();
  const [open, setOpen] = useState(false);

  // ── Dark Mode State ──────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(nextLang);
  };

  const currentLang = i18n.language || "fr";
  const isFr = currentLang.toLowerCase().startsWith("fr");

  const links = [
    { name: isFr ? "Accueil" : "Home", path: "/" },
    { name: isFr ? "Projets" : "Projects", path: "/projects" },
    { name: isFr ? "Blog" : "Blog", path: "/blog" },
    { name: isFr ? "Contact" : "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 glass"
    >
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 text-xl font-bold tracking-wider no-underline text-inherit group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-cyan-400/40 p-0.5 bg-cyan-400/10 group-hover:scale-105 transition-transform flex-shrink-0">
            <img src={profile?.avatar || profile?.photo || "/logoMM.jpg"} alt={profile?.name || "Milinda Mendy"} className="w-full h-full object-cover rounded-full" />
          </div>
          <span>
            <span className="gradient-text">MILINDA</span>_MENDY
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors no-underline ${
                  isActive ? "text-cyan-400 font-semibold" : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            title={isFr ? "Switch to English" : "Passer en Français"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold transition cursor-pointer hover:bg-cyan-400/20"
          >
            <Globe size={14} className="text-cyan-400 shrink-0" />
            <span className={isFr ? "text-cyan-400 font-bold" : "text-slate-400"}>FR</span>
            <span className="text-cyan-400/40 font-light">|</span>
            <span className={!isFr ? "text-cyan-400 font-bold" : "text-slate-400"}>EN</span>
          </button>

          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-200 hover:text-cyan-400 hover:border-cyan-400/40 transition cursor-pointer flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Sun size={16} className="text-amber-400 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon size={16} className="text-purple-400 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Language button mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold"
          >
            <Globe size={13} className="text-cyan-400" />
            <span className={isFr ? "text-cyan-400 font-bold" : "text-slate-400"}>FR</span>
            <span className="text-cyan-400/40 font-light">|</span>
            <span className={!isFr ? "text-cyan-400 font-bold" : "text-slate-400"}>EN</span>
          </button>

          {/* Theme button mobile */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-white/10 text-gray-200"
          >
            {theme === "dark" ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-purple-400" />}
          </button>

          {/* Hamburger toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl"
        >
          {links.map((link) => (
            <NavLink
              onClick={() => setOpen(false)}
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-base font-medium transition ${
                  isActive ? "text-cyan-400 font-semibold" : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}