import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import Service from './pages/Service';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/aboutus" element={<About/>} />
            <Route path="/services" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
