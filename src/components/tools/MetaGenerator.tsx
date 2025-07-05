import React, { useState } from 'react';
import { FileText, Copy, CheckCircle } from 'lucide-react';
import { SEOAnalyzer } from '../../utils/seoAnalyzer';

export default function MetaGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    url: ''
  });
  const [generatedMeta, setGeneratedMeta] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!formData.title || !formData.description) return;
    
    const meta = SEOAnalyzer.generateMetaTags(
      formData.title,
      formData.description,
      formData.keywords
    );
    setGeneratedMeta(meta);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const generateHTML = () => {
    if (!generatedMeta) return '';
    
    return `<title>${generatedMeta.title}</title>
<meta name="description" content="${generatedMeta.description}">
<meta name="keywords" content="${generatedMeta.keywords}">
<meta property="og:title" content="${generatedMeta.ogTitle}">
<meta property="og:description" content="${generatedMeta.ogDescription}">
<meta property="og:url" content="${formData.url}">
<meta name="twitter:title" content="${generatedMeta.twitterTitle}">
<meta name="twitter:description" content="${generatedMeta.twitterDescription}">`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Générateur de Meta Tags</h2>
            <p className="text-gray-600">Créez des meta tags optimisés pour le SEO</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la page *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Titre principal de votre page"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={60}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.title.length}/60 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description de votre page pour les moteurs de recherche"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                maxLength={160}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length}/160 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mots-clés
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                placeholder="mot-clé1, mot-clé2, mot-clé3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Séparez les mots-clés par des virgules
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la page
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://votre-site.com/page"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!formData.title || !formData.description}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Générer les Meta Tags
            </button>
          </div>

          {/* Résultats */}
          <div className="space-y-6">
            {generatedMeta && (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Aperçu SERP</h3>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                      {generatedMeta.title}
                    </div>
                    <div className="text-green-700 text-sm mt-1">
                      {formData.url || 'https://votre-site.com'}
                    </div>
                    <div className="text-gray-600 text-sm mt-2">
                      {generatedMeta.description}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Meta Tags Générés</h3>
                  
                  {/* Titre */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Title Tag</label>
                      <button
                        onClick={() => copyToClipboard(`<title>${generatedMeta.title}</title>`, 'title')}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        {copiedField === 'title' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="text-sm">Copier</span>
                      </button>
                    </div>
                    <code className="block bg-white p-3 rounded border text-sm">
                      &lt;title&gt;{generatedMeta.title}&lt;/title&gt;
                    </code>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Meta Description</label>
                      <button
                        onClick={() => copyToClipboard(`<meta name="description" content="${generatedMeta.description}">`, 'description')}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        {copiedField === 'description' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="text-sm">Copier</span>
                      </button>
                    </div>
                    <code className="block bg-white p-3 rounded border text-sm">
                      &lt;meta name="description" content="{generatedMeta.description}"&gt;
                    </code>
                  </div>

                  {/* Code complet */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Code HTML Complet</label>
                      <button
                        onClick={() => copyToClipboard(generateHTML(), 'html')}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        {copiedField === 'html' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="text-sm">Copier tout</span>
                      </button>
                    </div>
                    <pre className="bg-white p-3 rounded border text-sm overflow-x-auto">
                      <code>{generateHTML()}</code>
                    </pre>
                  </div>
                </div>
              </>
            )}

            {!generatedMeta && (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Remplissez le formulaire pour générer vos meta tags
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}