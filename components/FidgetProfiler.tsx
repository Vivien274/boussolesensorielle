'use client';

import React, { useState } from 'react';
import { track } from '@vercel/analytics';
import { ShoppingCart, ExternalLink, ArrowRight, ArrowLeft, RotateCcw, Brain, ShieldAlert, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { FidgetProduct, SensoryCategory } from '../types';

interface FidgetProfilerProps {
  products: FidgetProduct[];
}

interface QuizAnswers {
  profile: 'tdah' | 'anxiety' | 'autism' | 'focus' | null;
  context: 'silent' | 'free' | 'nomad' | null;
  gesture: 'click' | 'flow' | 'touch' | 'solve' | null;
}

const profileOptions = [
  {
    id: 'tdah' as const,
    title: '🧠 TDAH / Hyperactivité',
    desc: 'Besoin de canaliser un surplus moteur, de bouger les mains pour rester attentif.'
  },
  {
    id: 'anxiety' as const,
    title: '🌿 Stress / Anxiété',
    desc: 'Besoin de réconfort tactile pour évacuer les tensions ou apaiser le stress.'
  },
  {
    id: 'autism' as const,
    title: '🌀 Autisme / Stimming',
    desc: 'Autostimulation sensorielle répétitive, régulation en cas de surcharge cognitive.'
  },
  {
    id: 'focus' as const,
    title: '🎯 DYS / Concentration',
    desc: 'Besoin d\'un ancrage physique discret pour rester focus lors de tâches passives.'
  }
];

const contextOptions = [
  {
    id: 'silent' as const,
    title: '🏫 Classe / Bureau',
    desc: 'Silence total exigé. Pas de bruit mécanique pour respecter ton entourage.'
  },
  {
    id: 'free' as const,
    title: '🏠 Maison / Solo',
    desc: 'Bruit libre ! Clics francs et engrenages audibles ne posent aucun problème.'
  },
  {
    id: 'nomad' as const,
    title: '🚌 Transports / Voyage',
    desc: 'Format compact et discret requis, facile à transporter dans la poche.'
  }
];

const gestureOptions = [
  {
    id: 'click' as const,
    title: '🎯 Cliquer',
    desc: 'Boutons poussoirs, touches, sensation d\'activation mécanique instantanée.'
  },
  {
    id: 'flow' as const,
    title: '🐍 Manipuler',
    desc: 'Mouvements fluides, articulations souples, rotations et torsions infinies.'
  },
  {
    id: 'touch' as const,
    title: '🌊 Caresser',
    desc: 'Sensations de frottement, pics d\'acupression ou textures en relief.'
  },
  {
    id: 'solve' as const,
    title: '🧩 Résoudre',
    desc: 'Engrenages imbriqués, mini-casse-têtes mécaniques de concentration.'
  }
];

const profileBadges = {
  tdah: {
    title: "Le Canalisateur Tactile",
    desc: "Ton cerveau a besoin d'un mouvement de fond pour libérer l'hyperactivité motrice et ancrer l'attention. Les fidgets articulés ou mécaniques sont tes meilleurs alliés."
  },
  anxiety: {
    title: "L'Apaisé Sensoriel",
    desc: "Tu cherches un refuge tactile et un rythme pour calmer ton système nerveux. Privilégie les textures douces, les pics d'acupression et les pressions rassurantes."
  },
  autism: {
    title: "L'Harmonisé en Stimming",
    desc: "Le stimming t'aide à te réguler et à éviter les surcharges. Les mouvements géométriques infinis et les retours sensoriels réguliers sont idéaux."
  },
  focus: {
    title: "Le Focaliseur Ancré",
    desc: "Ton focus augmente quand tes doigts ont une occupation discrète et automatique. Les objets silencieux de poche te permettront de rester dans ta zone."
  }
};

export default function FidgetProfiler({ products }: FidgetProfilerProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    profile: null,
    context: null,
    gesture: null
  });

  // Local synthesizer of satisfying blip sounds to reward button selections
  const triggerAudioBlip = (freq: number = 300, duration: number = 0.05) => {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq / 2, audioCtx.currentTime + duration);
      
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  };

  const handleSelectOption = (key: keyof QuizAnswers, value: any) => {
    triggerAudioBlip(350, 0.06);
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    triggerAudioBlip(440, 0.08);
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else if (step === 3) {
      // Calculate & log completion
      try {
        track('diagnostic_completed', {
          profile: answers.profile,
          context: answers.context,
          gesture: answers.gesture
        });
      } catch (e) {}
      setStep(4);
    }
  };

  const handleBack = () => {
    triggerAudioBlip(280, 0.08);
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const handleReset = () => {
    triggerAudioBlip(220, 0.1);
    setAnswers({ profile: null, context: null, gesture: null });
    setStep(1);
  };

  // Recommendation engine
  const getRecommendations = () => {
    const scored = products.map((product) => {
      let score = 50; // base score
      let reasons: string[] = [];

      // 1. Profile Match
      if (answers.profile && product.profiles.includes(answers.profile)) {
        score += 20;
        reasons.push("Recommandé pour ton profil d'attention");
      }

      // 2. Context Match (Noise and Size constraints)
      if (answers.context === 'silent') {
        if (product.noiseLevel === 'high') {
          score -= 50;
        } else if (product.noiseLevel === 'medium') {
          score -= 25;
        } else if (product.noiseLevel === 'silent') {
          score += 15;
          reasons.push("Totalement silencieux (bureau/classe compatible)");
        } else {
          score += 5;
        }
      } else if (answers.context === 'nomad') {
        if (product.size === 'large') {
          score -= 25;
        } else if (product.size === 'pocket') {
          score += 15;
          reasons.push("Format poche nomade et discret");
        }
      } else if (answers.context === 'free') {
        if (product.noiseLevel === 'high' || product.noiseLevel === 'medium') {
          score += 10;
          reasons.push("Retour mécanique franc idéal pour la maison");
        }
      }

      // 3. Gesture Match
      const categoryMapping = {
        click: 'cliquer',
        flow: 'manipuler',
        touch: 'caresser',
        solve: 'resoudre'
      };
      if (answers.gesture && product.category === categoryMapping[answers.gesture]) {
        score += 25;
        reasons.push("Geste physique idéal selon tes préférences");
      }

      const finalScore = Math.max(0, Math.min(100, score));
      const reasonText = reasons.length > 0 
        ? reasons[reasons.length - 1]
        : "Excellent équilibre sensoriel général";

      return {
        product,
        score: finalScore,
        reason: reasonText
      };
    });

    // Sort by score descending and return top 3
    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const currentProfileInfo = answers.profile ? profileBadges[answers.profile] : null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 select-none">
      
      {/* Questionnaire Wizard */}
      {step < 4 ? (
        <div className="bg-spoolio-dark-card border border-spoolio-dark-border p-6 sm:p-8 rounded-3xl space-y-8 shadow-xl animate-fade-in relative overflow-hidden">
          
          {/* Header Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-spoolio-text-muted uppercase tracking-wider">
              <span>Étape {step} sur 3</span>
              <span>{Math.round((step - 1) * 33.3)}% Complété</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-spoolio-dark-border/20">
              <div 
                className="h-full bg-gradient-to-r from-spoolio-blue to-spoolio-pink transition-all duration-500 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: PROFIL */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">Quel est ton profil ou besoin principal ?</h2>
                <p className="text-xs sm:text-sm text-spoolio-text-muted">Choisis ce qui décrit le mieux ce que tu cherches à réguler.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption('profile', opt.id)}
                    className={`
                      p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer active:scale-98
                      ${answers.profile === opt.id 
                        ? 'border-spoolio-blue bg-spoolio-blue/10 text-white ring-2 ring-spoolio-blue/30 shadow-md shadow-spoolio-blue/10' 
                        : 'border-spoolio-dark-border bg-slate-950/40 text-spoolio-text-muted hover:border-spoolio-blue/40 hover:text-white'
                      }
                    `}
                  >
                    <h3 className="font-bold text-sm tracking-wide mb-1 text-white">{opt.title}</h3>
                    <p className="text-xs text-spoolio-text-muted leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CONTEXT */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">Dans quel contexte utiliseras-tu ton Fidget ?</h2>
                <p className="text-xs sm:text-sm text-spoolio-text-muted">Détermine le niveau sonore et de discrétion nécessaire.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contextOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption('context', opt.id)}
                    className={`
                      p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer active:scale-98 flex flex-col justify-between h-full
                      ${answers.context === opt.id 
                        ? 'border-spoolio-pink bg-spoolio-pink/10 text-white ring-2 ring-spoolio-pink/30 shadow-md shadow-spoolio-pink/10' 
                        : 'border-spoolio-dark-border bg-slate-950/40 text-spoolio-text-muted hover:border-spoolio-pink/40 hover:text-white'
                      }
                    `}
                  >
                    <div>
                      <h3 className="font-bold text-sm tracking-wide mb-1 text-white">{opt.title}</h3>
                      <p className="text-xs text-spoolio-text-muted leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: GESTURE */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">Quel type de geste te détend le plus ?</h2>
                <p className="text-xs sm:text-sm text-spoolio-text-muted">Choisis l'action motrice qui te soulage le plus naturellement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gestureOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption('gesture', opt.id)}
                    className={`
                      p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer active:scale-98
                      ${answers.gesture === opt.id 
                        ? 'border-spoolio-yellow bg-spoolio-yellow/10 text-white ring-2 ring-spoolio-yellow/30 shadow-md shadow-spoolio-yellow/10' 
                        : 'border-spoolio-dark-border bg-slate-950/40 text-spoolio-text-muted hover:border-spoolio-yellow/40 hover:text-white'
                      }
                    `}
                  >
                    <h3 className="font-bold text-sm tracking-wide mb-1 text-white">{opt.title}</h3>
                    <p className="text-xs text-spoolio-text-muted leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation controls */}
          <div className="flex justify-between items-center pt-4 border-t border-spoolio-dark-border/40">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`
                flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer select-none active:scale-95
                ${step === 1 
                  ? 'opacity-30 cursor-not-allowed text-spoolio-text-muted' 
                  : 'text-spoolio-text-muted hover:text-white border border-spoolio-dark-border hover:bg-slate-950'
                }
              `}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>

            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !answers.profile) ||
                (step === 2 && !answers.context) ||
                (step === 3 && !answers.gesture)
              }
              className={`
                flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer select-none active:scale-95
                ${((step === 1 && !answers.profile) || (step === 2 && !answers.context) || (step === 3 && !answers.gesture))
                  ? 'opacity-30 cursor-not-allowed bg-slate-900 text-spoolio-text-muted'
                  : 'bg-spoolio-blue hover:bg-spoolio-blue-hover text-white shadow-md'
                }
              `}
            >
              <span>{step === 3 ? 'Voir les Fidgets' : 'Continuer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* STEP 4: RESULTS PAGE */
        <div className="space-y-10 animate-fade-in">
          
          {/* Badge & profile presentation */}
          <div className="bg-gradient-to-r from-spoolio-blue/15 to-spoolio-pink/15 border border-spoolio-dark-border p-8 rounded-3xl text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-spoolio-blue to-spoolio-pink flex items-center justify-center mx-auto text-white">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-spoolio-pink tracking-widest block">Ton Profil Sensoriel :</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{currentProfileInfo?.title}</h2>
            </div>
            
            <p className="text-sm text-spoolio-text-muted max-w-xl mx-auto leading-relaxed">
              {currentProfileInfo?.desc}
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spoolio-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refaire le diagnostic</span>
            </button>
          </div>

          {/* Recommended products */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-lg border-b border-spoolio-dark-border/20 pb-3 flex items-center gap-2 select-none">
              <Sparkles className="w-4 h-4 text-spoolio-yellow" />
              <span>Tes 3 Fidgets Recommandés Spoolio :</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getRecommendations().map(({ product, score, reason }) => (
                <article
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-spoolio-dark-border bg-spoolio-dark-card transition-all duration-300 hover:border-spoolio-dark-border/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                >
                  
                  {/* Image container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                    
                    {/* Compatibility percentage tag */}
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-slate-950/80 border border-green-500/40 text-[10px] font-black text-green-400 backdrop-blur-md">
                      🔋 Match à {score}%
                    </div>

                    {/* Price tag */}
                    <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-spoolio-yellow text-background font-black text-xs">
                      {product.price}
                    </div>

                    {/* Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-spoolio-dark-card via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Body details */}
                  <div className="flex flex-col flex-grow p-5 space-y-4">
                    <div className="space-y-1.5 flex-grow">
                      <h4 className="font-bold text-base text-white leading-tight tracking-wide group-hover:text-spoolio-blue transition-colors duration-200">
                        {product.name}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-spoolio-text-muted">
                        {product.description}
                      </p>
                    </div>

                    {/* Custom score match reason */}
                    <div className="bg-slate-950/40 border border-spoolio-dark-border/40 p-2.5 rounded-xl text-[10px] text-white/80 flex items-start gap-1.5 select-none leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-spoolio-blue shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>

                    {/* Action buy button */}
                    <a
                      href={product.wooCommerceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        try {
                          track('product_checkout_click', {
                            productId: product.id,
                            productName: product.name,
                            category: product.category,
                            price: product.price,
                            source: 'diagnostic'
                          });
                        } catch (e) {}
                      }}
                      className="
                        flex items-center justify-center gap-1.5 w-full py-3 px-4 rounded-xl
                        font-bold text-xs tracking-wider uppercase transition-all duration-300
                        bg-spoolio-blue hover:bg-spoolio-blue-hover text-white shadow-md active:scale-98
                      "
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Personnaliser</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>

                </article>
              ))}
            </div>

            <div className="text-center pt-4 select-none">
              <p className="text-xs text-spoolio-text-muted">
                Tous les Fidgets recommandés sont imprimés en 3D en France à la demande, en amidon de maïs recyclé et durable. 🌍
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
