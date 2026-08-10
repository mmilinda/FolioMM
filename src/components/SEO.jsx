import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Milinda Mendy | Développeuse Full Stack & Solutions Numériques",
  description = "Portfolio de Milinda Mendy, développeuse d'applications & solutions numériques chez SamCorporate. Expertise en React, Laravel, JavaScript, PHP et architectures Web.",
  keywords = "Milinda Mendy, React, Laravel, JavaScript, PHP, Full Stack, SamCorporate, Sénégal, Portfolio, Web Developer",
  image = "/preview.png",
  path = "",
  type = "website",
  locale = "fr_FR",
  twitterHandle = "@mmilinda",
  schemaData = null,
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://folio-mm.vercel.app";
  
  // Format canonical URL cleanly
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${siteUrl}${cleanPath}`.replace(/\/+$/, "") || siteUrl;

  // Absolute Social Image
  const absoluteImage = image.startsWith("http")
    ? image
    : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;

  const fullTitle = title.includes("Milinda Mendy") ? title : `${title} | Milinda Mendy`;

  // Default Person Schema (JSON-LD)
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Milinda Mendy",
    "jobTitle": "Développeuse d'applications & solutions numériques",
    "worksFor": {
      "@type": "Organization",
      "name": "SamCorporate"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "UCAO (Université Catholique de l'Afrique de l'Ouest)"
    },
    "url": siteUrl,
    "image": absoluteImage,
    "sameAs": [
      "https://github.com/mmilinda",
      "https://www.linkedin.com/in/milinda-mendy-5ba17928a/"
    ],
    "knowsAbout": [
      "React",
      "Laravel",
      "JavaScript",
      "PHP",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
      "Cloud & Web Applications"
    ]
  };

  const activeSchema = schemaData || defaultSchema;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Milinda Mendy" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content="Milinda Mendy | Portfolio" />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(activeSchema)}
      </script>
    </Helmet>
  );
}