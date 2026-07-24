export const SITE_CONFIG = {
  name: "Anshum Dev | AI Engineer & Systems Architect",
  description: "Portfolio of Anshum Dev, an AI Engineer specializing in Enterprise Software, LLMs, RAG pipelines, and highly scalable Backend Architecture.",
  url: "https://theanshumdev.site", // Replace with actual production URL if different
  ogImage: "https://theanshumdev.site/og-image.png",
  twitterHandle: "@TheAnshumDev",
  keywords: [
    "AI Engineer",
    "Enterprise AI",
    "RAG Engineer",
    "FastAPI Developer",
    "System Design",
    "Backend Engineer",
    "LLM Engineer",
    "Anshum Dev",
    "Python AI Engineer",
    "ERPNext Developer"
  ],
};

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  scripts?: any[];
};

export function constructSEO({
  title = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  path = "",
  keywords = SITE_CONFIG.keywords,
  type = "website",
  scripts = [],
}: SEOProps = {}) {
  const url = `${SITE_CONFIG.url}${path}`;
  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | Anshum Dev`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "keywords", content: keywords.join(", ") },
      { name: "author", content: "Anshum Dev" },
      { name: "creator", content: "Anshum Dev" },
      { name: "publisher", content: "Anshum Dev" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      
      // Open Graph
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Anshum Dev" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: type },
      
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:creator", content: SITE_CONFIG.twitterHandle },
      { name: "twitter:site", content: SITE_CONFIG.twitterHandle },

      // Theme
      { name: "theme-color", content: "#09090B" },
      { name: "color-scheme", content: "dark" },
    ],
    links: [
      { rel: "canonical", href: url },
    ],
    scripts: scripts.map(schema => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Anshum Dev",
    "url": SITE_CONFIG.url,
    "image": `${SITE_CONFIG.url}/og-image.png`,
    "jobTitle": "AI Engineer & Systems Architect",
    "description": SITE_CONFIG.description,
    "sameAs": [
      "https://github.com/anshum25",
      "https://www.linkedin.com/in/anshum-dev-11115a288/",
      "https://x.com/TheAnshumDev"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "KIIT University"
    },
    "knowsAbout": ["Artificial Intelligence", "Machine Learning", "System Design", "Backend Development", "FastAPI", "Python", "RAG", "LLMs", "ERPNext"]
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Anshum Dev Portfolio",
    "url": SITE_CONFIG.url,
    "description": SITE_CONFIG.description,
    "publisher": {
      "@type": "Person",
      "name": "Anshum Dev"
    }
  };
}

export function generateProjectSchema({ 
  name, 
  description, 
  image, 
  url 
}: { 
  name: string; 
  description: string; 
  image?: string; 
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": name,
    "description": description,
    "url": `${SITE_CONFIG.url}${url}`,
    ...(image && { "image": image }),
    "author": {
      "@type": "Person",
      "name": "Anshum Dev"
    }
  };
}
