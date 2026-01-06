import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Enable static export
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Server-side rendering configuration
  serverExternalPackages: ['pdfjs-dist'],

  // Configure webpack to handle PDF viewer properly
  webpack: (config, { isServer, dev }) => {
    // Fixes canvas module issues for PDF viewer
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        "canvas-prebuilt": false,
      };
    }

    return config;
  },

  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cultark.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backup.cultark.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', '@tanstack/react-query'],
  },

  // Note: API routes and rewrites are not supported in static export
  // All API calls will need to be made directly to external services
};

export default withBundleAnalyzer(nextConfig);
