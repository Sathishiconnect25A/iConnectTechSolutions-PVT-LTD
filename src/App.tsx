import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Internships from './components/Internships';
import About from './components/About';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Industries from './components/Industries';
import InternshipPopup from './components/InternshipPopup';

function App() {
  const [isInternshipOpen, setIsInternshipOpen] = useState(false);
  const [userData, setUserData] = useState<Record<string, string>>({});

  const openInternship = () => setIsInternshipOpen(true);
  const closeInternship = () => setIsInternshipOpen(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <div className="app-bg-mesh"></div>
      <Header onOpenInternship={openInternship} />
      <main>
        <Hero />
        <div data-reveal><Industries /></div>
        <div data-reveal><Services /></div>
        <div data-reveal><Internships /></div>
        <div data-reveal><About /></div>
        <div data-reveal><Gallery /></div>
      </main>
      <Footer />
      <AIAssistant onCapture={(data) => setUserData(prev => ({ ...prev, ...data }))} />
      <InternshipPopup
        isOpen={isInternshipOpen}
        onOpen={openInternship}
        onClose={closeInternship}
        preFillData={userData}
      />
    </div>
  );
}

export default App;
