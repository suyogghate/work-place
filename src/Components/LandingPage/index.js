import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HeaderSection from './HeaderSection';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Jobnews from './Jobnews';

function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeaderSection />
      <Section2 />
      <Section3 />
      <Section4 />
      <Jobnews />
      <Footer />
    </div>
  )
}

export default LandingPage;