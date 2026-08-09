import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Globe,
  PlusCircle,
  MessageSquare,
  Shield,
  Menu,
  X,
  FileText,
  FilePlus,
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Responsive desktop detection
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  // Dark Mode Theme State
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("admin_theme");
      return savedTheme ? savedTheme === "dark" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleTheme() {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    localStorage.setItem("admin_theme", nextTheme ? "dark" : "light");
    window.dispatchEvent(new CustomEvent("theme_changed"));
  }

  const navItems = [
    { name: "Tableau de Bord", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Gestion Projets", path: "/admin/projects", icon: FolderKanban, end: true },
    { name: "Nouveau Projet", path: "/admin/projects/create", icon: PlusCircle, end: false },
    { name: "Articles de Blog", path: "/admin/articles", icon: FileText, end: true },
    { name: "Rédiger Article", path: "/admin/articles/create", icon: FilePlus, end: false },
    { name: "Messages Reçus", path: "/admin/messages", icon: MessageSquare, end: false },
    { name: "Paramètres Site", path: "/admin/settings", icon: Settings, end: false },
  ];

  const getPageTitle = () => {
    if (location.pathname === "/admin") return "Tableau de bord";
    if (location.pathname === "/admin/projects") return "Gestion des projets";
    if (location.pathname === "/admin/projects/create") return "Nouveau projet";
    if (location.pathname === "/admin/articles") return "Gestion du blog";
    if (location.pathname === "/admin/articles/create") return "Rédiger un article";
    if (location.pathname === "/admin/messages") return "Boîte de réception";
    if (location.pathname === "/admin/settings") return "Paramètres du site";
    return "Administration";
  };

  // Dynamic Theme Palette Colors
  const theme = {
    bg: darkMode ? "#030712" : "#1e293b",
    sidebarBg: darkMode ? "#090d16" : "#0f172a",
    headerBg: darkMode ? "rgba(9, 13, 22, 0.95)" : "rgba(15, 23, 42, 0.95)",
    cardBg: darkMode ? "rgba(9, 13, 22, 0.85)" : "rgba(30, 41, 59, 0.9)",
    border: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.12)",
    text: darkMode ? "#f8fafc" : "#f1f5f9",
    subtext: darkMode ? "#94a3b8" : "#cbd5e1",
    activeNavBg: darkMode ? "rgba(56, 189, 248, 0.12)" : "rgba(56, 189, 248, 0.2)",
    activeNavText: "#38bdf8",
  };

  const sidebarWidth = isCollapsed && isDesktop ? "78px" : "260px";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        display: "flex",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Mobile Drawer Overlay */}
      {mobileOpen && !isDesktop && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: darkMode ? "rgba(2, 6, 23, 0.8)" : "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: sidebarWidth,
          background: theme.sidebarBg,
          borderRight: `1px solid ${theme.border}`,
          padding: isCollapsed && isDesktop ? "1.25rem 0.75rem" : "1.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          transform: isDesktop || mobileOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: mobileOpen && !isDesktop ? "10px 0 30px rgba(0,0,0,0.5)" : "none",
          overflowX: "hidden",
        }}
      >
        <div>
          {/* Logo Brand Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed && isDesktop ? "center" : "space-between",
              marginBottom: "1.75rem",
              paddingBottom: "1rem",
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <Link
              to="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(56,189,248,0.4)",
                  padding: "2px",
                  background: "rgba(56,189,248,0.1)",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logoMM.jpg"
                  alt="MM Logo"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
              {(!isCollapsed || !isDesktop) && (
                <div>
                  <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: theme.text, margin: 0, tracking: "0.05em" }}>
                    MILINDA<span style={{ color: "#38bdf8" }}>_ADMIN</span>
                  </h2>
                  <span style={{ fontSize: "0.68rem", fontWeight: 500, color: theme.subtext, display: "block" }}>
                    Console Admin
                  </span>
                </div>
              )}
            </Link>

            {isDesktop && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                  background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  border: `1px solid ${theme.border}`,
                  borderRadius: "8px",
                  padding: "4px",
                  color: theme.subtext,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={isCollapsed ? "Agrandir le menu" : "Réduire le menu"}
              >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            )}

            {!isDesktop && (
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: theme.subtext,
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Nav Items */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  title={isCollapsed && isDesktop ? item.name : undefined}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed && isDesktop ? "center" : "flex-start",
                    gap: "12px",
                    padding: isCollapsed && isDesktop ? "12px" : "10px 14px",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? theme.activeNavText : theme.subtext,
                    background: isActive ? theme.activeNavBg : "transparent",
                    border: isActive ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid transparent",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  })}
                >
                  <Icon size={18} />
                  {(!isCollapsed || !isDesktop) && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Footer */}
        <div style={{ paddingTop: "1rem", borderTop: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed && isDesktop ? "center" : "space-between",
              padding: isCollapsed && isDesktop ? "10px" : "10px 14px",
              borderRadius: "12px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: theme.subtext,
              textDecoration: "none",
              background: darkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
              border: `1px solid ${theme.border}`,
            }}
            title={isCollapsed && isDesktop ? "Voir le site public" : undefined}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Globe size={15} color="#38bdf8" />
              {(!isCollapsed || !isDesktop) && "Voir le site public"}
            </span>
            {(!isCollapsed || !isDesktop) && <span style={{ fontSize: "0.7rem", color: theme.subtext }}>↗</span>}
          </Link>

          <button
            onClick={logout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed && isDesktop ? "center" : "flex-start",
              gap: "8px",
              padding: isCollapsed && isDesktop ? "10px" : "10px 14px",
              borderRadius: "12px",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#f87171",
              background: "rgba(248, 113, 113, 0.08)",
              border: "1px solid rgba(248, 113, 113, 0.2)",
              cursor: "pointer",
            }}
            title={isCollapsed && isDesktop ? "Se déconnecter" : undefined}
          >
            <LogOut size={15} />
            {(!isCollapsed || !isDesktop) && "Se déconnecter"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: isDesktop ? sidebarWidth : "0",
          width: isDesktop ? `calc(100% - ${sidebarWidth})` : "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeight: "100vh",
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        {/* Top Header Bar */}
        <header
          style={{
            height: "64px",
            background: theme.headerBg,
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${theme.border}`,
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 30,
            transition: "background 0.3s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {!isDesktop && (
              <button
                onClick={() => setMobileOpen(true)}
                style={{
                  background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  border: `1px solid ${theme.border}`,
                  borderRadius: "10px",
                  padding: "8px",
                  color: theme.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Menu size={20} />
              </button>
            )}

            <h1 style={{ fontSize: "0.95rem", fontWeight: 800, color: theme.text, margin: 0, letterSpacing: "-0.01em" }}>
              {getPageTitle()}
            </h1>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 10px",
                borderRadius: "20px",
                background: "rgba(52, 211, 153, 0.1)",
                border: "1px solid rgba(52, 211, 153, 0.2)",
                color: "#34d399",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} />
              En Ligne
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Dark Mode / Soft Slate Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "10px",
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(56, 189, 248, 0.12)",
                border: `1px solid ${theme.border}`,
                color: theme.text,
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              title={darkMode ? "Passer en Thème Doux Slate" : "Passer en Thème Sombre OLED"}
            >
              {darkMode ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#38bdf8" />}
              <span>{darkMode ? "Thème Doux" : "Thème OLED"}</span>
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "10px",
                background: darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                border: `1px solid ${theme.border}`,
                fontSize: "0.78rem",
              }}
            >
              <Shield size={14} color="#38bdf8" />
              <span style={{ color: theme.text, fontWeight: 600 }}>{user?.email || "mmilinda00@gmail.com"}</span>
            </div>

            <Link
              to="/admin/projects/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "10px",
                background: "#38bdf8",
                color: "#020617",
                fontSize: "0.78rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(56,189,248,0.25)",
              }}
            >
              <PlusCircle size={15} />
              <span>Nouveau projet</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Main Content */}
        <main style={{ padding: "1.75rem", flex: 1, width: "100%", background: theme.bg, boxSizing: "border-box", transition: "background 0.3s" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}