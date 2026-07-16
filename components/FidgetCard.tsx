'use client';

import React from 'react';
import { ShoppingCart, Keyboard, Infinity as InfinityIcon, Puzzle, Waves, ExternalLink } from 'lucide-react';
import { track } from '@vercel/analytics';
import { FidgetProduct } from '../types';

interface FidgetCardProps {
  product: FidgetProduct;
}

const categoryMeta = {
  cliquer: {
    label: 'Cliquer',
    icon: Keyboard,
    colorClass: 'bg-spoolio-blue/20 text-blue-300 border-spoolio-blue/30',
  },
  manipuler: {
    label: 'Manipuler',
    icon: InfinityIcon,
    colorClass: 'bg-spoolio-pink/20 text-pink-300 border-spoolio-pink/30',
  },
  resoudre: {
    label: 'Résoudre',
    icon: Puzzle,
    colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  caresser: {
    label: 'Caresser',
    icon: Waves,
    colorClass: 'bg-spoolio-yellow/20 text-yellow-200 border-spoolio-yellow/30',
  },
};

export default function FidgetCard({ product }: FidgetCardProps) {
  const meta = categoryMeta[product.category] || {
    label: product.category,
    icon: Puzzle,
    colorClass: 'bg-slate-700/50 text-slate-300 border-slate-600',
  };
  const IconComponent = meta.icon;

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-spoolio-dark-border bg-spoolio-dark-card transition-all duration-300 hover:border-spoolio-dark-border/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
      style={{
        viewTransitionName: `fidget-card-${product.id}`,
      } as React.CSSProperties}
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all duration-300 group-hover:scale-105 shadow-md select-none bg-background/80 border-spoolio-dark-border">
          <IconComponent className="w-3.5 h-3.5" />
          <span>{meta.label}</span>
        </div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-spoolio-yellow text-background font-black text-sm shadow-md select-none">
          {product.price}
        </div>

        {/* Product Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-spoolio-dark-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-foreground leading-tight tracking-wide group-hover:text-spoolio-blue transition-colors duration-200">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-spoolio-text-muted flex-grow">
          {product.description}
        </p>

        {/* WooCommerce Direct Action Button */}
        <div className="mt-6">
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
                  price: product.price
                });
              } catch (e) {}
            }}
            className="
              relative flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl
              font-bold text-sm tracking-wider uppercase transition-all duration-300 select-none
              bg-spoolio-blue hover:bg-spoolio-blue-hover text-white shadow-lg active:scale-98
              outline-hidden focus-visible:ring-3 focus-visible:ring-spoolio-yellow
            "
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Personnaliser & Acheter</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
