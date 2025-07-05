import React from 'react';
import { Search, Zap, BarChart3 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Search className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SEO Lab</h1>
              <p className="text-blue-100">Professional SEO Tools & Analytics</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-blue-100">
              <Zap className="h-5 w-5" />
              <span>Free Tools</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}