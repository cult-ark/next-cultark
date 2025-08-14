import { Fragment } from 'react/jsx-runtime';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import BookCall from '../components/Home/BookCall/BookCall';
import ContentOfMonth from '../components/Home/ContentOfMonth';
import Testimonials from '../components/Home/Testimonials';
import TrustedBy from '../components/Home/TrustedBy';
import Clients from '../components/Home/Clients';

const HomePage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>CULTARK</title>
        <meta name="description" content="CULTARK is a leading performance marketing agency specializing in SEO, media production, design & production, and digital products. Transform your business with data-driven strategies and creative excellence." />
        <meta name="keywords" content="performance marketing, SEO, media production, design, digital products, marketing agency, Saudi Arabia, Riyadh" />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content="CULTARK" />
        <meta property="og:description" content="Leading performance marketing agency specializing in SEO, media production, and digital transformation. Transform your business with data-driven strategies." />
        <meta property="og:image" content="https://cultark.com/images/og-home.jpg" />
        <meta property="og:url" content="https://cultark.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CULTARK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CULTARK" />
        <meta name="twitter:description" content="Leading performance marketing agency specializing in SEO, media production, and digital transformation." />
        <meta name="twitter:image" content="https://cultark.com/images/og-home.jpg" />
        <meta name="twitter:site" content="@cultark" />
      </Helmet>
      
      <Hero />
      <Services />
      <BookCall />
      <ContentOfMonth />
      <TrustedBy />
      <Clients/>
      <Testimonials />
    </Fragment>
  );
};

export default HomePage;
