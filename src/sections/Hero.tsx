import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Brain, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-violet-300 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-5 leading-tight">
          Stop Memorizing.<br />
          <span className="text-yellow-300">Start Understanding.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-violet-100 font-medium mb-4 max-w-3xl mx-auto leading-relaxed">
          The White House is Nepal's first tech-powered online tuition platform — built to make students <span className="text-yellow-200 font-bold">think faster, score higher,</span> and solve real problems.
        </p>

        {/* Value props — 3 pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <Zap className="w-4 h-4 text-yellow-300 shrink-0" />
            <span className="text-white text-sm font-medium">Live Interactive Classes</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <Brain className="w-4 h-4 text-yellow-300 shrink-0" />
            <span className="text-white text-sm font-medium">Tech-First Teaching</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <TrendingUp className="w-4 h-4 text-yellow-300 shrink-0" />
            <span className="text-white text-sm font-medium">Proven Results</span>
          </div>
        </div>

        {/* CTA */}
        <a href="#register">
          <Button
            size="lg"
            className="bg-yellow-400 text-violet-900 hover:bg-yellow-300 font-extrabold text-lg px-10 py-6 rounded-xl shadow-2xl hover:shadow-yellow-400/30 transition-all hover:-translate-y-1 active:scale-95"
          >
            Enroll Now — Rs. 499
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </a>
        <p className="text-violet-300 text-sm mt-3">First month all-inclusive · Cancel anytime</p>

        {/* Stats — desktop only */}
        <div className="mt-14 hidden md:grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-sm text-violet-200">Students Enrolled</div>
          </div>
          <div className="text-center border-x border-white/20">
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-sm text-violet-200">Subjects Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">Class 8 & 10</div>
            <div className="text-sm text-violet-200">Expert Teachers</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
