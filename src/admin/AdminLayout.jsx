import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Globe,
  PlusCircle,
  Shield,
  User,
} from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Tableau de Bord", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Gestion Projets", path: "/admin/projects", icon: FolderKanban, end: true },
    { name: "Nouveau Projet", path: "/admin/projects/create", icon: PlusCircle, end: false },
  ];

  const getPageTitle = () => {
    if (location.pathname === "/admin") return "Tableau de bord";
    if (location.pathname === "/admin/projects") return "Gestion des projets";
    if (location.pathname === "/admin/projects/create") return "Nouveau projet";
    return "Administration";
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-[#090d16] border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
        <div>
          {/* Logo Brand */}
          <Link to="/admin" className="flex items-center gap-3 px-2 py-3 mb-6 no-underline">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/40 p-0.5 bg-cyan-400/10 flex-shrink-0 shadow-lg shadow-cyan-500/10">
              <img src="/logoMM.jpg" alt="MM" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-wider text-white">
                MILINDA<span className="text-cyan-400">_ADMIN</span>
              </h2>
              <span className="text-[11px] font-medium text-slate-400">Console d'administration</span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          {/* Public site link */}
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition no-underline group"
          >
            <span className="flex items-center gap-2">
              <Globe size={15} className="text-slate-500 group-hover:text-cyan-400 transition" />
              Voir le site public
            </span>
            <span className="text-[10px] text-slate-500">↗</span>
          </Link>

          {/* Logout button */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer border border-rose-500/20"
          >
            <LogOut size={15} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#090d16]/80 backdrop-blur-md border-b border-slate-800/80 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-white tracking-tight">{getPageTitle()}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              En Ligne
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs">
              <Shield size={14} className="text-cyan-400" />
              <span className="text-slate-300 font-medium">{user?.email || "mmilinda00@gmail.com"}</span>
            </div>

            <Link
              to="/admin/projects/create"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition no-underline shadow-sm"
            >
              <PlusCircle size={15} />
              Ajouter projet
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-8 md:p-10 flex-1 w-full bg-[#030712]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}