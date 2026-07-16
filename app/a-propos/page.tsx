'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Heart, Award, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export default function AboutPage() {
  const [virtualClicks, setVirtualClicks] = useState(0);

  // Sync virtual clicks from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('spoolio_calm_stats');
        if (saved) {
          const parsed = JSON.parse(saved);
          setVirtualClicks(parsed.clicks || 0);
        }
      } catch (e) {}
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background text-foreground select-none">
      
      {/* Dynamic Background glow rings */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-spoolio-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-spoolio-pink/5 blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-spoolio-dark-border/40 relative z-10">
        <Link href="/" className="cursor-pointer">
          <img
            src="https://spoolio.fr/wp-content/uploads/2025/04/LogoSpoolio_White-long.png"
            alt="Spoolio Logo"
            className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
          />
        </Link>

        {/* Back to Compass button */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-spoolio-dark-border bg-spoolio-dark-card hover:bg-slate-900 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>🧭 Boussole</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 sm:py-16 relative z-10">
        
        {/* Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-spoolio-blue/30 bg-spoolio-blue/10 text-xs font-semibold text-spoolio-blue mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>Notre Philosophie & Démarche</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wide leading-tight">
            Conçu par un TDAH,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spoolio-blue via-violet-400 to-spoolio-pink">
              pour la neurodiversité.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-spoolio-text-muted mt-4">
            Découvre l'histoire de Spoolio et pourquoi nos fidgets ne sont pas de simples jouets, mais des outils indispensables de focalisation.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
          
          {/* Main text column (Left 2 cols) */}
          <div className="md:col-span-2 space-y-6 text-sm sm:text-base text-spoolio-text-muted leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-black text-white">Mon histoire, notre histoire</h2>
            
            <p>
              Salut, moi c'est <strong className="font-bold text-white">Vivien</strong>, le créateur de Spoolio. Étant moi-même <strong className="font-bold text-white">TDAH (Trouble du Déficit de l'Attention avec Hyperactivité)</strong>, j'ai passé ma vie à faire gigoter mes jambes, à faire tourner mes stylos et à tripoter tout ce qui me tombait sous la main pour réussir à me concentrer.
            </p>
            
            <p>
              Quand j'ai découvert l'impression 3D, j'ai réalisé qu'on pouvait créer des objets mécaniques uniques, légers et dotés de textures incroyables. J'ai commencé à modéliser des fidgets pour mes propres besoins.
            </p>

            <p>
              Très vite, j'ai partagé ces créations autour de moi, puis sur notre boutique. Les retours ont été immédiats et bouleversants. C'est à ce moment que j'ai réalisé une statistique clé :
            </p>

            {/* Glowing quote box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-spoolio-pink/15 to-violet-500/10 border border-spoolio-pink/30 text-white font-semibold">
              📈 "Plus de 75% des personnes qui achètent nos fidgets sur Spoolio le font pour répondre à des besoins neuroatypiques directs : TDAH, autisme, troubles DYS, anxiété généralisée ou surcharge sensorielle."
            </div>

            <p>
              Ce n'est plus du simple divertissement. Pour nous, avoir un fidget au creux de la main est un régulateur de tensions et une aide précieuse pour ancrer notre attention dans le présent.
            </p>
          </div>

          {/* Side stats card (Right 1 col) */}
          <div className="bg-spoolio-dark-card border border-spoolio-dark-border p-6 rounded-3xl space-y-6 md:sticky md:top-6">
            <div className="space-y-1">
              <span className="text-3xl font-black text-spoolio-pink font-mono block">75%</span>
              <span className="text-xs font-bold text-white uppercase block">Besoins Neuro-divergents</span>
              <p className="text-[11px] text-spoolio-text-muted mt-0.5 leading-snug">
                De nos clients utilisent Spoolio pour le TDAH, l'autisme, les DYS ou l'anxiété.
              </p>
            </div>

            <div className="border-t border-spoolio-dark-border/40 pt-4 space-y-1">
              <span className="text-3xl font-black text-[#00f5ff] font-mono block">100%</span>
              <span className="text-xs font-bold text-white uppercase block">Fabriqué en France</span>
              <p className="text-[11px] text-spoolio-text-muted mt-0.5 leading-snug">
                Imprimé en 3D de manière artisanale avec du plastique végétal à base d'amidon de maïs.
              </p>
            </div>

            <div className="border-t border-spoolio-dark-border/40 pt-4 space-y-1">
              <span className="text-3xl font-black text-spoolio-yellow font-mono block">DOUZAINES</span>
              <span className="text-xs font-bold text-white uppercase block">Heures de Recherche</span>
              <p className="text-[11px] text-spoolio-text-muted mt-0.5 leading-snug">
                De tests pour affiner les clics, le glissement et le poids de chaque engrenage.
              </p>
            </div>
          </div>

        </div>

        {/* Our Approach Section */}
        <section className="mb-16 border-t border-spoolio-dark-border/40 pt-12">
          <h2 className="text-xl sm:text-2xl font-black text-white text-center mb-8">
            Pourquoi nos fidgets sont uniques ?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-spoolio-dark-card/50 border border-spoolio-dark-border/60 hover:border-spoolio-blue/40 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-spoolio-blue shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">Ergonomie Sensorielle</h3>
                  <p className="text-xs text-spoolio-text-muted mt-1 leading-relaxed">
                    Nous travaillons le retour haptique de nos objets. La texture finale de l'impression 3D apporte un relief apaisant et un stimulus inégalé pour les doigts.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-spoolio-dark-card/50 border border-spoolio-dark-border/60 hover:border-spoolio-pink/40 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-spoolio-pink shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">Recherche et Prototypage</h3>
                  <p className="text-xs text-spoolio-text-muted mt-1 leading-relaxed">
                    Un bon fidget ne s'improvise pas. Nous passons des dizaines d'heures à modifier l'épaisseur d'une bague ou la tension d'un ressort 3D pour trouver le retour parfait.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-spoolio-dark-card/50 border border-spoolio-dark-border/60 hover:border-spoolio-yellow/40 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-spoolio-yellow shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">Acoustique Maîtrisée</h3>
                  <p className="text-xs text-spoolio-text-muted mt-1 leading-relaxed">
                    Que ce soit le "clack" franc d'un clavier mécanique pour s'isoler ou le roulement silencieux d'un cube articulé pour la classe, chaque son est pensé pour respecter ton environnement.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-spoolio-dark-card/50 border border-spoolio-dark-border/60 hover:border-[#00f5ff]/40 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00f5ff] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">Responsable & Durable</h3>
                  <p className="text-xs text-spoolio-text-muted mt-1 leading-relaxed">
                    Chaque objet est fabriqué à la demande dans notre atelier en France. Nous utilisons du PLA biodégradable et compostable industriellement, réduisant notre empreinte écologique.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Conclusion / Link back */}
        <div className="text-center bg-slate-900/30 p-8 rounded-3xl border border-spoolio-dark-border/60">
          <Award className="w-8 h-8 text-spoolio-yellow mx-auto mb-4" />
          <h3 className="font-bold text-white text-lg">Trouve ton Fidget Idéal</h3>
          <p className="text-xs sm:text-sm text-spoolio-text-muted mt-1 max-w-md mx-auto">
            Nous avons créé la Boussole Sensorielle pour t'aider à associer ton type de besoin sensoriel au fidget parfait.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-2xl bg-spoolio-pink text-white font-bold text-sm tracking-wide uppercase transition-all hover:bg-pink-600 active:scale-95 shadow-lg shadow-spoolio-pink/20 cursor-pointer"
          >
            <span>🧭 Essayer la Boussole Sensorielle</span>
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-spoolio-dark-border/40 text-center flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <p className="text-xs text-spoolio-text-muted">
          &copy; {new Date().getFullYear()} Spoolio. Conçu avec attention pour les cerveaux TDAH & neuroatypiques.
        </p>
        <div className="flex items-center gap-6">
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
