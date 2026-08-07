import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section border-t border-white/10 mt-12 md:mt-24 bg-slate-950/60 backdrop-blur-md">
      <div className="container-custom footer-grid py-4 md:py-12 grid grid-cols-3 gap-2 sm:gap-6 md:gap-10">
        
        {/* Column 1 — Brand */}
        <div className="footer-brand flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-3">
              <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-cyan-400/40 p-0.5 bg-cyan-400/10 shrink-0">
                <img src="/logoMM.jpg" alt="MM Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <h2 className="text-xs sm:text-xl font-bold tracking-tight text-white m-0">
                <span className="gradient-text">MILINDA</span>_MENDY
              </h2>
            </div>
            <p className="text-slate-400 text-[10px] sm:text-sm mt-1.5 leading-tight sm:leading-relaxed">
              Développeuse Full Stack & DevOps. Produits digitaux & SaaS.
            </p>
          </div>
        </div>

        {/* Column 2 — Navigation */}
        <div className="footer-nav">
          <h3 className="font-bold text-xs sm:text-base text-white mb-1.5 sm:mb-4">
            Navigation
          </h3>
          <ul className="space-y-1 sm:space-y-2.5 text-slate-400 text-[10px] sm:text-sm p-0 m-0 list-none">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors no-underline text-inherit">Accueil</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-cyan-400 transition-colors no-underline text-inherit">Projets</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-cyan-400 transition-colors no-underline text-inherit">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors no-underline text-inherit">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 — Contact & Socials */}
        <div className="footer-contact">
          <h3 className="font-bold text-xs sm:text-base text-white mb-1.5 sm:mb-4">
            Contact
          </h3>
          <div className="space-y-1 sm:space-y-2.5 text-slate-400 text-[10px] sm:text-sm">
            <a href="mailto:mmilinda00@gmail.com" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors no-underline text-inherit truncate">
              <Mail size={13} className="shrink-0 text-cyan-400" />
              <span className="truncate">mmilinda00@gmail.com</span>
            </a>
            <a href="tel:+221773754672" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors no-underline text-inherit truncate">
              <Phone size={13} className="shrink-0 text-cyan-400" />
              <span>+221 77 375 46 72</span>
            </a>
            
            <div className="flex items-center gap-2.5 pt-1 sm:pt-2">
              <a 
                href="https://github.com/mmilinda" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <FaGithub size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/milinda-mendy-5ba17928a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <FaLinkedin size={16} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="footer-bottom text-center border-t border-white/10 py-2.5 sm:py-4 text-[9px] sm:text-xs text-slate-500">
        © 2026 Milinda Mendy — Crafted with Performance 🚀
      </div>
    </footer>
  );
}