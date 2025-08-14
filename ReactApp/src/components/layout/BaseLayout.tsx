import { Fragment } from 'react/jsx-runtime';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import { useLayoutEffect, useMemo } from 'react';

const BaseLayout = () => {
  const location = useLocation();
  const dontScrollToTop = useMemo(() => ['/available-slots'], []);
  useLayoutEffect(() => {
    if (
      dontScrollToTop.includes(location.pathname) ||
      new URLSearchParams(location.search).get('date')
    )
      return;
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [dontScrollToTop, location.pathname, location.search]);
  return (
    <Fragment>
      <Navbar />
      <main className='font-archivo text-cultark-gray'>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default BaseLayout;
