'use client';

import { Suspense, lazy } from 'react';
import LoadingReport from '@/components/Report/LoadingReport';

// Dynamically import PDF viewer components
const PDFViewer = lazy(() => import('./PDFViewer'));

interface DynamicPDFViewerProps {
    pdfUrl: string;
    className?: string;
}

const DynamicPDFViewer = ({ pdfUrl, className }: DynamicPDFViewerProps) => {
    return (
        <Suspense fallback={<LoadingReport />}>
            <PDFViewer pdfUrl={pdfUrl} className={className} />
        </Suspense>
    );
};

export default DynamicPDFViewer;