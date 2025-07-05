import React from 'react';
import { 
  Shield, 
  Clock, 
  Users, 
  Award, 
  Zap, 
  BarChart3,
  Target,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description: 'Bank-level security with SSL encryption and data protection',
    color: 'bg-green-500'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Real-Time Analysis',
    description: 'Get instant insights and live monitoring of your SEO performance',
    color: 'bg-blue-500'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Team Collaboration',
    description: 'Share reports and collaborate with your team seamlessly',
    color: 'bg-purple-500'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Expert Support',
    description: '24/7 support from SEO experts and dedicated account managers',
    color: 'bg-orange-500'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Lightning Fast',
    description: 'Optimized for speed with results in seconds, not minutes',
    color: 'bg-yellow-500'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Advanced Analytics',
    description: 'Deep insights with custom reports and data visualization',
    color: 'bg-indigo-500'
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Precision Targeting',
    description: 'Laser-focused keyword and competitor analysis',
    color: 'bg-pink-500'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Growth Tracking',
    description: 'Monitor your progress with detailed performance metrics',
    color: 'bg-teal-500'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose SEO Lab?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for professionals who demand accuracy, speed, and comprehensive insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1"
            >
              <div className={`${feature.color} text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Dominate Search Rankings?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of SEO professionals who trust SEO Lab for their optimization needs
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}