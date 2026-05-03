import { useEffect } from 'react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Objectives from '@/sections/Objectives';
import Courses from '@/sections/Courses';
import Registration from '@/sections/Registration';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function Home() {
  // Force scroll to top on mount — always land on hero
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Hidden on mobile — revealed when tapped in menu */}
      <div className="hidden md:block mobile-hidden-section" id="about-wrapper">
        <About />
      </div>
      <div className="hidden md:block mobile-hidden-section" id="objectives-wrapper">
        <Objectives />
      </div>
      <div className="hidden md:block mobile-hidden-section" id="courses-wrapper">
        <Courses />
      </div>

      {/* Registration is always visible — main mobile goal */}
      <Registration />

      <div className="hidden md:block mobile-hidden-section" id="contact-wrapper">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
