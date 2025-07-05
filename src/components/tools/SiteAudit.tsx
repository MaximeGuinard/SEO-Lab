import React, { useState } from 'react';
import { Globe, AlertTriangle, CheckCircle, Clock, Download, BarChart3 } from 'lucide-react';
import { SEOAnalyzer, SiteAuditResult } from '../../utils/seoAnalyzer';

export default function SiteAudit() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<SiteAuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAudit = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    try {
      const auditResult = await SEOAnalyzer.auditSite(url);
      setResult(auditResult);
      setAnalyzed(true);
    } catch (error) {
      console.error('Erreur audit:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const exportReport = () => {
    if (!result) return;
    
    const report = `
RAPPORT D'AUDIT SEO
==================
URL: ${url}
Score: ${result.score}/100
Date: ${new Date().toLocaleDateString()}

PROBLÈMES CRITIQUES:
${result.issues.critical.map(issue => `- ${issue}`).join('\n')}

AVERTISSEMENTS:
${result.issues.warnings.map(issue => `- ${issue}`).join('\n')}

NOTICES:
${result.issues.notices.map(issue => `- ${issue}`).join('\n')}

PERFORMANCE:
- Temps de chargement: ${result.performance.loadTime.toFixed(2)}s
- Taille de page: ${result.performance.pageSize}KB
- Requêtes: ${result.performance.requests}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const reportUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = reportUrl;
    a.download = `audit-seo-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-purple-500 text-white p-3 rounded-lg mr-4">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Audit de Site</h2>
            <p className="text-gray-600">Analyse technique complète de votre site web</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://votre-site.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAudit()}
              />
            </div>
            <button
              onClick={handleAudit}
              disabled={loading || !url.trim()}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyse...</span>
                </>
              ) : (
                <>
                  <Globe className="h-5 w-5" />
                  <span>Auditer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {analyzed && result && (
          <div className="space-y-8">
            {/* Score global */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Score SEO Global</h3>
                  <p className="text-gray-600">Évaluation générale de votre site</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(result.score)} mb-2`}>
                    {result.score}/100
                  </div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getScoreBackground(result.score)} transition-all duration-1000`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-blue-500 mr-3" />
                  <h4 className="font-semibold text-gray-900">Temps de chargement</h4>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {result.performance.loadTime.toFixed(2)}s
                </div>
                <p className="text-sm text-gray-600">
                  {result.performance.loadTime < 2 ? 'Excellent' : 
                   result.performance.loadTime < 4 ? 'Bon' : 'À améliorer'}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-500 mr-3" />
                  <h4 className="font-semibold text-gray-900">Taille de page</h4>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {result.performance.pageSize}KB
                </div>
                <p className="text-sm text-gray-600">
                  {result.performance.pageSize < 1000 ? 'Optimisé' : 'Peut être réduit'}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-purple-500 mr-3" />
                  <h4 className="font-semibold text-gray-900">Requêtes HTTP</h4>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {result.performance.requests}
                </div>
                <p className="text-sm text-gray-600">
                  {result.performance.requests < 50 ? 'Bon' : 'Trop élevé'}
                </p>
              </div>
            </div>

            {/* Problèmes détectés */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Critiques */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                  <h4 className="font-semibold text-red-900">Problèmes Critiques</h4>
                </div>
                <div className="text-2xl font-bold text-red-900 mb-4">
                  {result.issues.critical.length}
                </div>
                <ul className="space-y-2">
                  {result.issues.critical.map((issue, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avertissements */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
                  <h4 className="font-semibold text-yellow-900">Avertissements</h4>
                </div>
                <div className="text-2xl font-bold text-yellow-900 mb-4">
                  {result.issues.warnings.length}
                </div>
                <ul className="space-y-2">
                  {result.issues.warnings.map((issue, index) => (
                    <li key={index} className="text-sm text-yellow-700 flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notices */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                  <h4 className="font-semibold text-blue-900">Améliorations</h4>
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-4">
                  {result.issues.notices.length}
                </div>
                <ul className="space-y-2">
                  {result.issues.notices.map((issue, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Éléments SEO */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Éléments SEO Essentiels</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(result.seo).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    {value ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm text-gray-700 capitalize">
                      {key === 'title' ? 'Titre' :
                       key === 'description' ? 'Description' :
                       key === 'headings' ? 'Titres H1-H6' :
                       key === 'images' ? 'Alt images' : key}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                <Download className="h-5 w-5" />
                <span>Télécharger le Rapport</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}