import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import ClientVoice from './components/ClientVoice'; 

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Hero />
        <Services />
        <WhyUs />
        <ClientVoice />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;