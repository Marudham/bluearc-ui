import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
// import ClientVoice from './components/ClientVoice';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import ParticlesBackground from './components/ParticlesBackground';
import useSectionRouting from './hooks/useSectionRouting';
import SECTIONS from './sectionsConfig';

// Every route renders the same continuous-scroll page; useSectionRouting
// scrolls to (and updates the URL/title for) whichever section is active.
const PageLayout = () => {
  useSectionRouting();

  return (
    <>
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      {/* <ClientVoice /> */}
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  const [showSignature, setShowSignature] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];

    const handleKeyPress = (e) => {
      const newSequence = [...keySequence, e.code];

      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }

      setKeySequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setShowSignature(true);
        setKeySequence([]);
        setTimeout(() => setShowSignature(false), 10000);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [keySequence]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <ParticlesBackground />
          <Routes>
            {SECTIONS.map((section) => (
              <Route key={section.path} path={section.path} element={<PageLayout />} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {showSignature && (
            <div className="developer-signature">
              <div className="signature-content">
                <p className="congrats-message">
                  <strong>Congratulations!</strong> You've successfully matched the secret developer signature!
                  Either you're really bored or genuinely curious about who built this masterpiece. 😄
                </p>

                <div className="developer-info">
                  <p className="reveal-text">🔍 The mastermind behind this portfolio:</p>
                  <p className="developer-name">✨ <strong>Marudham T S</strong></p>
                  <p className="developer-role">💻 Java + Angular Full Stack Developer</p>
                  <p className="developer-contact">
                    📧 <a href="mailto:marudham.ts.contact@gmail.com" className="email-link">
                      marudham.ts.contact@gmail.com
                    </a>
                  </p>
                </div>

                <button
                  onClick={() => setShowSignature(false)}
                  className="close-signature"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;