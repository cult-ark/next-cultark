import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
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

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cultark.com',
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
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },

  // Proxy configuration for WordPress API to resolve CORS issues
  async rewrites() {
    return [
      {
        source: '/api/wp/:path*',
        destination: 'https://cultark.com/wp-json/wp/v2/:path*',
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
