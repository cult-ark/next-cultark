import { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Services from '@/components/Home/Services'
import BookCall from '@/components/Home/BookCall/BookCall'
import ContentOfMonth from '@/components/Home/ContentOfMonth'
import Testimonials from '@/components/Home/Testimonials'
import TrustedBy from '@/components/Home/TrustedBy'
import Clients from '@/components/Home/Clients'

export const metadata: Metadata = {
  title: 'CULTARK',
  description: 'CULTARK is a leading performance marketing agency specializing in SEO, media production, design & production, and digital products. Transform your business with data-driven strategies and creative excellence.',
  keywords: 'performance marketing, SEO, media production, design, digital products, marketing agency, Saudi Arabia, Riyadh',
  openGraph: {
    title: 'CULTARK',
    description: 'Leading performance marketing agency specializing in SEO, media production, and digital transformation. Transform your business with data-driven strategies.',
    images: [
      {
        url: 'https://cultark.com/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'CULTARK - Performance Marketing Agency',
      },
    ],
    url: 'https://cultark.com',
    type: 'website',
    siteName: 'CULTARK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CULTARK',
    description: 'Leading performance marketing agency specializing in SEO, media production, and digital transformation.',
    images: ['https://cultark.com/images/og-home.jpg'],
    site: '@cultark',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <BookCall />
      <ContentOfMonth />
      <TrustedBy />
      <Clients />
      <Testimonials />
    </>
  )
}
