/**
 * Asset path utility functions for Next.js migration
 * Handles mapping of asset paths from ReactApp to Next.js public directory structure
 */

/**
 * Maps ReactApp asset paths to Next.js public directory paths
 * @param assetPath - The original asset path from ReactApp
 * @returns The mapped path for Next.js public directory
 */
export function getAssetPath(assetPath: string): string {
    // Remove leading slash if present
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;

    // Handle different asset path patterns
    if (cleanPath.startsWith('images/')) {
        // Already in correct format for Next.js public directory
        return `/${cleanPath}`;
    }

    if (cleanPath.startsWith('docs/')) {
        // Already in correct format for Next.js public directory
        return `/${cleanPath}`;
    }

    // Handle assets imported from src/assets directory
    if (cleanPath.includes('assets/site-assets/')) {
        // Map to public/images directory
        const filename = cleanPath.split('/').pop();
        return `/images/${filename}`;
    }

    // Handle relative paths that should be in public directory
    if (!cleanPath.startsWith('http') && !cleanPath.startsWith('//')) {
        // Assume it should be in public directory with leading slash
        return `/${cleanPath}`;
    }

    // Return as-is for external URLs
    return assetPath;
}

/**
 * Gets the path for PDF documents in the public/docs directory
 * @param filename - The PDF filename
 * @returns The full path to the PDF in public/docs
 */
export function getPdfPath(filename: string): string {
    return `/docs/${filename}`;
}

/**
 * Gets the path for images in the public/images directory
 * @param filename - The image filename
 * @returns The full path to the image in public/images
 */
export function getImagePath(filename: string): string {
    return `/images/${filename}`;
}

/**
 * Gets the path for logo images in the public/images/logos directory
 * @param filename - The logo filename
 * @returns The full path to the logo in public/images/logos
 */
export function getLogoPath(filename: string): string {
    return `/images/logos/${filename}`;
}

/**
 * Asset path mappings for common ReactApp assets
 */
export const ASSET_MAPPINGS = {
    // Logo mappings
    'images/cultark-logo.png': '/images/cultark-logo.png',
    '/images/cultark-logo.png': '/images/cultark-logo.png',
    'images/logos/white-2048x396.png': '/images/logos/white-2048x396.png',
    '/images/logos/white-2048x396.png': '/images/logos/white-2048x396.png',

    // Video mappings
    'images/OriginalVideo.mp4': '/images/OriginalVideo.mp4',
    '/images/OriginalVideo.mp4': '/images/OriginalVideo.mp4',

    // Document mappings
    'docs/AiReport.pdf': '/docs/AiReport.pdf',
    '/docs/AiReport.pdf': '/docs/AiReport.pdf',
    'docs/auc_case_study.pdf': '/docs/auc_case_study.pdf',
    '/docs/auc_case_study.pdf': '/docs/auc_case_study.pdf',
    'docs/cfa_case_study.pdf': '/docs/cfa_case_study.pdf',
    '/docs/cfa_case_study.pdf': '/docs/cfa_case_study.pdf',
    'docs/zid_case_study.pdf': '/docs/zid_case_study.pdf',
    '/docs/zid_case_study.pdf': '/docs/zid_case_study.pdf',

    // Portfolio images
    '/portfolio/paytab_logo.png': '/images/paytab_logo.png',

    // Profile and trusted by images (from assets)
    './../../assets/site-assets/profile-pic.png': '/images/profile-pic.png',
    './../../assets/site-assets/trustedBy/PremierPartner-RGB.png': '/images/PremierPartner-RGB.png',
    './../../assets/site-assets/trustedBy/Meta-Badge.jpg': '/images/Meta-Badge.jpg',
    './../../assets/site-assets/trustedBy/tiktok.jpg': '/images/tiktok.jpg',
} as const;

/**
 * Maps a ReactApp asset path to the corresponding Next.js public directory path
 * Uses the ASSET_MAPPINGS lookup table for known paths
 * @param originalPath - The original asset path from ReactApp
 * @returns The mapped path for Next.js
 */
export function mapAssetPath(originalPath: string): string {
    // Check if we have a direct mapping
    if (originalPath in ASSET_MAPPINGS) {
        return ASSET_MAPPINGS[originalPath as keyof typeof ASSET_MAPPINGS];
    }

    // Fall back to the general mapping function
    return getAssetPath(originalPath);
}