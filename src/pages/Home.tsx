import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Objectives from '@/sections/Objectives';
import Courses from '@/sections/Courses';
import Registration from '@/sections/Registration';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Objectives />
      <Courses />
      <Registration />
      <Contact />
      <Footer />
    </div>
  );
}
