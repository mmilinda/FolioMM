import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

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
      // Le backend attend un multipart/form-data car il reçoit un fichier image
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("problem", form.problem);
      formData.append("solution", form.solution);
      formData.append("impact", form.impact);
      formData.append("demo", form.demo);
      formData.append("github", form.github);

      // Le modèle Project caste "technologies" en array (JSON) côté Laravel
      // On envoie un tableau via FormData
      const techArray = form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      techArray.forEach((tech) =>
        formData.append("technologies[]", tech)
      );

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
        JSON.stringify(err?.response?.data?.errors) ||
        "Erreur lors de la création du projet.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Nouveau projet</h1>

      <form
        onSubmit={submit}
        className="glass p-8 rounded-3xl space-y-4 max-w-2xl"
      >
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          name="title"
          placeholder="Titre *"
          className="input-style"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Catégorie (ex: DevOps, Cloud, IA…)"
          className="input-style"
          value={form.category}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description *"
          className="input-style"
          rows={3}
          value={form.description}
          onChange={handleChange}
          required
        />

        <textarea
          name="problem"
          placeholder="Problème résolu"
          className="input-style"
          rows={2}
          value={form.problem}
          onChange={handleChange}
        />

        <textarea
          name="solution"
          placeholder="Solution apportée"
          className="input-style"
          rows={2}
          value={form.solution}
          onChange={handleChange}
        />

        <input
          name="technologies"
          placeholder="Technologies (séparées par des virgules)"
          className="input-style"
          value={form.technologies}
          onChange={handleChange}
        />

        <input
          name="impact"
          placeholder="Impact / résultats"
          className="input-style"
          value={form.impact}
          onChange={handleChange}
        />

        <input
          name="demo"
          placeholder="URL démo"
          className="input-style"
          value={form.demo}
          onChange={handleChange}
        />

        <input
          name="github"
          placeholder="URL GitHub"
          className="input-style"
          value={form.github}
          onChange={handleChange}
        />

        {/* Image — validée par le backend : required|image|max:2048 */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Image du projet *
          </label>
          <input
            type="file"
            accept="image/*"
            className="text-sm text-gray-300"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-400 text-black px-6 py-3 rounded-full font-semibold disabled:opacity-50 transition-opacity"
        >
          {loading ? "Enregistrement..." : "Ajouter le projet"}
        </button>
      </form>
    </div>
  );
}