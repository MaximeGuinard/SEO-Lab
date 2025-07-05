import React from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Search className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SEO Lab</h3>
                <p className="text-gray-400 text-sm">Professional SEO Tools</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              The most comprehensive SEO platform for professionals and agencies.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Keyword Research</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Site Audit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rank Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Backlink Analysis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Content Optimization</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span>hello@seolab.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SEO Lab. All rights reserved. Built with precision for SEO professionals.</p>
        </div>
      </div>
    </footer>
  );
}