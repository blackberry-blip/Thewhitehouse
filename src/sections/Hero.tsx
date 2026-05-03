import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-violet-300 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-white/90 text-sm font-medium">
            Online Education from Nepal
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          The White House
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-violet-100 font-semibold mb-4">
          Making children think sharper, score better.
        </p>

        <p className="text-base sm:text-lg text-violet-200/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          We don't just teach answers — we teach the ability to understand
          problems so students can innovate solutions.
        </p>

        <a href="#register">
          <Button
            size="lg"
            className="bg-white text-violet-700 hover:bg-violet-50 font-bold text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            Register Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </a>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-sm text-violet-200">Students</div>
          </div>
          <div className="text-center border-x border-white/20">
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-sm text-violet-200">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-sm text-violet-200">Expert Teachers</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
