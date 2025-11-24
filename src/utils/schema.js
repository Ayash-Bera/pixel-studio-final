// JSON-LD Structured Data Generators
import { siteConfig } from "../config/seoConfig";

// Organization Schema
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pixel Studios",
    alternateName: "Pixel Photography Studio & Academy",
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo.png`,
    description:
      "Professional photography studio and academy offering photography services and comprehensive photography education",
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.twitter,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
};

// LocalBusiness Schema
export const generateLocalBusinessSchema = (address) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteConfig.siteUrl,
    name: "Pixel Studios",
    image: `${siteConfig.siteUrl}/logo.png`,
    url: siteConfig.siteUrl,
    telephone: address?.phone || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: address?.street || "",
      addressLocality: address?.city || "",
      addressRegion: address?.region || "",
      postalCode: address?.postal || "",
      addressCountry: address?.country || "",
    },
    geo: address?.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: address.coordinates.lat,
          longitude: address.coordinates.lng,
        }
      : undefined,
    openingHoursSpecification: address?.hours || [],
    priceRange: "$$",
  };
};

// Service Schema
export const generateServiceSchema = (service) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.type,
    provider: {
      "@type": "Organization",
      name: "Pixel Studios",
      url: siteConfig.siteUrl,
    },
    areaServed: {
      "@type": "Place",
      name: service.areaServed || "Worldwide",
    },
    description: service.description,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceRange: service.priceRange || "$$",
    },
  };
};

// Event Schema
export const generateEventSchema = (event) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: event.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: event.isOnline
      ? {
          "@type": "VirtualLocation",
          url: event.url,
        }
      : {
          "@type": "Place",
          name: event.location?.name,
          address: event.location?.address,
        },
    image: event.image ? [event.image] : [],
    organizer: {
      "@type": "Organization",
      name: "Pixel Studios",
      url: siteConfig.siteUrl,
    },
    offers: event.price
      ? {
          "@type": "Offer",
          url: event.url,
          price: event.price,
          priceCurrency: event.currency || "USD",
          availability: "https://schema.org/InStock",
          validFrom: event.registrationStart,
        }
      : undefined,
  };
};

// ImageObject Schema
export const generateImageSchema = (image) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: image.url,
    name: image.title,
    description: image.description,
    creator: {
      "@type": "Person",
      name: image.photographer,
    },
    copyrightNotice: `© ${new Date().getFullYear()} Pixel Studios`,
    creditText: image.photographer,
    uploadDate: image.uploadDate,
  };
};

// FAQ Schema
export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// Breadcrumb Schema
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.siteUrl}${crumb.path}`,
    })),
  };
};

// Course Schema
export const generateCourseSchema = (course) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Pixel Studios",
      url: siteConfig.siteUrl,
    },
    educationalLevel: course.level || "Beginner",
    teaches: course.topics,
    offers: course.price
      ? {
          "@type": "Offer",
          price: course.price,
          priceCurrency: course.currency || "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    hasCourseInstance: course.schedule
      ? {
          "@type": "CourseInstance",
          courseMode: course.isOnline ? "online" : "in-person",
          startDate: course.schedule.startDate,
          endDate: course.schedule.endDate,
          instructor: {
            "@type": "Person",
            name: course.instructor,
          },
        }
      : undefined,
  };
};
