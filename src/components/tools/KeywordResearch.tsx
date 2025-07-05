import React, { useState } from 'react';
import { Search, TrendingUp, DollarSign, BarChart3, Download } from 'lucide-react';
import { SEOAnalyzer, KeywordData } from '../../utils/seoAnalyzer';

export default function KeywordResearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!keyword.trim()) return;
    
    setLoading(true);
    try {
      const data = await SEOAnalyzer.analyzeKeywords(keyword);
      setResults(data);
      setAnalyzed(true);
    } catch (error) {
      console.error('Erreur analyse:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    const csv = [
      'Keyword,Volume,Difficulty,CPC,Competition',
      ...results.map(r => `${r.keyword},${r.volume},${r.difficulty},${r.cpc.toFixed(2)},${r.competition}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyword-research-${keyword}.csv`;
    a.click();
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600 bg-green-100';
    if (difficulty < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recherche de Mots-Clés</h2>
            <p className="text-gray-600">Trouvez des mots-clés rentables et analysez la concurrence</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Entrez votre mot-clé principal..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !keyword.trim()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyse...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Analyser</span>
                </>
              )}
            </button>
          </div>
        </div>

        {analyzed && results.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Résultats pour "{keyword}" ({results.length} mots-clés trouvés)
              </h3>
              <button
                onClick={exportResults}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                <span>Exporter CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Mot-clé</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Volume</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Difficulté</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">CPC</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Concurrence</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Tendance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b">
                      <td className="p-4 font-medium text-gray-900">{result.keyword}</td>
                      <td className="p-4 text-gray-700">
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 text-blue-500 mr-2" />
                          {result.volume.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(result.difficulty)}`}>
                          {result.difficulty}/100
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                          {result.cpc.toFixed(2)}€
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(result.competition)}`}>
                          {result.competition}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                          <div className="w-16 h-8 bg-gray-100 rounded flex items-end space-x-1 p-1">
                            {result.trend.slice(-6).map((value, i) => (
                              <div
                                key={i}
                                className="bg-blue-500 rounded-sm flex-1"
                                style={{ height: `${(value / 100) * 100}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {analyzed && results.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun résultat trouvé pour ce mot-clé.</p>
          </div>
        )}
      </div>
    </div>
  );
}