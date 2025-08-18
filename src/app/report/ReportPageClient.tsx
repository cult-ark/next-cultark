'use client';

import { useState, useRef, useEffect } from 'react';
import { FaDownload, FaEye, FaFile, FaShare, FaLinkedin, FaTwitter, FaFacebook, FaPrint, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingReport from '@/components/Report/LoadingReport';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import DynamicPDFViewer from '@/components/common/DynamicPDFViewer';

const PDF_NAME = 'AiReport.pdf';

const ReportPageClient = () => {
    const [localViewCount, setLocalViewCount] = useState(0);
    const [localDownloadCount, setLocalDownloadCount] = useState(0);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);



    // Handle click outside of share menu to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShowShareOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch report stats
    const {
        data: stats,
        isLoading,
        error
    } = useQuery({
        queryKey: ['reportStats', PDF_NAME],
        queryFn: async () => {
            // Track view when the page loads
            try {
                // In a real implementation, uncomment this:
                // const viewResponse = await trackPdfView(PDF_NAME);
                // return viewResponse;

                // For demo purposes, just return mock data
                setLocalViewCount(prev => prev + 1);
                return { viewCount: localViewCount + 1, downloadCount: localDownloadCount };
            } catch (err) {
                console.error('Failed to track view:', err);
                throw err;
            }
        },
        // Refetch every 30 seconds to keep counts updated
        refetchInterval: 30000,
        // Don't refetch on window focus to avoid artificially inflating view counts
        refetchOnWindowFocus: false
    });

    // Setup mutation for download tracking
    const downloadMutation = useMutation({
        mutationFn: async () => {
            // In a real implementation, uncomment this:
            // return await trackPdfDownload(PDF_NAME);

            // For demo purposes
            setLocalDownloadCount(prev => prev + 1);
            return { success: true };
        }
    });

    const handleDownload = async () => {
        try {
            // Track the download
            downloadMutation.mutate();

            // Trigger the download
            const link = document.createElement('a');
            link.href = '/docs/AiReport.pdf'; // Use local PDF path for Next.js
            link.download = PDF_NAME;
            link.click();
        } catch (error) {
            console.error('Failed to track download:', error);
        }
    };

    // Show loading state
    if (isLoading) {
        return <LoadingReport />;
    }

    // Show error state
    if (error) {
        return (
            <div className="pt-24 lg:pt-36 min-h-screen">
                <div className="max-w-[110rem] mx-auto px-4 md:px-8 lg:px-12 mb-10 flex flex-col items-center justify-center">
                    <div className="text-red-500 mb-4">
                        <FaFile size={50} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Error Loading Report</h2>
                    <p className="text-gray-600 text-center">
                        {error instanceof AxiosError
                            ? error.message
                            : 'There was an error loading the report. Please try again later.'}
                    </p>
                </div>
            </div>
        );
    }

    // Get view and download counts from either API response or local state
    const viewCount = stats?.viewCount || localViewCount;
    const downloadCount = stats?.downloadCount || localDownloadCount;

    return (
        <div className="pt-24 lg:pt-36 min-h-screen">
            <div className="max-w-[110rem] mx-auto px-4 md:px-8 lg:px-12 mb-10">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
                        <div className="bg-cultark-blue/10 p-4 rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0">
                            <FaFile size={32} className="text-cultark-blue" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">
                                AI Industry Report
                            </h1>
                            <p className="text-lg md:text-xl font-medium text-gray-600">
                                Comprehensive analysis of AI trends and impacts
                            </p>
                        </div>
                    </div>
                </div>

                {/* Report description */}
                <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="text-gray-700 mb-4">
                        This comprehensive report explores the latest trends in artificial intelligence and its impact on various industries.
                        Gain valuable insights into how AI is transforming business operations, customer experiences, and market dynamics.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <span className="bg-cultark-blue/10 text-cultark-blue px-3 py-1 rounded-full text-sm">AI Trends</span>
                        <span className="bg-cultark-blue/10 text-cultark-blue px-3 py-1 rounded-full text-sm">Industry Analysis</span>
                        <span className="bg-cultark-blue/10 text-cultark-blue px-3 py-1 rounded-full text-sm">Future Outlook</span>
                        <span className="bg-cultark-blue/10 text-cultark-blue px-3 py-1 rounded-full text-sm">Case Studies</span>
                    </div>
                </div>

                {/* Stats display */}
                <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
                    <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-blue-50 p-2 rounded-full">
                            <FaEye size={18} className="text-cultark-blue" />
                        </div>
                        <div>
                            <div className="text-xl font-semibold">{viewCount}</div>
                            <div className="text-sm text-gray-500">Views</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-green-50 p-2 rounded-full">
                            <FaDownload size={18} className="text-green-600" />
                        </div>
                        <div>
                            <div className="text-xl font-semibold">{downloadCount}</div>
                            <div className="text-sm text-gray-500">Downloads</div>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer with toolbar */}
                <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg mb-8">
                    <div className="bg-gray-100 p-3 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-700 font-medium">AI Industry Report</span>
                            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">PDF</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.print()}
                                className="text-gray-600 hover:text-cultark-blue text-sm flex items-center gap-1 transition-colors"
                            >
                                <FaPrint size={14} className="mr-1" /> Print
                            </button>
                            <a
                                href="/docs/AiReport.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cultark-blue hover:text-cultark-blue-dark text-sm flex items-center gap-1 transition-colors"
                            >
                                <FaArrowUpRightFromSquare size={14} className="mr-1" />
                                Open in new tab
                            </a>
                        </div>
                    </div>

                    {/* PDF Viewer Section */}
                    <div className="bg-gray-50">
                        <ErrorBoundary>
                            <DynamicPDFViewer
                                pdfUrl="/docs/AiReport.pdf"
                                className="h-[70vh] md:h-[75vh] lg:h-[80vh] bg-white border-t border-gray-200"
                            />
                        </ErrorBoundary>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
                    <button
                        onClick={handleDownload}
                        className="inline-flex items-center justify-center gap-3 text-white bg-cultark-blue border border-cultark-blue px-6 py-3 rounded-full font-medium hover:bg-transparent hover:text-cultark-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={downloadMutation.isPending}
                    >
                        <span>{downloadMutation.isPending ? 'Downloading...' : 'Download Report'}</span>
                        <FaDownload size={16} />
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowShareOptions(!showShareOptions)}
                            className="inline-flex items-center justify-center gap-3 text-cultark-blue border border-cultark-blue px-6 py-3 rounded-full font-medium hover:bg-cultark-blue hover:text-white transition-colors"
                        >
                            <span>Share Report</span>
                            <FaShare size={16} />
                        </button>

                        {showShareOptions && (
                            <div ref={shareMenuRef} className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-20 border border-gray-100 min-w-[200px]">
                                <p className="text-sm text-gray-500 mb-3">Share via:</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="bg-[#0077b5] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                                        title="Share on LinkedIn"
                                    >
                                        <FaLinkedin size={18} />
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this AI Industry Report`, '_blank')}
                                        className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                                        title="Share on Twitter"
                                    >
                                        <FaTwitter size={18} />
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="bg-[#4267B2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                                        title="Share on Facebook"
                                    >
                                        <FaFacebook size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="mt-16 mb-16 bg-cultark-blue/5 rounded-2xl p-8 border border-cultark-blue/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">Want to learn more about AI solutions?</h2>
                            <p className="text-gray-600 max-w-2xl">
                                Our team of experts can help you implement AI solutions tailored to your business needs.
                                Schedule a consultation to discuss how we can help you leverage AI technology.
                            </p>
                        </div>
                        <Link
                            href={'/?scrollTo=getInTouch'}
                            className="whitespace-nowrap bg-cultark-blue text-white px-8 py-4 rounded-full font-archivo hover:bg-cultark-blue/90 transition-colors"
                        >
                            Schedule a Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportPageClient;