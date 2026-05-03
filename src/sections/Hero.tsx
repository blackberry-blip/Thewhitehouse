import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const handleRegisterClick = () => {
    // Scroll programmatically — avoids writing #register into the URL
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-20">

        {/* Brand label — expands in from tight letter-spacing */}
        <p className="animate-hero-brand text-violet-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-8 opacity-80">
          The White House
        </p>

        {/* Main headline — slides up */}
        <h1 className="animate-hero-title text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
          Your child deserves<br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #818cf8)' }}
          >
            better than memorization.
          </span>
        </h1>

        {/* Subline — fades in */}
        <p className="animate-hero-sub text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed font-light">
          We teach students to think — using technology, live instruction,
          and a method built for the generation that will shape tomorrow.
        </p>

        {/* CTA — pops in last */}
        <div className="animate-hero-cta">
          <Button
            size="lg"
            onClick={handleRegisterClick}
            className="group bg-white text-gray-900 hover:bg-white/90 font-bold text-base px-8 py-6 rounded-full shadow-2xl transition-all duration-300 hover:shadow-violet-500/20 hover:scale-105"
          >
            Enroll Now
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
