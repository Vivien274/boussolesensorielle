'use client';

import React from 'react';
import { Keyboard, Infinity as InfinityIcon, Puzzle, Waves } from 'lucide-react';
import { SensoryCategory } from '../types';

interface FilterOption {
  category: SensoryCategory;
  emoji: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string; // Tailwind border/bg focus classes
  activeColorClass: string;
  shadowClass: string;
}

const filterOptions: FilterOption[] = [
  {
    category: 'cliquer',
    emoji: '⌨️',
    label: 'Cliquer en boucle',
    description: 'Bruits mécaniques, résistance physique',
    icon: Keyboard,
    colorClass: 'hover:border-spoolio-blue hover:text-spoolio-blue border-spoolio-dark-border',
    activeColorClass: 'border-spoolio-blue text-spoolio-blue bg-spoolio-blue/10 ring-2 ring-spoolio-blue/50',
    shadowClass: 'shadow-[0_0_15px_rgba(0,85,255,0.25)]',
  },
  {
    category: 'manipuler',
    emoji: '🐍',
    label: 'Manipuler à l\'infini',
    description: 'Objets articulés, mouvements fluides',
    icon: InfinityIcon,
    colorClass: 'hover:border-spoolio-pink hover:text-spoolio-pink border-spoolio-dark-border',
    activeColorClass: 'border-spoolio-pink text-spoolio-pink bg-spoolio-pink/10 ring-2 ring-spoolio-pink/50',
    shadowClass: 'shadow-[0_0_15px_rgba(255,0,122,0.25)]',
  },
  {
    category: 'resoudre',
    emoji: '🧩',
    label: 'Résoudre un défi',
    description: 'Mécanismes complexes, boîtes secrètes',
    icon: Puzzle,
    colorClass: 'hover:border-emerald-500 hover:text-emerald-400 border-spoolio-dark-border',
    activeColorClass: 'border-emerald-500 text-emerald-400 bg-emerald-500/10 ring-2 ring-emerald-500/50',
    shadowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]',
  },
  {
    category: 'caresser',
    emoji: '🌿',
    label: 'Caresser une texture',
    description: 'Surfaces ondulées, douces ou rugueuses',
    icon: Waves,
    colorClass: 'hover:border-spoolio-yellow hover:text-spoolio-yellow border-spoolio-dark-border',
    activeColorClass: 'border-spoolio-yellow text-spoolio-yellow bg-spoolio-yellow/10 ring-2 ring-spoolio-yellow/50',
    shadowClass: 'shadow-[0_0_15px_rgba(255,230,0,0.25)]',
  },
];

interface SensoryFilterProps {
  selectedCategory: SensoryCategory | null;
  onSelectCategory: (category: SensoryCategory | null) => void;
}

export default function SensoryFilter({
  selectedCategory,
  onSelectCategory,
}: SensoryFilterProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = selectedCategory === option.category;

          return (
            <button
              key={option.category}
              onClick={() => onSelectCategory(isActive ? null : option.category)}
              aria-pressed={isActive}
              className={`
                group relative flex flex-col items-center justify-between p-5 rounded-2xl border-2 text-center
                bg-spoolio-dark-card transition-all duration-300 ease-out cursor-pointer select-none
                outline-hidden focus-visible:ring-3 focus-visible:ring-spoolio-blue
                active:scale-95 sm:hover:-translate-y-1
                ${isActive ? `${option.activeColorClass} ${option.shadowClass}` : option.colorClass}
              `}
            >
              {/* Top Accent Icon & Emoji */}
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-2xl" role="img" aria-hidden="true">
                  {option.emoji}
                </span>
                <div
                  className={`
                    p-2 rounded-xl border transition-colors duration-300
                    ${isActive ? 'bg-transparent border-current' : 'bg-background border-spoolio-dark-border group-hover:border-current'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col items-center mt-2">
                <h3 className="font-bold text-lg tracking-wide group-hover:scale-[1.02] transition-transform duration-200">
                  {option.label}
                </h3>
                <p className="text-xs text-spoolio-text-muted mt-2 leading-relaxed">
                  {option.description}
                </p>
              </div>


            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <div className="flex justify-center mt-6 animate-fade-in">
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-semibold uppercase tracking-wider text-spoolio-text-muted hover:text-foreground hover:underline transition-colors py-2 px-4 rounded-lg bg-spoolio-dark-card/50 border border-spoolio-dark-border/40"
          >
            × Réinitialiser le filtre (Voir tout)
          </button>
        </div>
      )}
    </div>
  );
}
