import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/common/StructuredData";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CULTARK - Performance Marketing Agency",
    template: "%s | CULTARK",
  },
  description: "CULTARK is a leading performance marketing agency specializing in SEO, media production, design & production, and digital products. Transform your business with data-driven strategies and creative excellence.",
  keywords: "performance marketing, SEO, media production, design, digital products, marketing agency, Saudi Arabia, Riyadh, AI marketing, digital transformation",
  authors: [{ name: "CULTARK" }],
  creator: "CULTARK",
  publisher: "CULTARK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cultark.com"),
  openGraph: {
    title: "CULTARK - Performance Marketing Agency",
    description: "Leading performance marketing agency specializing in SEO, media production, and digital transformation. Transform your business with data-driven strategies.",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "CULTARK - Performance Marketing Agency",
      }
    ],
    url: "https://cultark.com",
    type: "website",
    siteName: "CULTARK",
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "CULTARK - Performance Marketing Agency",
    description: "Leading performance marketing agency specializing in SEO, media production, and digital transformation.",
    images: ["/images/og-home.jpg"],
    site: "@cultark",
    creator: "@cultark",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://cultark.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Marketing Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${archivo.variable} ${manrope.variable} antialiased font-archivo text-cultark-gray overflow-x-hidden`}
      >
        <QueryProvider>
          <Navbar />
          <main className='font-archivo text-cultark-gray'>
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
