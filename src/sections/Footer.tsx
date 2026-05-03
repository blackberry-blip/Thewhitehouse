import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-violet-400" />
            <span className="font-bold text-xl">The White House</span>
          </div>
          <p className="text-gray-400 text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} The White House. All rights
            reserved. Based in Nepal.
          </p>
        </div>
      </div>
    </footer>
  );
}
