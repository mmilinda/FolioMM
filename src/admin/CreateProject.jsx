import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FolderPlus, ArrowLeft, UploadCloud, CheckCircle, Sparkles } from "lucide-react";
import api from "../services/api";
import SEO from "../components/SEO";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function CreateProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    problem: "",
    solution: "",
    technologies: "",
    impact: "",
    demo: "",
    github: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const techArray = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = slugify(form.title) || `project-${Date.now()}`;
    const newProject = {
      id: Date.now(),
      slug,
      title: form.title,
      titleEn: form.title,
      category: form.category,
      categoryEn: form.category,
      description: form.description,
      descriptionEn: form.description,
      problem: form.problem || form.description,
      problemEn: form.problem || form.description,
      solution: form.solution || form.description,
      solutionEn: form.solution || form.description,
      impact: form.impact || "Projet livré avec succès",
      impactEn: form.impact || "Project successfully delivered",
      technologies: techArray.length > 0 ? techArray : ["React", "Tailwind"],
      demo: form.demo || "#",
      github: form.github || "#",
      featured: true,
      image: imagePreview || "/images/projects/preview.png",
      status: "Terminé",
      statusEn: "Completed",
    };

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("problem", form.problem);
      formData.append("solution", form.solution);
      formData.append("impact", form.impact);
      formData.append("demo", form.demo);
      formData.append("github", form.github);
      techArray.forEach((tech) => formData.append("technologies[]", tech));
      if (image) formData.append("image", image);

      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 2000,
      });
    } catch (err) {
      console.warn("API Offline, storing locally in custom_projects");
    } finally {
      // Local sync fallback
      try {
        const existing = JSON.parse(localStorage.getItem("custom_projects") || "[]");
        localStorage.setItem("custom_projects", JSON.stringify([newProject, ...existing]));
        window.dispatchEvent(new CustomEvent("projects_updated"));
      } catch (err) {
        console.error("Local storage error:", err);
      }

      setLoading(false);
      navigate("/admin/projects");
    }
  }

  return (
    <>
      <SEO title="Nouveau projet | Administration" />

      <div className="space-y-6 max-w-4xl">
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition no-underline"
        >
          <ArrowLeft size={16} />
          Retour à la liste des projets
        </Link>

        <div className="pb-4 border-b border-slate-800/80">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderPlus className="text-cyan-400" size={24} />
            Ajouter un Nouveau Projet
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Remplissez les informations ci-dessous pour publier un projet sur votre portfolio
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl"
        >
          {error && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
              ℹ️ {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Titre du projet *
              </label>
              <input
                name="title"
                placeholder="Ex: AgriChain AI"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Catégorie *
              </label>
              <input
                name="category"
                placeholder="Ex: SaaS • IA • DevOps"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Description complète *
            </label>
            <textarea
              name="description"
              placeholder="Présentez brièvement l'objectif et les fonctionnalités clés du projet..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                🎯 Problème résolu
              </label>
              <textarea
                name="problem"
                placeholder="Quel était le défi ou le besoin initial ?"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.problem}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                💡 Solution apportée
              </label>
              <textarea
                name="solution"
                placeholder="Comment votre application y répond-elle ?"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.solution}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Technologies (séparées par des virgules)
              </label>
              <input
                name="technologies"
                placeholder="React, Laravel, Tailwind, Docker"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.technologies}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                📈 Impact & Résultats
              </label>
              <input
                name="impact"
                placeholder="Ex: Digitalisation des opérations & gain de 40% de temps"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.impact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Lien Démo (URL)
              </label>
              <input
                name="demo"
                placeholder="https://mon-projet.vercel.app"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.demo}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Lien GitHub (URL)
              </label>
              <input
                name="github"
                placeholder="https://github.com/mmilinda/mon-projet"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                value={form.github}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Image / Capture d'écran du projet *
            </label>
            <div className="relative border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition bg-slate-900/40">
              <UploadCloud size={32} className="mx-auto text-cyan-400 mb-2" />
              <p className="text-xs text-slate-300 font-medium">
                Cliquez pour choisir un fichier image (PNG, JPG, WEBP)
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Taille maximale : 2 Mo</p>

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />

              {image && (
                <div className="mt-3 text-xs font-bold text-emerald-400 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                  <CheckCircle size={14} /> Fichier sélectionné : {image.name}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  Enregistrement du projet...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Enregistrer et publier le projet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}