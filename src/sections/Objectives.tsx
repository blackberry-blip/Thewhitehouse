import { Card, CardContent } from '@/components/ui/card';
import { Brain, TrendingUp, Lightbulb } from 'lucide-react';

const objectives = [
  {
    icon: Brain,
    title: 'Sharpen Critical Thinking',
    description:
      'We train students to analyze problems from multiple angles, question assumptions, and develop independent reasoning skills that go beyond rote memorization.',
  },
  {
    icon: TrendingUp,
    title: 'Improve Exam Scores',
    description:
      'Our structured curriculum and practice-oriented approach help students master exam techniques, time management, and subject fundamentals to achieve top results.',
  },
  {
    icon: Lightbulb,
    title: 'Build Problem-Solving Ability',
    description:
      'By teaching students how to understand problems deeply, we equip them with the creative thinking skills needed to innovate real-world solutions.',
  },
];

export default function Objectives() {
  return (
    <section id="objectives" className="py-20 bg-violet-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Objectives
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything we do is designed around three core goals that transform
            students into confident, capable thinkers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {objectives.map((obj, index) => (
            <Card
              key={obj.title}
              className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <obj.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-violet-600 mb-2 uppercase tracking-wider">
                  Objective {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {obj.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {obj.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
