import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSiteData } from "../context/SiteDataContext";

export default function Footer() {
  const { t } = useTranslation();
  const { profile } = useSiteData();

  return (
    <footer className="footer-section border-t border-white/10 mt-12 md:mt-24 bg-slate-950/60 backdrop-blur-md">
      <div className="container-custom footer-grid py-4 md:py-12 grid grid-cols-3 items-start gap-3 sm:gap-6 md:gap-10">
        
        {/* Column 1 — Brand */}
        <div className="footer-brand flex flex-col items-start justify-start w-full">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-h-[24px] sm:min-h-[32px]">
            <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-cyan-400/40 p-0.5 bg-cyan-400/10 shrink-0">
              <img src={profile?.avatar || profile?.photo || "/logoMM.jpg"} alt={profile?.name || "MM Logo"} className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-xs sm:text-lg font-bold tracking-tight text-white m-0 leading-none flex items-center">
              <span className="gradient-text">MILINDA</span>_MENDY
            </h2>
          </div>
          <p className="text-slate-400 text-[10px] sm:text-sm mt-2 leading-tight sm:leading-relaxed">
            {profile?.headline || t("footer.desc")}
          </p>
        </div>

        {/* Column 2 — Navigation */}
        <div className="footer-nav flex flex-col items-start justify-start w-full pl-1 sm:pl-0">
          <div className="min-h-[24px] sm:min-h-[32px] flex items-center">
            <h3 className="font-bold text-xs sm:text-base text-white m-0 leading-none">
              Navigation
            </h3>
          </div>
          <ul className="space-y-1 sm:space-y-2 text-slate-400 text-[10px] sm:text-sm p-0 m-0 mt-2 list-none">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors no-underline text-inherit">{t("nav.home")}</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-cyan-400 transition-colors no-underline text-inherit">{t("nav.projects")}</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-cyan-400 transition-colors no-underline text-inherit">{t("nav.blog")}</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors no-underline text-inherit">{t("nav.contact")}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 — Contact & Socials */}
        <div className="footer-contact flex flex-col items-start justify-start w-full">
          <div className="min-h-[24px] sm:min-h-[32px] flex items-center">
            <h3 className="font-bold text-xs sm:text-base text-white m-0 leading-none">
              Contact
            </h3>
          </div>
          <div className="space-y-1.5 sm:space-y-2 text-slate-400 text-[10px] sm:text-sm mt-2 w-full">
            <a href={`mailto:${profile?.email || "mmilinda00@gmail.com"}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors no-underline text-inherit truncate">
              <Mail size={13} className="shrink-0 text-cyan-400" />
              <span className="truncate">{profile?.email || "mmilinda00@gmail.com"}</span>
            </a>
            
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href={profile?.github || "https://github.com/mmilinda"} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <FaGithub size={15} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href={profile?.linkedin || "https://www.linkedin.com/in/milinda-mendy-5ba17928a/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <FaLinkedin size={15} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="footer-bottom text-center border-t border-white/10 py-2.5 sm:py-4 text-[9px] sm:text-xs text-slate-500">
        © 2026 {profile?.name || "Milinda Mendy"} — {t("footer.rights")} 🚀
      </div>
    </footer>
  );
}