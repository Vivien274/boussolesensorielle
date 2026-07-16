'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Zap, LayoutGrid, Gamepad2, Wind, Heart, Brain } from 'lucide-react';
import { track } from '@vercel/analytics';
import SensoryFilter from '../components/SensoryFilter';
import FidgetCard from '../components/FidgetCard';
import DigitalFidgets from '../components/DigitalFidgets';
import BreathingGuide from '../components/BreathingGuide';
import FidgetProfiler from '../components/FidgetProfiler';
import { FidgetProduct, SensoryCategory } from '../types';

const products: FidgetProduct[] = [
  {
    id: 'porte-cle-clavier-mecanique',
    name: 'Porte-clé Clavier Mécanique',
    category: 'cliquer',
    description: 'Le clic-clic franc et ultra tactile d\'un véritable switch mécanique de clavier de jeu. La référence ultime pour calmer le besoin de presser.',
    price: '5.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/porte-cle-clavier-mecanique/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/01/Spoolio_Porte-Cle-clavier-mecanique-7.jpg',
    noiseLevel: 'high',
    size: 'pocket',
    profiles: ['tdah', 'focus']
  },
  {
    id: 'fidget-twist',
    name: 'Fidget "Twist"',
    category: 'manipuler',
    description: 'Un mouvement hélicoïdal fascinant : fais monter et descendre la bague le long de sa spirale 3D. Idéal pour concentrer l\'attention et les yeux.',
    price: '3.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/fidget-twist/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/12/Spoolio-fidget-twist-2-scaled.webp',
    noiseLevel: 'silent',
    size: 'medium',
    profiles: ['anxiety', 'autism']
  },
  {
    id: 'fidget-cube-articule',
    name: 'Fidget Cube Articulé',
    category: 'manipuler',
    description: 'Plie, tourne et replie ce cube infini. Totalement silencieux, il s\'occupe de tes doigts pendant les réunions ou les cours sans faire de bruit.',
    price: '4.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/fidget-cube-articule/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/12/Spoolio-fidget-cubes-2-scaled.webp',
    noiseLevel: 'low',
    size: 'medium',
    profiles: ['tdah', 'focus', 'autism']
  },
  {
    id: 'fidget-bague-rotative',
    name: 'Fidget Bague Rotative',
    category: 'manipuler',
    description: 'Porte-la au doigt et fais-la tourner discrètement à l\'infini. Le fidget le plus discret pour évacuer le stress n\'importe où.',
    price: '3.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/fidget-bague-rotative/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/12/Spoolio-fidget-bague-rotative-5-scaled.webp',
    noiseLevel: 'silent',
    size: 'pocket',
    profiles: ['anxiety', 'tdah']
  },
  {
    id: 'fidget-engrenages-mecanique',
    name: 'Fidget Engrenage Mécanique',
    category: 'resoudre',
    description: 'Le plaisir brut d\'engrenages imbriqués à manipuler. Fais tourner les engrenages pour ressentir le retour mécanique et canaliser ton attention.',
    price: '4.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/fidget-engrenages-mecanique/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/12/Spoolio-fidget-mecanique-engrenage-2-scaled.webp',
    noiseLevel: 'low',
    size: 'medium',
    profiles: ['focus', 'tdah']
  },
  {
    id: 'fidget-boule-piquante',
    name: 'Fidget Boule Piquante',
    category: 'caresser',
    description: 'Des dizaines de petits pics d\'acupression stimulants. Masse, roule et fais glisser tes doigts sur ses reliefs pour relâcher instantanément les tensions.',
    price: '3.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/fidget-boule-piquante/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/12/Spoolio-fidget-sensoriel-boule-3-scaled.webp',
    noiseLevel: 'silent',
    size: 'pocket',
    profiles: ['anxiety', 'autism']
  },
  {
    id: 'serpent-articule',
    name: 'Serpent Articulé',
    category: 'manipuler',
    description: 'Un long corps sinueux entièrement articulé qui ondule et se contorsionne de façon hypnotique dans tes mains. Un incontournable pour libérer les tensions motrices.',
    price: '4.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/serpent-articule/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/01/Spoolio-Serpent-articule-11-scaled.jpg',
    noiseLevel: 'low',
    size: 'large',
    profiles: ['tdah', 'autism']
  },
  {
    id: 'gadgetoids-robot-transformable',
    name: 'Gadgetoids™ Robot Transformable',
    category: 'resoudre',
    description: 'Un mini robot geek transformable inspiré des objets tech rétro des années 90. Manipule ses articulations pour le métamorphoser et stimuler ton focus.',
    price: '12.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/gadgetoids-robot-transformable/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2026/02/Gadgetoids-detail-scaled.jpg',
    noiseLevel: 'low',
    size: 'medium',
    profiles: ['focus', 'tdah']
  },
  {
    id: 'clicker-coeur',
    name: 'Clicker Cœur',
    category: 'cliquer',
    description: 'Un adorable clicker en forme de cœur imprimé en 3D. Presse-le à l\'infini pour un retour tactile "clicky" hyper satisfaisant et rassurant.',
    price: '3.40€',
    wooCommerceUrl: 'https://spoolio.fr/produit/clicker-coeur/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2026/01/Spoolio-St-Valentin-clicker-coeur-2.webp',
    noiseLevel: 'medium',
    size: 'pocket',
    profiles: ['anxiety', 'focus']
  },
  {
    id: 'clicker-toilettes-bureau',
    name: 'Clicker Toilettes de Bureau',
    category: 'cliquer',
    description: 'Le mini trône anti-stress par excellence ! Un clicker insolite en forme de toilettes de bureau pour décompresser avec humour pendant les heures de travail.',
    price: '4.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/clicker-toilettes-bureau/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/11/Spoolio_SecretSanta-Clicker-Toilette-4-scaled.webp',
    noiseLevel: 'medium',
    size: 'pocket',
    profiles: ['focus', 'tdah']
  },
  {
    id: 'clicker-mug-chocolat-chaud',
    name: 'Clicker Mug Chocolat Chaud',
    category: 'cliquer',
    description: 'Une tasse de chocolat chaud réconfortante à cliquer sans modération ! Le fidget le plus mignon pour occuper tes doigts tout en restant au chaud.',
    price: '4.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/clicker-mug-chocolat-chaud/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/01/Spoolio_Clicker-mug-1.jpeg',
    noiseLevel: 'medium',
    size: 'pocket',
    profiles: ['anxiety', 'autism']
  },
  {
    id: 'caca-fidget',
    name: 'Caca Fidget',
    category: 'manipuler',
    description: 'Le fidget le plus rigolo ! Ce petit caca doté d\'une bouille amusante tourne entre tes doigts pour combiner relaxation mécanique et éclats de rire.',
    price: '4.00€',
    wooCommerceUrl: 'https://spoolio.fr/produit/caca-fidget/',
    imageUrl: 'https://i0.wp.com/spoolio.fr/wp-content/uploads/2025/01/Spoolio-Caca_Fidget-6.jpg',
    noiseLevel: 'silent',
    size: 'pocket',
    profiles: ['tdah', 'focus']
  }
];

