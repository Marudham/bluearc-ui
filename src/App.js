import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;