import DownloadCvButton from "../components/DownloadCvButton";

export default function CV() {
  return (
    <section className="container-custom py-20">
      <h1 className="text-5xl font-bold">Curriculum Vitae</h1>

      <div className="glass rounded-3xl p-10 mt-10">
        <h2 className="text-2xl font-bold text-slate-100">Milinda Mendy</h2>
        <p className="text-cyan-400 mt-2 font-medium">Développeuse d'applications & solutions numériques / DevOps</p>

        <div className="mt-8">
          <DownloadCvButton className="hero-btn-primary" />
        </div>
      </div>
    </section>
  );
}