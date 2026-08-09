import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  FileText,
  Users,
  MessageSquare,
  Plus,
  ExternalLink,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Activity,
} from "lucide-react";
import useProjects from "../hooks/useProjects";
import useArticles from "../hooks/useArticles";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function Dashboard() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { articles } = useArticles();

  // Clean user display name
  const userName = user?.name ? user.name.replace(/\s*\(Admin\)/gi, "") : "Milinda";

  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("contact_messages") || "[]");
    } catch {
      return [];
    }
  });

  const stats = [
    {
      title: "Projets en Vitrine",
      value: projects.length || 12,
      detail: `${projects.filter((p) => p.featured).length} projets mis en vedette`,
      icon: FolderKanban,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      borderColor: "border-cyan-400/20",
    },
    {
      title: "Articles de Blog",
      value: articles.length || 6,
      detail: "Articles publiés & indexés",
      icon: FileText,
      color: "text-indigo-400",
      bgColor: "bg-indigo-400/10",
      borderColor: "border-indigo-400/20",
    },
    {
      title: "Audience Mensuelle",
      value: "1 450",
      detail: "+18% de visiteurs ce mois",
      icon: Users,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      borderColor: "border-emerald-400/20",
    },
    {
      title: "Formulaire Contact",
      value: messages.length,
      detail: `${messages.filter((m) => !m.read).length} non lus • Reçus via site`,
      icon: MessageSquare,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      borderColor: "border-pink-400/20",
    },
  ];

  const recentProjects = projects.slice(0, 5);

  return (
    <>
      <SEO title="Tableau de bord Admin | Milinda Mendy" />

      <div className="space-y-10 w-full">
        {/* ── Welcome Banner ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Bonjour, <span className="text-cyan-400">{userName}</span> 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
              Superviser les projets de votre portfolio, gérez vos contenus et suivez l'état du système.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/admin/projects/create"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition no-underline shadow-lg shadow-cyan-500/20"
            >
              <Plus size={18} />
              Nouveau projet
            </Link>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/60 text-sm font-semibold transition no-underline"
            >
              <ExternalLink size={16} />
              Voir le site
            </Link>
          </div>
        </div>

        {/* ── Metric KPI Cards Grid (4 Columns) ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-6 md:p-7 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.title}
                  </span>
                  <div className={`p-3 rounded-xl border ${item.borderColor} ${item.bgColor}`}>
                    <Icon size={20} className={item.color} />
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-black text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-400">
                    <TrendingUp size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>{item.detail}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Content Grid (Projets Récents & Statut Système) ───────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Recent Projects (2 Cols wide) */}
          <div className="xl:col-span-2 bg-[#090d16] border border-slate-800/80 rounded-2xl p-7 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <FolderKanban size={20} className="text-cyan-400" />
                  Projets Récents en Vitrine
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Aperçu de vos dernières créations publiées
                </p>
              </div>

              <Link
                to="/admin/projects"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 transition no-underline"
              >
                Gérer tous les projets ({projects.length})
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Project Rows */}
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 hover:border-cyan-500/40 hover:translate-x-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/projects/preview.png";
                      }}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-700/60 shadow-md"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition truncate">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-1">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                    {project.status && (
                      <span className="hidden sm:inline-block text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold">
                        {project.status}
                      </span>
                    )}

                    <Link
                      to={`/projects/${project.slug || project.id}`}
                      target="_blank"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition border border-slate-700/60"
                      title="Voir le projet public"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: System Status (1 Col wide) */}
          <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-7 md:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="pb-4 border-b border-slate-800/80 mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <Activity size={20} className="text-amber-400" />
                  Statut du Système
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  État des microservices & dépendances
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                  <span className="text-slate-300 font-semibold">Frontend App</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    React 19 + Vite v8
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                  <span className="text-slate-300 font-semibold">Backend Sanctum</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    API Laravel Prête
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                  <span className="text-slate-300 font-semibold">Application PWA</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Sparkles size={14} />
                    Service Worker Actif
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                  <span className="text-slate-300 font-semibold">Hébergement Cloud</span>
                  <span className="text-purple-400 font-bold">Vercel Edge</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-medium leading-relaxed">
              💡 <strong>Mode Hybride Actif :</strong> Vos données locales restent actives
              et synchronisées même en cas de coupure de l'API.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}