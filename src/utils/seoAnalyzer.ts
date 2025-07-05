// Utilitaires d'analyse SEO
export interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: 'Low' | 'Medium' | 'High';
  trend: number[];
}

export interface SiteAuditResult {
  score: number;
  issues: {
    critical: string[];
    warnings: string[];
    notices: string[];
  };
  performance: {
    loadTime: number;
    pageSize: number;
    requests: number;
  };
  seo: {
    title: boolean;
    description: boolean;
    headings: boolean;
    images: boolean;
  };
}

export interface BacklinkData {
  domain: string;
  authority: number;
  type: 'dofollow' | 'nofollow';
  anchor: string;
  discovered: string;
}

export class SEOAnalyzer {
  // Analyse des mots-clés
  static async analyzeKeywords(keyword: string): Promise<KeywordData[]> {
    // Simulation d'une vraie API avec des données réalistes
    const baseKeywords = [
      keyword,
      `${keyword} tips`,
      `${keyword} guide`,
      `best ${keyword}`,
      `${keyword} tools`,
      `${keyword} strategy`,
      `how to ${keyword}`,
      `${keyword} optimization`
    ];

    return baseKeywords.map(kw => ({
      keyword: kw,
      volume: Math.floor(Math.random() * 10000) + 100,
      difficulty: Math.floor(Math.random() * 100),
      cpc: Math.random() * 5 + 0.1,
      competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High',
      trend: Array.from({length: 12}, () => Math.floor(Math.random() * 100))
    }));
  }

  // Audit de site
  static async auditSite(url: string): Promise<SiteAuditResult> {
    // Simulation d'un audit complet
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation du temps d'analyse

    const score = Math.floor(Math.random() * 40) + 60; // Score entre 60-100
    
    return {
      score,
      issues: {
        critical: [
          'Missing meta description on 3 pages',
          'Broken internal links detected',
          'Large images not optimized'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        warnings: [
          'H1 tag missing on some pages',
          'Alt text missing on images',
          'Page load time could be improved',
          'Some pages have duplicate titles'
        ].slice(0, Math.floor(Math.random() * 4) + 1),
        notices: [
          'Consider adding schema markup',
          'Social media meta tags could be improved',
          'Internal linking structure is good'
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      },
      performance: {
        loadTime: Math.random() * 3 + 1,
        pageSize: Math.floor(Math.random() * 2000) + 500,
        requests: Math.floor(Math.random() * 50) + 20
      },
      seo: {
        title: Math.random() > 0.3,
        description: Math.random() > 0.4,
        headings: Math.random() > 0.2,
        images: Math.random() > 0.5
      }
    };
  }

  // Analyse des backlinks
  static async analyzeBacklinks(domain: string): Promise<BacklinkData[]> {
    const domains = [
      'example.com', 'blog.example.org', 'news.site.com', 'authority.net',
      'industry.blog', 'resource.edu', 'magazine.com', 'portal.org'
    ];

    return domains.map(d => ({
      domain: d,
      authority: Math.floor(Math.random() * 100) + 1,
      type: Math.random() > 0.3 ? 'dofollow' : 'nofollow',
      anchor: `${domain} resource`,
      discovered: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));
  }

  // Génération de meta tags
  static generateMetaTags(title: string, description: string, keywords: string) {
    return {
      title: title.length > 60 ? title.substring(0, 57) + '...' : title,
      description: description.length > 160 ? description.substring(0, 157) + '...' : description,
      keywords: keywords.split(',').slice(0, 10).join(', '),
      ogTitle: title,
      ogDescription: description,
      twitterTitle: title,
      twitterDescription: description
    };
  }

  // Test de vitesse
  static async testPageSpeed(url: string) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      score: Math.floor(Math.random() * 40) + 60,
      metrics: {
        fcp: Math.random() * 2 + 1,
        lcp: Math.random() * 3 + 2,
        cls: Math.random() * 0.1,
        fid: Math.random() * 100 + 50
      },
      opportunities: [
        'Optimize images',
        'Minify CSS',
        'Enable compression',
        'Reduce server response time'
      ].slice(0, Math.floor(Math.random() * 4) + 1)
    };
  }

  // Vérification mobile
  static async checkMobileFriendly(url: string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      isMobileFriendly: Math.random() > 0.2,
      issues: [
        'Text too small to read',
        'Clickable elements too close together',
        'Content wider than screen',
        'Viewport not set'
      ].slice(0, Math.floor(Math.random() * 2))
    };
  }
}