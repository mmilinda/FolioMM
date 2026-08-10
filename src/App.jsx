import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectsDetails from "./pages/ProjectsDetails";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

// Site Data Provider
import { SiteDataProvider } from "./context/SiteDataContext";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ProjectsManager from "./admin/ProjectsManager";
import CreateProject from "./admin/CreateProject";
import EditProject from "./admin/EditProject";
import ServicesManager from "./admin/ServicesManager";
import SkillsManager from "./admin/SkillsManager";
import TimelineManager from "./admin/TimelineManager";
import StatsManager from "./admin/StatsManager";
import ImpactManager from "./admin/ImpactManager";
import MessagesManager from "./admin/MessagesManager";
import ArticlesManager from "./admin/ArticlesManager";
import CreateArticle from "./admin/CreateArticle";
import EditArticle from "./admin/EditArticle";
import SiteSettings from "./admin/SiteSettings";

// Protection de route
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <SiteDataProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout Public */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectsDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
          </Route>

          {/* Connexion Admin (Public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Espace Admin Protégé */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="projects/create" element={<CreateProject />} />
            <Route path="projects/edit/:id" element={<EditProject />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="timeline" element={<TimelineManager />} />
            <Route path="stats" element={<StatsManager />} />
            <Route path="impact" element={<ImpactManager />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="articles/create" element={<CreateArticle />} />
            <Route path="articles/edit/:id" element={<EditArticle />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SiteDataProvider>
  );
}