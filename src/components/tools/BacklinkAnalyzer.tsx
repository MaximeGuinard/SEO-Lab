import React, { useState } from 'react';
import { Link, ExternalLink, TrendingUp, Shield, Download } from 'lucide-react';
import { SEOAnalyzer, BacklinkData } from '../../utils/seoAnalyzer';

export default function BacklinkAnalyzer() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<BacklinkData[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!domain.trim()) return;
    
    setLoading(true);
    try {
      const backlinks = await SEOAnalyzer.analyzeBacklinks(domain);
      setResults(backlinks);
      setAnalyzed(true);
    } catch (error) {
      console.error('Erreur analyse backlinks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAuthorityColor = (authority: number) => {
    if (authority >= 70) return 'text-green-600 bg-green-100';
    if (authority >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const exportResults = () => {
    const csv = [
      'Domain,Authority,Type,Anchor,Discovered',
      ...results.map(r => `${r.domain},${r.authority},${r.type},${r.anchor},${r.discovered}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backlinks-${domain}.csv`;
    a.click();
  };

  const totalAuthority = results.reduce((sum, link) => sum + link.authority, 0);
  const averageAuthority = results.length > 0 ? Math.round(totalAuthority / results.length) : 0;
  const dofollowCount = results.filter(link => link.type === 'dofollow').length;
  const nofollowCount = results.filter(link => link.type === 'nofollow').length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-pink-500 text-white p-3 rounded-lg mr-4">
            <Link className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analyseur de Backlinks</h2>
            <p className="text-gray-600">Analysez le profil de liens entrants de votre site</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="exemple.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !domain.trim()}
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyse...</span>
                </>
              ) : (
                <>
                  <Link className="h-5 w-5" />
                  <span>Analyser</span>
                </>
              )}
            </button>
          </div>
        </div>

        {analyzed && results.length > 0 && (
          <div className="space-y-8">
            {/* Statistiques globales */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <Link className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">Total Backlinks</h3>
                </div>
                <div className="text-2xl font-bold text-blue-900">{results.length}</div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-900">Autorité Moyenne</h3>
                </div>
                <div className="text-2xl font-bold text-green-900">{averageAuthority}/100</div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <Shield className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-purple-900">Dofollow</h3>
                </div>
                <div className="text-2xl font-bold text-purple-900">{dofollowCount}</div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <ExternalLink className="h-6 w-6 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-orange-900">Nofollow</h3>
                </div>
                <div className="text-2xl font-bold text-orange-900">{nofollowCount}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Profil de Backlinks pour {domain}
              </h3>
              <button
                onClick={exportResults}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                <span>Exporter</span>
              </button>
            </div>

            {/* Liste des backlinks */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Domaine</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Autorité</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Type</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Ancre</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Découvert</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((backlink, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b">
                      <td className="p-4 font-medium text-gray-900">
                        <div className="flex items-center">
                          <ExternalLink className="h-4 w-4 text-gray-400 mr-2" />
                          {backlink.domain}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAuthorityColor(backlink.authority)}`}>
                          {backlink.authority}/100
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          backlink.type === 'dofollow' 
                            ? 'text-green-600 bg-green-100' 
                            : 'text-gray-600 bg-gray-100'
                        }`}>
                          {backlink.type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700 max-w-xs truncate">
                        {backlink.anchor}
                      </td>
                      <td className="p-4 text-gray-600">
                        {backlink.discovered}
                      </td>
                      <td className="p-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Analyser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Graphique de répartition */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Répartition des Types de Liens</h4>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">Dofollow ({dofollowCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-sm text-gray-700">Nofollow ({nofollowCount})</span>
                </div>
              </div>
              <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000"
                  style={{ width: `${(dofollowCount / results.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {analyzed && results.length === 0 && (
          <div className="text-center py-8">
            <Link className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun backlink trouvé pour ce domaine.</p>
          </div>
        )}
      </div>
    </div>
  );
}