const categoryHeadings = {
  cliquer: '🎯 Ta dose de clics tactiles immédiate :',
  manipuler: '🌀 Pour t\'occuper les mains de façon fluide :',
  resoudre: '🧩 Un défi logique pour canaliser ton attention :',
  caresser: '🌿 Un retour tactile doux et apaisant :',
};

type AppTab = 'compass' | 'profiler' | 'digital' | 'breathing';

export default function Home() {
  const [activeTab, setActiveTab] = useState<AppTab>('compass');
  const [selectedCategory, setSelectedCategory] = useState<SensoryCategory | null>(null);
  const [virtualClicks, setVirtualClicks] = useState<number>(0);
  const [clickScale, setClickScale] = useState<boolean>(false);

  // Statistics tracker state
  const [stats, setStats] = useState({
    clicks: 0,
    pops: 0,
    twangs: 0,
    breathingSeconds: 0
  });

  // Load stats from localStorage on mount and register update listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('spoolio_calm_stats');
        if (saved) {
          const parsed = JSON.parse(saved);
          setStats(parsed);
          setVirtualClicks(parsed.clicks || 0);
        }
      } catch (e) {}

      const handleStatsUpdate = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail) {
          setStats(customEvent.detail);
          setVirtualClicks(customEvent.detail.clicks || 0);
        }
      };

      window.addEventListener('calm-stats-updated', handleStatsUpdate);
      return () => {
        window.removeEventListener('calm-stats-updated', handleStatsUpdate);
      };
    }
  }, []);

  const handleSelectCategory = (category: SensoryCategory | null) => {
    if (category) {
      try {
        track('sensory_filter_select', { category });
      } catch (e) {}
    }
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setSelectedCategory(category);
      });
    } else {
      setSelectedCategory(category);
    }
  };

  const handleTabSwitch = (tab: AppTab) => {
    try {
      track('main_tab_switch', { tab });
    } catch (e) {}
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setActiveTab(tab);
      });
    } else {
      setActiveTab(tab);
    }
  };

  // Virtual Fidget Clicker helper for ADHD interactive micro-break (Quick switch in header)
  const handleVirtualClick = () => {
    setVirtualClicks((prev) => prev + 1);
    setClickScale(true);

    // Haptic vibration feedback for mobile (progressive enhancement)
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(15);
      } catch (e) {}
    }

    // Save clicks to statistics
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('spoolio_calm_stats');
        const currentStats = saved ? JSON.parse(saved) : { clicks: 0, pops: 0, twangs: 0, breathingSeconds: 0 };
        currentStats.clicks = (currentStats.clicks || 0) + 1;
        localStorage.setItem('spoolio_calm_stats', JSON.stringify(currentStats));
        window.dispatchEvent(new CustomEvent('calm-stats-updated', { detail: currentStats }));
      } catch (e) {}
    }
    
    // Synthesize simple sine click
    if (typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.setValueAtTime(350, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.04);
        
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.04);
      } catch (e) {}
    }

    setTimeout(() => setClickScale(false), 80);
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background text-foreground">
      
      {/* Dynamic Background glow rings */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-spoolio-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-spoolio-pink/5 blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-spoolio-dark-border/40 relative z-10 select-none">
        <div className="select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://spoolio.fr/wp-content/uploads/2025/04/LogoSpoolio_White-long.png"
            alt="Spoolio Logo"
            className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Centered title in the header */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block select-none pointer-events-none">
          <span className="text-xs font-black tracking-[0.2em] uppercase text-spoolio-text-muted">
            Boussole Sensorielle
          </span>
        </div>

        {/* Quick actions: Virtual clicker switch */}
        <div className="flex items-center gap-3">
          <Link
            href="/a-propos"
            className="text-xs font-black tracking-wider uppercase px-4 py-2.5 rounded-2xl border border-spoolio-dark-border bg-spoolio-dark-card/30 hover:border-spoolio-blue hover:text-spoolio-blue transition-all cursor-pointer text-spoolio-text-muted hover:bg-slate-900/30 flex items-center gap-1.5 active:scale-95"
          >
            <span>💡 Notre Démarche</span>
          </Link>
          <button
            onClick={handleVirtualClick}
            className={`
              hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border border-spoolio-dark-border bg-spoolio-dark-card/60
              hover:border-spoolio-pink hover:text-spoolio-pink transition-all duration-100 cursor-pointer
              active:scale-95 outline-hidden focus-visible:ring-2 focus-visible:ring-spoolio-pink
              ${clickScale ? 'scale-90 bg-spoolio-pink/20 text-spoolio-pink border-spoolio-pink' : ''}
            `}
            title="Bouton anti-stress rapide"
            aria-label={`Bouton anti-stress. Cliqué ${virtualClicks} fois`}
          >
            <Zap className={`w-4 h-4 ${clickScale ? 'fill-current' : ''}`} />
            <span className="text-xs font-black tracking-wider uppercase hidden sm:inline">
              Quick Clicker
            </span>
            <span className="bg-background px-2 py-0.5 rounded-md font-mono text-xs text-foreground border border-spoolio-dark-border/80 min-w-8">
              {virtualClicks}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col justify-center relative z-10">
        
        {/* Title Question Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-spoolio-blue/30 bg-spoolio-blue/10 text-xs font-semibold text-blue-300 select-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fidget Finder & Jeux Sensoriels</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            De quoi tes mains ont-elles besoin{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spoolio-blue via-violet-400 to-spoolio-pink">
              là, tout de suite ?
            </span>
          </h1>
          <p className="text-sm sm:text-base text-spoolio-text-muted max-w-xl mx-auto">
            Trouve ton objet idéal imprimé en 3D ou amuse-toi directement avec nos fidgets tactiles interactifs ci-dessous.
          </p>
        </div>

        {/* Navigation Switcher Tabs */}
        <div className="flex justify-center mb-12 select-none">
          <div className="inline-flex p-1.5 bg-spoolio-dark-card border border-spoolio-dark-border/60 rounded-3xl flex-wrap justify-center gap-1 sm:gap-0">
            <button
              onClick={() => handleTabSwitch('compass')}
              className={`
                flex items-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase
                transition-all duration-300 cursor-pointer
                ${
                  activeTab === 'compass'
                    ? 'bg-spoolio-blue text-white shadow-lg shadow-spoolio-blue/20'
                    : 'text-spoolio-text-muted hover:text-white'
                }
              `}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>🧭 Trouver mon Fidget</span>
             </button>
            <button
              onClick={() => handleTabSwitch('profiler')}
              className={`
                flex items-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase
                transition-all duration-300 cursor-pointer
                ${
                  activeTab === 'profiler'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                    : 'text-spoolio-text-muted hover:text-white'
                }
              `}
            >
              <Brain className="w-4 h-4" />
              <span>🎯 Diagnostic</span>
            </button>
            <button
              onClick={() => handleTabSwitch('digital')}
              className={`
                flex items-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase
                transition-all duration-300 cursor-pointer
                ${
                  activeTab === 'digital'
                    ? 'bg-spoolio-pink text-white shadow-lg shadow-spoolio-pink/20'
                    : 'text-spoolio-text-muted hover:text-white'
                }
              `}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>🕹️ Fidgets Numériques</span>
            </button>
            <button
              onClick={() => handleTabSwitch('breathing')}
              className={`
                flex items-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase
                transition-all duration-300 cursor-pointer
                ${
                  activeTab === 'breathing'
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-spoolio-text-muted hover:text-white'
                }
              `}
            >
              <Wind className="w-4 h-4" />
              <span>🫁 Respiration Zen</span>
            </button>
          </div>
        </div>

        {/* Conditional rendering based on Active Tab */}
        {activeTab === 'compass' && (
          <div className="space-y-16 md:space-y-20 animate-fade-in">
            {/* 4 Pillars Sensory Filter */}
            <section>
              <SensoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />
            </section>

            {/* Fidget Cards Results */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-spoolio-dark-border/20 pb-4 max-w-5xl mx-auto select-none">
                <h2 className="text-base sm:text-lg font-bold text-white transition-all duration-300">
                  {selectedCategory
                    ? categoryHeadings[selectedCategory]
                    : '✨ Découvre la sélection sensorielle de Spoolio :'}
                </h2>
                
                <div className="text-xs font-semibold text-spoolio-text-muted">
                  {filteredProducts.length} fidget{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </div>
              </div>

              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
                style={{ viewTransitionName: 'product-grid' } as React.CSSProperties}
              >
                {filteredProducts.map((product) => (
                  <FidgetCard key={product.id} product={product} />
                ))}
              </div>

              {/* Call to action for full categories on spoolio.fr */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-spoolio-blue/10 to-spoolio-pink/10 border border-spoolio-dark-border/40 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 select-none animate-fade-in">
                <div className="text-left">
                  <h3 className="font-bold text-white text-base">Tu en veux encore plus ?</h3>
                  <p className="text-xs text-spoolio-text-muted mt-1">
                    Explore nos collections thématiques complètes imprimées en 3D en France.
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href="https://spoolio.fr/categorie/animaux-figurines/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-spoolio-dark-border text-xs font-bold text-white hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span>🐉 Animaux & Figurines</span>
                  </a>
                  <a
                    href="https://spoolio.fr/les-fidgets-jouets-sensoriels/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-spoolio-dark-border text-xs font-bold text-white hover:border-spoolio-pink hover:text-spoolio-pink transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span>🚀 Tous les Fidgets</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'profiler' && (
          <section className="animate-fade-in">
            <FidgetProfiler products={products} />
          </section>
        )}

        {activeTab === 'digital' && (
          <section className="animate-fade-in">
            <DigitalFidgets />
          </section>
        )}

        {activeTab === 'breathing' && (
          <section className="animate-fade-in">
            <BreathingGuide />
          </section>
        )}

        {/* Mon Havre de Paix - Calm Stats Dashboard */}
        <section className="mt-20 border-t border-spoolio-dark-border/40 pt-12 max-w-4xl mx-auto w-full select-none text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-spoolio-pink/30 bg-spoolio-pink/10 text-xs font-semibold text-spoolio-pink mb-4">
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>Mon Havre de Paix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">Ton Énergie Apaisée</h2>
          <p className="text-xs sm:text-sm text-spoolio-text-muted mt-1 max-w-md mx-auto">
            Chaque micro-pause et chaque respiration compte. Découvre l'énergie anti-stress que tu as libérée :
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-spoolio-dark-card border border-spoolio-dark-border/60 p-5 rounded-2xl">
              <span className="text-2xl font-black text-white font-mono block">{stats.clicks}</span>
              <span className="text-[10px] font-bold text-spoolio-text-muted uppercase tracking-widest mt-1 block">Pressions / Clics</span>
            </div>
            <div className="bg-spoolio-dark-card border border-spoolio-dark-border/60 p-5 rounded-2xl">
              <span className="text-2xl font-black text-white font-mono block">{stats.pops}</span>
              <span className="text-[10px] font-bold text-spoolio-text-muted uppercase tracking-widest mt-1 block">Bulles Éclatées</span>
            </div>
            <div className="bg-spoolio-dark-card border border-spoolio-dark-border/60 p-5 rounded-2xl">
              <span className="text-2xl font-black text-white font-mono block">{stats.twangs}</span>
              <span className="text-[10px] font-bold text-spoolio-text-muted uppercase tracking-widest mt-1 block">Vibrations Élastiques</span>
            </div>
            <div className="bg-spoolio-dark-card border border-spoolio-dark-border/60 p-5 rounded-2xl">
              <span className="text-2xl font-black text-white font-mono block">
                {Math.floor(stats.breathingSeconds / 60)}m {stats.breathingSeconds % 60}s
              </span>
              <span className="text-[10px] font-bold text-spoolio-text-muted uppercase tracking-widest mt-1 block">Respiration Zen</span>
            </div>
          </div>

          {/* Motivational ADHD Affirmation */}
          <div className="mt-8 text-xs font-semibold italic text-spoolio-text-muted/80 bg-slate-900/40 py-3 px-6 rounded-xl inline-block max-w-lg">
            {stats.breathingSeconds > 0 || stats.clicks > 0 || stats.pops > 0 || stats.twangs > 0 ? (
              <span>✨ "Tu as pris un vrai moment pour te recentrer aujourd'hui. Ton cerveau te remercie."</span>
            ) : (
              <span>✨ "Explore les fidgets et prends de grandes inspirations pour commencer à apaiser ton esprit."</span>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-spoolio-dark-border/40 text-center relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <p className="text-xs text-spoolio-text-muted">
          &copy; {new Date().getFullYear()} Spoolio. Conçu avec attention pour les cerveaux TDAH & neuroatypiques.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/a-propos"
            className="text-xs text-spoolio-text-muted hover:text-spoolio-pink hover:underline transition-colors"
          >
            À propos & Démarche
          </Link>
          <a
            href="https://spoolio.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-spoolio-text-muted hover:text-spoolio-blue hover:underline transition-colors"
          >
            Retourner sur spoolio.fr
          </a>
        </div>
      </footer>
    </div>
  );
}
