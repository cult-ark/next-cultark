import TestPage from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BaseLayout from '../components/layout/BaseLayout';
import ServicesPage from '../pages/Services/ServicesPage';
import PortfolioPage from '../pages/Portfolio/PortfolioPage';
import ProjectPage from '../pages/Portfolio/PortfolioProjectPage';
import Blog from '../pages/Blog/Blog';
import Careers from '../pages/Careers';
import BlogPost from '../pages/Blog/BlogPost';
import SingleServicePage from '../pages/Services/SingleServicePage';
import ReportPage from '../pages/Report/ReportPage';
import { HorizontalFeatureCard } from '../pages/testCard';
import DocsListPage from '../pages/Docs/DocsListPage';
import DocsViewerPage from '../pages/Docs/DocsViewerPage';

const CultarkRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route element={<HomePage />}>
            <Route path='/' index element={null} />
          </Route>
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/services/:slug' element={<SingleServicePage />} />
          <Route path='/portfolio' element={<PortfolioPage />} />
          <Route path='/portfolio/:slug' element={<ProjectPage />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/report' element={<ReportPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/testCard' element={<HorizontalFeatureCard />} />
          <Route path='/case-studies' element={<DocsListPage />} />
          <Route path='/case-studies/:slug' element={<DocsViewerPage />} />
        </Route>
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default CultarkRouter;
