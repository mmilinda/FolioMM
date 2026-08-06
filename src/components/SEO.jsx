import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Milinda Mendy | Développeuse Full Stack & DevOps",
  description = "Portfolio de Milinda Mendy, développeuse Full Stack & DevOps spécialisée en React, Laravel, Docker et architectures Cloud au Sénégal.",
  keywords = "React, Laravel, DevOps, Docker, K8s, JavaScript, Cloud, Sénégal, Full Stack",
  image = "/images/projects/preview.png",
  url = "https://milindamendy.dev",
}) {
  const fullTitle = title.includes("Milinda Mendy") ? title : `${title} | Milinda Mendy`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}