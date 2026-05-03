import { Card, CardContent } from '@/components/ui/card';
import { Globe, Users, Award } from 'lucide-react';

const teachers = [
  {
    name: 'Ramesh Dangi',
    subject: 'Science Specialist',
    bio: 'B.Sc. Biology ...',
    image: '/teacher-science.jpg',
  },
  {
    name: 'Riya Negi',
    subject: 'English Specialist',
    bio: 'B.A. English ...',
    image: '/teacher-english.jpg',
  },
  {
    name: 'Anubhav Mehthas',
    subject: 'English Specialist',
    bio: 'M.A. in English Literature ...',
    image: '/teacher-math.jpg',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The White House is an online-only education platform based in Nepal,
            dedicated to transforming how students learn. We bring quality
            education directly to your home through live online classes,
            eliminating geographical barriers and making expert tutoring
            accessible to every student across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Online-First
              </h3>
              <p className="text-gray-600 text-sm">
                Fully online platform accessible from anywhere in Nepal. Learn
                from home with live interactive sessions.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Expert Teachers
              </h3>
              <p className="text-gray-600 text-sm">
                Highly qualified subject specialists with years of experience in
                their respective fields.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Results Driven
              </h3>
              <p className="text-gray-600 text-sm">
                Focused on both exam success and long-term critical thinking
                skills that last a lifetime.
              </p>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">
          Meet Our Teachers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <Card
              key={teacher.name}
              className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-lg text-gray-900 mb-1">
                  {teacher.name}
                </h4>
                <p className="text-violet-600 font-medium text-sm mb-3">
                  {teacher.subject}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {teacher.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
