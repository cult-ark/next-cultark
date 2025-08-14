import { Helmet } from 'react-helmet-async';
// import GetInTouch from '../../components/Services/GetInTouch';
import ServicesList from '../../components/Services/ServicesList';

const ServicesPage = () => {
  return (
    <div className='pt-24 lg:pt-36'>
      <Helmet>
        <title>Our Services - CULTARK</title>
        <meta name="description" content="Explore CULTARK's comprehensive suite of performance marketing services including SEO, media production, design & production, and digital products. Drive growth with data-driven strategies." />
        <meta name="keywords" content="performance marketing services, SEO services, media production, design services, digital products, marketing agency services" />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Our Services - CULTARK" />
        <meta property="og:description" content="Comprehensive suite of performance marketing services including SEO, media production, and digital transformation solutions." />
        <meta property="og:image" content="https://cultark.com/images/og-services.jpg" />
        <meta property="og:url" content="https://cultark.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CULTARK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services - CULTARK" />
        <meta name="twitter:description" content="Explore our comprehensive suite of performance marketing services including SEO, media production, and digital transformation." />
        <meta name="twitter:image" content="https://cultark.com/images/og-services.jpg" />
        <meta name="twitter:site" content="@cultark" />
      </Helmet>

      <div className='relative min-h-screen'>
        {/* <GetInTouch /> */}
        <ServicesList />
      </div>
    </div>
  );
};

export default ServicesPage;
