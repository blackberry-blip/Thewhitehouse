import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calculator, FlaskConical, Globe, ChartLine, Wallet, BookText } from 'lucide-react';

const class8Subjects = [
  { name: 'English', icon: BookText },
  { name: 'Mathematics', icon: Calculator },
  { name: 'Science', icon: FlaskConical },
  { name: 'Social Studies', icon: Globe },
];

const class10Subjects = [
  { name: 'English', icon: BookText },
  { name: 'Mathematics', icon: Calculator },
  { name: 'Science', icon: FlaskConical },
  { name: 'Social Studies', icon: Globe },
  { name: 'Optional Mathematics', icon: ChartLine },
  { name: 'Accountancy', icon: Wallet },
  { name: 'Economics', icon: BookOpen },
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Affordable, high-quality online classes for Class 8 and Class 10
            students. Each subject is taught by expert instructors.
          </p>
        </div>

        <div className="mb-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center text-violet-700 font-bold text-sm">
              8
            </span>
            Class 8 Subjects
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {class8Subjects.map((subject) => (
              <Card
                key={subject.name}
                className="border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all group"
              >
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <subject.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {subject.name}
                    </div>
                    <div className="text-violet-600 font-bold text-sm">
                      Rs. 199
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center text-violet-700 font-bold text-sm">
              10
            </span>
            Class 10 Subjects
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {class10Subjects.map((subject) => (
              <Card
                key={subject.name}
                className="border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all group"
              >
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <subject.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {subject.name}
                    </div>
                    <div className="text-violet-600 font-bold text-sm">
                      Rs. 199
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
