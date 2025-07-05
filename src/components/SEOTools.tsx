import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Code, 
  Smartphone, 
  Zap, 
  BarChart3, 
  Link,
  Image,
  Globe,
  Target,
  ArrowLeft
} from 'lucide-react';

// Import des composants d'outils
import KeywordResearch from './tools/KeywordResearch';
import SiteAudit from './tools/SiteAudit';
import MetaGenerator from './tools/MetaGenerator';
import PageSpeedTest from './tools/PageSpeedTest';
import BacklinkAnalyzer from './tools/BacklinkAnalyzer';
import MobileFriendlyTest from './tools/MobileFriendlyTest';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  component: React.ComponentType;
}

const tools: Tool[] = [
  {
    id: 'keyword-research',
    name: 'Recherche de Mots-Clés',
    description: 'Trouvez des mots-clés rentables et analysez la concurrence',
    icon: <Search className="h-6 w-6" />,
    color: 'bg-blue-500',
    category: 'Recherche',
    component: KeywordResearch
  },
  {
    id: 'site-audit',
    name: 'Audit de Site',
    description: 'Analyse technique complète de votre site web',
    icon: <Globe className="h-6 w-6" />,
    color: 'bg-purple-500',
    category: 'Technique',
    component: SiteAudit
  },
  {
    id: 'meta-generator',
    name: 'Générateur Meta Tags',
    description: 'Créez des meta tags optimisés pour le SEO',
    icon: <FileText className="h-6 w-6" />,
    color: 'bg-green-500',
    category: 'Contenu',
    component: MetaGenerator
  },
  {
    id: 'page-speed',
    name: 'Test de Vitesse',
    description: 'Analysez les performances de votre site',
    icon: <Zap className="h-6 w-6" />,
    color: 'bg-yellow-500',
    category: 'Performance',
    component: PageSpeedTest
  },
  {
    id: 'backlink-analyzer',
    name: 'Analyseur de Backlinks',
    description: 'Analysez votre profil de liens entrants',
    icon: <Link className="h-6 w-6" />,
    color: 'bg-pink-500',
    category: 'Analyse',
    component: BacklinkAnalyzer
  },
  {
    id: 'mobile-test',
    name: 'Test Mobile-Friendly',
    description: 'Vérifiez l\'optimisation mobile de votre site',
    icon: <Smartphone className="h-6 w-6" />,
    color: 'bg-orange-500',
    category: 'Technique',
    component: MobileFriendlyTest
  }
];

export default function SEOTools() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const categories = ['Tous', 'Recherche', 'Contenu', 'Technique', 'Performance', 'Analyse'];

  const filteredTools = selectedCategory === 'Tous' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleBackToTools = () => {
    setSelectedTool(null);
  };

  // Si un outil est sélectionné, afficher son composant
  if (selectedTool) {
    const tool = tools.find(t => t.id === selectedTool);
    if (tool) {
      const ToolComponent = tool.component;
      return (
        <section className="py-20 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <button
                onClick={handleBackToTools}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Retour aux outils</span>
              </button>
            </div>
            <ToolComponent />
          </div>
        </section>
      );
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Outils SEO Professionnels
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour optimiser votre site et améliorer vos classements
          </p>
        </div>

        {/* Filtre par catégorie */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille d'outils */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className={`${tool.color} text-white p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Utiliser l'outil</span>
                <Target className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Section d'information */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Prêt à Dominer les Classements ?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels SEO qui font confiance à SEO Lab pour leurs besoins d'optimisation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Commencer l'Essai Gratuit
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Voir les Tarifs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}