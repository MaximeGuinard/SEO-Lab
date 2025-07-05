import React from 'react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: '50K+',
    label: 'Active Users',
    color: 'text-blue-600'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    value: '1M+',
    label: 'Sites Analyzed',
    color: 'text-green-600'
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    value: '500M+',
    label: 'Keywords Tracked',
    color: 'text-purple-600'
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: '99.9%',
    label: 'Uptime',
    color: 'text-orange-600'
  }
];

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`${stat.color} mx-auto mb-4 w-fit`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}