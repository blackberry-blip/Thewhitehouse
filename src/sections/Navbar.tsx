import { useState, useEffect } from 'react';
import { Link } from 'react-router'
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Objectives', href: '#objectives' },
    { label: 'Courses', href: '#courses' },
    { label: 'Register', href: '#register' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <GraduationCap
              className={`w-8 h-8 ${scrolled ? 'text-violet-700' : 'text-white'}`}
            />
            <span
              className={`font-bold text-xl ${
                scrolled ? 'text-violet-700' : 'text-white'
              }`}
            >
              The White House
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:opacity-80 transition-opacity ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className={`${
                  scrolled
                    ? 'border-violet-700 text-violet-700 hover:bg-violet-50'
                    : 'border-white text-white hover:bg-white/10'
                }`}
              >
                Admin
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={scrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu className={scrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-violet-700 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/admin"
              className="block text-violet-700 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}