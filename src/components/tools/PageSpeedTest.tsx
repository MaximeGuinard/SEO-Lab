import React, { useState } from 'react';
import { Zap, Clock, Gauge, AlertTriangle, CheckCircle } from 'lucide-react';
import { SEOAnalyzer } from '../../utils/seoAnalyzer';

export default function PageSpeedTest() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleTest = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    try {
      const speedResult = await SEOAnalyzer.testPageSpeed(url);
      setResult(speedResult);
      setAnalyzed(true);
    } catch (error) {
      console.error('Erreur test vitesse:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case 'fcp':
        return value < 1.8 ? 'text-green-600' : value < 3 ? 'text-yellow-600' : 'text-red-600';
      case 'lcp':
        return value < 2.5 ? 'text-green-600' : value < 4 ? 'text-yellow-600' : 'text-red-600';
      case 'cls':
        return value < 0.1 ? 'text-green-600' : value < 0.25 ? 'text-yellow-600' : 'text-red-600';
      case 'fid':
        return value < 100 ? 'text-green-600' : value < 300 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-yellow-500 text-white p-3 rounded-lg mr-4">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Test de Vitesse</h2>
            <p className="text-gray-600">Analysez les performances de votre site web</p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleTest()}
              />
            </div>
            <button
              onClick={handleTest}
              disabled={loading || !url.trim()}
              className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Test en cours...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Tester</span>
                </>
              )}
            </button>
          </div>
        </div>

        {analyzed && result && (
          <div className="space-y-8">
            {/* Score global */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Score de Performance</h3>
                  <p className="text-gray-600">Évaluation basée sur les Core Web Vitals</p>
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

            {/* Métriques Core Web Vitals */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-blue-500 mr-3" />
                  <h4 className="font-semibold text-gray-900">FCP</h4>
                </div>
                <div className={`text-2xl font-bold mb-2 ${getMetricColor('fcp', result.metrics.fcp)}`}>
                  {result.metrics.fcp.toFixed(1)}s
                </div>
                <p className="text-sm text-gray-600">First Contentful Paint</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Gauge className="h-6 w-6 text-green-500 mr-3" />
                  <h4 className="font-semibold text-gray-900">LCP</h4>
                </div>
                <div className={`text-2xl font-bold mb-2 ${getMetricColor('lcp', result.metrics.lcp)}`}>
                  {result.metrics.lcp.toFixed(1)}s
                </div>
                <p className="text-sm text-gray-600">Largest Contentful Paint</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
                  <h4 className="font-semibold text-gray-900">CLS</h4>
                </div>
                <div className={`text-2xl font-bold mb-2 ${getMetricColor('cls', result.metrics.cls)}`}>
                  {result.metrics.cls.toFixed(3)}
                </div>
                <p className="text-sm text-gray-600">Cumulative Layout Shift</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 text-purple-500 mr-3" />
                  <h4 className="font-semibold text-gray-900">FID</h4>
                </div>
                <div className={`text-2xl font-bold mb-2 ${getMetricColor('fid', result.metrics.fid)}`}>
                  {result.metrics.fid.toFixed(0)}ms
                </div>
                <p className="text-sm text-gray-600">First Input Delay</p>
              </div>
            </div>

            {/* Opportunités d'amélioration */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                Opportunités d'Amélioration
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {result.opportunities.map((opportunity: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-900">{opportunity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Recommandations</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Optimisez vos images</p>
                    <p className="text-sm text-gray-600">Utilisez des formats modernes comme WebP et compressez vos images</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Minifiez CSS et JavaScript</p>
                    <p className="text-sm text-gray-600">Réduisez la taille de vos fichiers pour améliorer le temps de chargement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Utilisez un CDN</p>
                    <p className="text-sm text-gray-600">Distribuez votre contenu via un réseau de diffusion de contenu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}