import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { pdfDocs } from '../../data/pdfs';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Styles for the viewer and default layout controls
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function DocsViewerPage() {
  const { slug } = useParams();
  const doc = useMemo(() => pdfDocs.find((d) => d.slug === slug), [slug]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!doc) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 pt-24 lg:pt-32">
        <Helmet>
          <title>Document Not Found - CULTARK Case Studies</title>
          <meta name="description" content="The requested document could not be found. Browse our collection of case studies and industry reports." />
          <meta name="keywords" content="document not found, case studies, reports, CULTARK" />
          
          {/* Open Graph for social sharing */}
          <meta property="og:title" content="Document Not Found - CULTARK Case Studies" />
          <meta property="og:description" content="The requested document could not be found. Browse our collection of case studies and industry reports." />
          <meta property="og:image" content="https://cultark.com/images/og-case-studies.jpg" />
          <meta property="og:url" content="https://cultark.com/case-studies" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="CULTARK" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Document Not Found - CULTARK Case Studies" />
          <meta name="twitter:description" content="The requested document could not be found. Browse our collection of case studies and industry reports." />
          <meta name="twitter:image" content="https://cultark.com/images/og-case-studies.jpg" />
          <meta name="twitter:site" content="@cultark" />
        </Helmet>
        
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="mb-4 text-xl md:text-2xl font-bold text-red-600">Document Not Found</h1>
          <p className="mb-4 text-red-600">Document not found: {slug}</p>
          <p className="mb-6 text-gray-600">Available documents: {pdfDocs.map(d => d.slug).join(', ')}</p>
          <div className="flex justify-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Documents
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 lg:pt-28">
      <Helmet>
        <title>{`${doc.name} - Case Study & Report | CULTARK`}</title>
        <meta name="description" content={`${doc.description} - Download and view this comprehensive case study and analysis from CULTARK's collection of industry reports.`} />
        <meta name="keywords" content={`${doc.name}, case study, ${doc.slug}, industry report, analysis, CULTARK`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={`${doc.name} - Case Study & Report`} />
        <meta property="og:description" content={`${doc.description} - Comprehensive case study and analysis from CULTARK's industry reports collection.`} />
        <meta property="og:image" content={`https://cultark.com/images/docs/${doc.slug}.jpg`} />
        <meta property="og:url" content={`https://cultark.com/case-studies/${doc.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CULTARK" />
        <meta property="article:published_time" content="2025-01-01T00:00:00Z" />
        <meta property="article:author" content="CULTARK Research Team" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${doc.name} - Case Study & Report`} />
        <meta name="twitter:description" content={`${doc.description} - Comprehensive case study and analysis from CULTARK's industry reports collection.`} />
        <meta name="twitter:image" content={`https://cultark.com/images/docs/${doc.slug}.jpg`} />
        <meta name="twitter:site" content="@cultark" />
        <meta name="twitter:creator" content="@cultark" />
      </Helmet>
      {/* Header Section */}
      <div className="sticky top-20 lg:top-28 z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                to="/case-studies"
                className="flex-shrink-0 inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-200 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Documents
              </Link>
              <h1 className="hidden sm:block text-lg lg:text-xl font-semibold truncate text-gray-900">{doc.name}</h1>
            </div>
            <div className="sm:hidden text-sm font-medium text-gray-900 truncate">{doc.name}</div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Section */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        <ErrorBoundary>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className="h-[calc(100vh-220px)] lg:h-[calc(100vh-200px)] bg-white border border-gray-200 shadow-sm">
              <Viewer
                fileUrl={doc.fileUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        </ErrorBoundary>
      </div>
    </div>
  );
}
