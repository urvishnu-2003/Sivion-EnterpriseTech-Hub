import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';


// Pillar 1: Home & Capability
import Hero from './pages/Hero';
import Aboutus from './pages/Aboutus';
import Service from './pages/Service';
import AIService from './pages/AIService';
import CloudService from './pages/CloudService';
import SoftwareService from './pages/SoftwareService';
import StrategyService from './pages/StrategyService';
import ServiceDetail from './pages/ServiceDetail';

// Pillar 2: Trust & Showcase
import Projects from './pages/Projects';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Technologies from './pages/Technologies';

// Pillar 3: Community & Contact
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

import RequestQuote from './pages/RequestQuote';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Admin from './pages/admin/Admin';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/ui/FloatingActions';
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Capability */}
        <Route path="/" element={<Hero />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/services" element={<Service />} />
        <Route path="/services/ai" element={<AIService />} />
        <Route path="/services/cloud" element={<CloudService />} />
        <Route path="/services/software" element={<SoftwareService />} />
        <Route path="/services/strategy" element={<StrategyService />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        {/* Trust */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<CaseStudyDetail />} />
        <Route path="/technologies" element={<Technologies />} />
        {/* Community */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Conversions & Legal */}
        <Route path="/quote" element={<RequestQuote />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
    {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function useCursor() {
  useEffect(() => {

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const addHover = () => ring.classList.add('hovering');
    const rmHover = () => ring.classList.remove('hovering');
    const interactables = 'a, button, [role="button"], input, select, textarea, .premium-btn, .outline-btn, .cyan-btn, .tilt-card-inner, .nav-link';

    const attach = () => {
      document.querySelectorAll(interactables).forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', rmHover);
      });
    };

    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);
}

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Custom cursor elements */}
      <div id="cursor-dot" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />

      <div className={isAdminRoute ? 'admin-app-wrapper' : 'app-container'}>
        {!isAdminRoute && <Navbar />}

        <main className={isAdminRoute ? 'admin-app-main' : 'app-main'}>
          <AnimatedRoutes />
        </main>

        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <FloatingActions />}
      </div>
    </>
  );
}

function App() {
  useCursor();

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;