import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
