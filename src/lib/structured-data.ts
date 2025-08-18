// Utility functions for generating structured data

export interface BlogPostStructuredData {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
  tags?: string[];
}

export interface ServiceStructuredData {
  name: string;
  description: string;
  image?: string;
  url: string;
  provider: string;
  areaServed: string;
  serviceType: string;
}

export interface ProjectStructuredData {
  name: string;
  description: string;
  image?: string;
  url: string;
  dateCreated: string;
  creator: string;
  keywords?: string[];
}

export function generateBlogPostStructuredData(data: BlogPostStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.description,
    "image": data.image ? {
      "@type": "ImageObject",
      "url": data.image,
      "width": 1200,
      "height": 630
    } : undefined,
    "author": {
      "@type": "Organization",
      "name": data.author,
      "url": "https://cultark.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CULTARK",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cultark.com/images/logos/Blue-2048x396.png",
        "width": 2048,
        "height": 396
      }
    },
    "datePublished": data.publishedDate,
    "dateModified": data.modifiedDate || data.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "keywords": data.tags?.join(", "),
    "articleSection": "Marketing",
    "inLanguage": "en-US"
  };
}

export function generateServiceStructuredData(data: ServiceStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "image": data.image,
    "url": data.url,
    "provider": {
      "@type": "Organization",
      "name": data.provider,
      "url": "https://cultark.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": data.areaServed
    },
    "serviceType": data.serviceType,
    "category": "Digital Marketing",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": data.name,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": data.name,
            "description": data.description
          }
        }
      ]
    }
  };
}

export function generateProjectStructuredData(data: ProjectStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": data.name,
    "description": data.description,
    "image": data.image,
    "url": data.url,
    "dateCreated": data.dateCreated,
    "creator": {
      "@type": "Organization",
      "name": data.creator,
      "url": "https://cultark.com"
    },
    "keywords": data.keywords?.join(", "),
    "genre": "Digital Marketing Project",
    "inLanguage": "en-US"
  };
}

export function generateCaseStudyStructuredData(data: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "datePublished": data.datePublished,
    "author": {
      "@type": "Organization",
      "name": data.author,
      "url": "https://cultark.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CULTARK",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cultark.com/images/logos/Blue-2048x396.png",
        "width": 2048,
        "height": 396
      }
    },
    "genre": "Case Study",
    "inLanguage": "en-US"
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `https://cultark.com${item.url}` : undefined
    }))
  };
}