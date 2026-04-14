import './App.css';
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

import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

