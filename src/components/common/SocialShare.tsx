'use client';

import { useState } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaCopy, FaShare } from 'react-icons/fa';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
}

export default function SocialShare({ url, title, description, className = '' }: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const fullUrl = url.startsWith('http') ? url : `https://cultark.com${url}`;
    const shareText = description || title;

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}&via=cultark`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: shareText,
                    url: fullUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            setShowShare(!showShare);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={handleNativeShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cultark-blue text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                aria-label="Share this content"
            >
                <FaShare size={16} />
                Share
            </button>

            {showShare && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[200px]">
                    <div className="flex flex-col gap-2">
                        <a
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                            <FaTwitter className="text-blue-400" size={18} />
                            Twitter
                        </a>
                        <a
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                            <FaFacebook className="text-blue-600" size={18} />
                            Facebook
                        </a>
                        <a
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                            <FaLinkedin className="text-blue-700" size={18} />
                            LinkedIn
                        </a>
                        <a
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                            <FaWhatsapp className="text-green-500" size={18} />
                            WhatsApp
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                            <FaCopy className="text-gray-500" size={18} />
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}