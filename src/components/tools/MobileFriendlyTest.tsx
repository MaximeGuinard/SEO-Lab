import React, { useState } from 'react';
import { Smartphone, CheckCircle, AlertTriangle, Monitor } from 'lucide-react';
import { SEOAnalyzer } from '../../utils/seoAnalyzer';

export default function MobileFriendlyTest() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleTest = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    try {
      const mobileResult = await SEOAnalyzer.checkMobileFriendly(url);
      setResult(mobileResult);
      setAnalyzed(true);
    } catch (error) {
      console.error('Erreur test mobile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-orange-500 text-white p-3 rounded-lg mr-4">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Test Mobile-Friendly</h2>
            <p className="text-gray-600">Vérifiez si votre site est optimisé pour mobile</p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleTest()}
              />
            </div>
            <button
              onClick={handleTest}
              disabled={loading || !url.trim()}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Test...</span>
                </>
              ) : (
                <>
                  <Smartphone className="h-5 w-5" />
                  <span>Tester</span>
                </>
              )}
            </button>
          </div>
        </div>

        {analyzed && result && (
          <div className="space-y-8">
            {/* Résultat principal */}
            <div className={`rounded-xl p-8 text-center ${
              result.isMobileFriendly 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                result.isMobileFriendly ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {result.isMobileFriendly ? (
                  <CheckCircle className="h-8 w-8 text-white" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-white" />
                )}
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 ${
                result.isMobileFriendly ? 'text-green-900' : 'text-red-900'
              }`}>
                {result.isMobileFriendly ? 'Site Mobile-Friendly' : 'Site Non Mobile-Friendly'}
              </h3>
              
              <p className={`text-lg ${
                result.isMobileFriendly ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.isMobileFriendly 
                  ? 'Votre site est optimisé pour les appareils mobiles'
                  : 'Votre site nécessite des améliorations pour mobile'
                }
              </p>
            </div>

            {/* Aperçu visuel */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vue desktop */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Monitor className="h-6 w-6 text-gray-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Vue Desktop</h4>
                </div>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-4 aspect-video">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded mx-auto mb-2"></div>
                      <div className="text-sm text-gray-600">Version Desktop</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vue mobile */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="h-6 w-6 text-gray-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Vue Mobile</h4>
                </div>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-2 aspect-[9/16] max-w-48 mx-auto">
                  <div className={`w-full h-full rounded flex items-center justify-center ${
                    result.isMobileFriendly 
                      ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                      : 'bg-gradient-to-br from-red-100 to-pink-100'
                  }`}>
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded mx-auto mb-2 ${
                        result.isMobileFriendly ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div className="text-xs text-gray-600">Version Mobile</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problèmes détectés */}
            {result.issues && result.issues.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                  <h4 className="font-semibold text-red-900">Problèmes Détectés</h4>
                </div>
                <ul className="space-y-3">
                  {result.issues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-800">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommandations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-4">Recommandations pour l'Optimisation Mobile</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Utilisez un design responsive</p>
                    <p className="text-sm text-blue-700">Adaptez votre mise en page à toutes les tailles d'écran</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Optimisez la taille du texte</p>
                    <p className="text-sm text-blue-700">Assurez-vous que le texte soit lisible sans zoom</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Espacez les éléments cliquables</p>
                    <p className="text-sm text-blue-700">Laissez suffisamment d'espace entre les boutons et liens</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Configurez la viewport</p>
                    <p className="text-sm text-blue-700">Ajoutez la balise meta viewport dans votre HTML</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code viewport */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Code Viewport Recommandé</h4>
              <div className="bg-white border rounded p-4">
                <code className="text-sm text-gray-800">
                  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
                </code>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Ajoutez cette balise dans la section &lt;head&gt; de votre HTML
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}