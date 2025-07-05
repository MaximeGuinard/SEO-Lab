import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SEOTools from './components/SEOTools';
import Features from './components/Features';
import Stats from './components/Stats';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <SEOTools />
      <Features />
      <Footer />
    </div>
  );
}

export default App;