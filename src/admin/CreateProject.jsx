import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FolderPlus, ArrowLeft, UploadCloud, CheckCircle, Sparkles } from "lucide-react";
import api from "../services/api";
import SEO from "../components/SEO";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

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

      const techArray = form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      techArray.forEach((tech) => formData.append("technologies[]", tech));

      if (image) {
        formData.append("image", image);
      }

      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/projects");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Erreur lors de la création du projet via l'API (En mode démo, le formulaire s'exécute en simulation).";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO title="Nouveau projet | Administration" />

      <div className="space-y-6 max-w-4xl">
        {/* Back Link */}
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition no-underline"
        >
          <ArrowLeft size={16} />
          Retour à la liste des projets
        </Link>

        {/* Header */}
        <div className="pb-4 border-b border-slate-800/80">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderPlus className="text-cyan-400" size={24} />
            Ajouter un Nouveau Projet
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Remplissez les informations ci-dessous pour publier un projet sur votre portfolio
          </p>
        </div>

        {/* Form Container */}
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
            {/* Title */}
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

            {/* Category */}
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

          {/* Description */}
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
            {/* Problem */}
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

            {/* Solution */}
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
            {/* Technologies */}
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

            {/* Impact */}
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
            {/* Demo Link */}
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

            {/* GitHub Link */}
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

          {/* Image Upload Area */}
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
                onChange={(e) => setImage(e.target.files[0])}
                required
              />

              {image && (
                <div className="mt-3 text-xs font-bold text-emerald-400 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                  <CheckCircle size={14} /> Fichier sélectionné : {image.name}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
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