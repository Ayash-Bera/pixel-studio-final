// SEO Helper Functions
import { siteConfig } from "../config/seoConfig";

// Generate full URL from path
export const getFullUrl = (path) => {
  return `${siteConfig.siteUrl}${path}`;
};

// Generate full title with site name
export const generateTitle = (pageTitle) => {
  if (!pageTitle || pageTitle === siteConfig.siteName) {
    return siteConfig.siteName;
  }
  return `${pageTitle} | ${siteConfig.siteName}`;
};

// Generate meta tags object for a page
export const generatePageMeta = (config) => {
  const {
    title,
    description,
    keywords,
    url,
    image = siteConfig.defaultImage,
    type = "website",
  } = config;

  const fullUrl = getFullUrl(url);
  const fullTitle = generateTitle(title);

  return {
    title: fullTitle,
    description,
    keywords,
    canonical: fullUrl,
    openGraph: {
      type,
      url: fullUrl,
      title: fullTitle,
      description,
      image,
      siteName: siteConfig.siteName,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      url: fullUrl,
      title: fullTitle,
      description,
      image,
      site: siteConfig.twitterHandle,
    },
  };
};

// Convert schema object to JSON-LD script
export const generateSchemaScript = (schema) => {
  return {
    type: "application/ld+json",
    innerHTML: JSON.stringify(schema),
  };
};

// Generate multiple schema scripts
export const generateMultipleSchemas = (schemas) => {
  return schemas.map((schema) => generateSchemaScript(schema));
};

// Get image alt text based on context
export const generateImageAlt = (context) => {
  const { type, title, photographer, subject } = context;

  if (type === "gallery" && photographer && subject) {
    return `${subject} photograph by ${photographer} - Pixel Studios`;
  }

  if (type === "service" && title) {
    return `${title} - Professional photography service by Pixel Studios`;
  }

  if (type === "workshop" && title) {
    return `${title} - Photography workshop at Pixel Studios`;
  }

  return title || "Pixel Studios photography";
};

// Extract dominant keywords from text
export const extractKeywords = (text, count = 10) => {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));

  const frequency = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word)
    .join(", ");
};
