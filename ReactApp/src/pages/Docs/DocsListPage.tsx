import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { pdfDocs } from '../../data/pdfs';

export default function DocsListPage() {
  return (
    <div className="container mx-auto px-4 pt-24 lg:pt-32 pb-8">
      <Helmet>
        <title>Case Studies & Reports - CULTARK</title>
        <meta name="description" content="Explore CULTARK's comprehensive collection of case studies and industry reports. Download detailed analyses of successful campaigns, AI implementations, and digital transformation strategies." />
        <meta name="keywords" content="case studies, marketing reports, AI case studies, digital marketing reports, campaign analysis, business transformation" />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Case Studies & Reports - CULTARK" />
        <meta property="og:description" content="Explore our comprehensive collection of case studies and industry reports including AI implementations, campaign analyses, and digital transformation strategies." />
        <meta property="og:image" content="https://cultark.com/images/og-case-studies.jpg" />
        <meta property="og:url" content="https://cultark.com/case-studies" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CULTARK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Case Studies & Reports - CULTARK" />
        <meta name="twitter:description" content="Explore our comprehensive collection of case studies and industry reports. Download detailed analyses and digital transformation strategies." />
        <meta name="twitter:image" content="https://cultark.com/images/og-case-studies.jpg" />
        <meta name="twitter:site" content="@cultark" />
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Documents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {pdfDocs.map((doc) => {
          const thumb = `/images/docs/${doc.slug}.jpg`;
          return (
            <div key={doc.slug} className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={thumb}
                  alt={`${doc.name} thumbnail`}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/docs/placeholder.svg';
                  }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-medium mb-2 line-clamp-2">{doc.name}</h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{doc.description}</p>
                <div className="mt-auto">
                  <Link
                    to={`/case-studies/${doc.slug}`}
                    className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-200 w-full"
                  >
                    Open PDF
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
