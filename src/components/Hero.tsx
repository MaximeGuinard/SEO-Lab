import React from 'react';
import { ArrowRight, Target, TrendingUp, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Master Your SEO Performance
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive SEO tools and analytics to boost your website's visibility, 
            optimize content, and dominate search engine rankings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group">
              <span>Start Free Analysis</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              View All Tools
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Keyword Research</h3>
              <p className="text-gray-600">Find high-value keywords and analyze competition</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Site Audit</h3>
              <p className="text-gray-600">Comprehensive technical SEO analysis</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rank Tracking</h3>
              <p className="text-gray-600">Monitor your search engine rankings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}