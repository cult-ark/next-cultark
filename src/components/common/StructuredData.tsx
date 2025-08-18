'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function StructuredData() {
  const pathname = usePathname();

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CULTARK",
    "alternateName": "CULTARK Agency",
    "description": "Leading performance marketing agency specializing in SEO, media production, design & production, and digital products.",
    "url": "https://cultark.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cultark.com/images/logos/Blue-2048x396.png",
      "width": 2048,
      "height": 396
    },
    "image": "https://cultark.com/images/og-home.jpg",
    "sameAs": [
      "https://twitter.com/cultark",
      "https://www.linkedin.com/company/cultark",
      "https://instagram.com/cultark"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "Riyadh Province",
      "addressLocality": "Riyadh"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "hello@cultark.com",
        "availableLanguage": ["English", "Arabic"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@cultark.com",
        "availableLanguage": ["English", "Arabic"]
      }
    ],
    "foundingDate": "2020",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "serviceArea": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services",
            "description": "Search Engine Optimization services to improve website visibility"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Media Production",
            "description": "Professional media production and content creation services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Design & Production",
            "description": "Creative design and production services for digital marketing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Products",
            "description": "Custom digital product development and strategy"
          }
        }
      ]
    }
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CULTARK",
    "url": "https://cultark.com",
    "description": "Leading performance marketing agency specializing in SEO, media production, and digital transformation.",
    "publisher": {
      "@type": "Organization",
      "name": "CULTARK"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cultark.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Professional service structured data
  const professionalServiceStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "CULTARK Performance Marketing Agency",
    "image": "https://cultark.com/images/og-home.jpg",
    "description": "Leading performance marketing agency specializing in SEO, media production, design & production, and digital products.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "Riyadh Province",
      "addressLocality": "Riyadh"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753
    },
    "url": "https://cultark.com",
    "telephone": "+966-XX-XXX-XXXX",
    "email": "hello@cultark.com",
    "priceRange": "$$",
    "openingHours": "Mo-Th 09:00-18:00",
    "serviceArea": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Marketing",
            "category": "Digital Marketing"
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <Script
        id="professional-service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceStructuredData),
        }}
      />
    </>
  );
}