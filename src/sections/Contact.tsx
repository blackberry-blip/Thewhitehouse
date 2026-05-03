import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? Reach out to us and we'll be happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600">bhurk7@gmail.com</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600">+977 9701494422</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                Location
              </h3>
              <p className="text-gray-600">Nepal (Online Nationwide)</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-violet-50 hover:bg-violet-100 rounded-xl flex items-center justify-center transition-colors"
            >
              <Facebook className="w-6 h-6 text-violet-600" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-violet-50 hover:bg-violet-100 rounded-xl flex items-center justify-center transition-colors"
            >
              <Instagram className="w-6 h-6 text-violet-600" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-violet-50 hover:bg-violet-100 rounded-xl flex items-center justify-center transition-colors"
            >
              <Youtube className="w-6 h-6 text-violet-600" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
