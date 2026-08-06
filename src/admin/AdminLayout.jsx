import { Outlet, NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, FolderKanban, LogOut, Globe, PlusCircle } from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between glass">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-wider gradient-text">
              MILINDA_ADMIN
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Connecté : {user?.name || user?.email || "Admin"}
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/projects"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <FolderKanban size={18} />
              Gestion Projets
            </NavLink>

            <NavLink
              to="/admin/projects/create"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <PlusCircle size={18} />
              Nouveau Projet
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition no-underline"
          >
            <Globe size={15} />
            Voir le site public
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition cursor-pointer border border-red-500/20"
          >
            <LogOut size={15} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}