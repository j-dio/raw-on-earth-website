"use client";

import { useState } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import type { GalleryCategoryName, GalleryItem } from "@/data/gallery";
import { scrollToId } from "@/lib/smooth-scroll";

export default function GallerySection({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: { name: GalleryCategoryName; count: number }[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryName | null>(null);

  // Derive cards to display from the categories list.
  const cards = categories.map((cat) => {
    const firstItem = items.find((item) => item.category === cat.name);
    return {
      ...cat,
      image: firstItem?.thumb,
    };
  });

  const displayedItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <section id="gallery" className="scroll-mt-24 bg-linen">
      {/* SECTION 1 — GALLERY HERO / INTRO */}
      <div className="relative bg-linen text-moss py-32 px-6 md:px-10 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background Image with light overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/gallery/community-02.webp"
            alt="Moments from our community"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-linen/70 via-linen/85 to-linen" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto w-full text-left pt-12 md:pt-24 pb-12 md:pb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-6 h-px bg-moss/40"></span>
            <p className="eyebrow tracking-widest text-sm uppercase">Gallery</p>
          </div>
          <h2 className="t-h2 text-6xl md:text-8xl font-light mb-8">
            Gallery
          </h2>
          <p className="t-body text-ink/80 max-w-md text-lg md:text-xl font-light leading-relaxed">
            Moments, people and experiences<br/>from our community.
          </p>
        </div>
      </div>

      <div className="bg-sand/40 py-20 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-10">
            <div className="max-w-xl">
              <p className="eyebrow tracking-widest text-sm uppercase mb-4 text-moss">Explore by category</p>
              <h3 className="t-h2 text-4xl md:text-6xl text-moss font-light leading-tight">
                Every corner of<br/>the practice
              </h3>
            </div>
            <div className="max-w-md">
              <p className="t-body text-ink/70 leading-relaxed">
                From children discovering their first breath in tree pose, to seasoned
                practitioners moving alone in morning light — RAW on Earth holds
                space for every stage of the journey. Tap a card to explore that world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 — HORIZONTAL SLIDING CARD SECTION */}
      <div className="bg-sand/40 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto pl-6 md:pl-10 relative">
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar style-cards">
            {cards.map((card) => {
              const isActive = selectedCategory === card.name;
              return (
                <button
                  key={card.name}
                  onClick={() => {
                    setSelectedCategory(card.name);
                    /* Through the shared helper, not scrollIntoView: Lenis
                       owns the scroll position and a native smooth scroll
                       animates the same thing at the same time. */
                    setTimeout(() => scrollToId('gallery-grid'), 100);
                  }}
                  className={`flex flex-col flex-shrink-0 w-64 md:w-80 h-[24rem] md:h-[28rem] snap-start rounded-xl overflow-hidden transition-all duration-500 ease-out group border ${
                    isActive ? 'border-moss shadow-md' : 'border-moss/10 shadow-sm hover:shadow-md hover:border-moss/30 hover:-translate-y-1'
                  } bg-linen`}
                >
                  <div className="flex-1 w-full overflow-hidden relative">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className={`shrink-0 p-5 md:p-6 text-left w-full border-t transition-colors duration-500 ${isActive ? 'bg-moss/5 border-moss/20' : 'bg-linen border-moss/10 group-hover:bg-sand/30'}`}>
                    {isActive ? (
                      <p className="text-[0.65rem] tracking-[0.2em] text-moss/70 uppercase mb-1">Active</p>
                    ) : (
                      <p className="text-[0.65rem] tracking-[0.2em] text-moss/50 uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Tap to explore</p>
                    )}
                    <h4 className="text-xl md:text-2xl font-display font-light text-moss">{card.name}</h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3 — CARD DETAIL / IMAGE GALLERY */}
      {selectedCategory && (
        <div id="gallery-grid" className="bg-linen min-h-screen transition-opacity duration-700 ease-in-out relative">
          
          {/* Sticky Compact Category Bar (Mirroring the bottom of the cards) */}
          <div className="sticky top-[68px] md:top-[68px] z-30 bg-linen/95 backdrop-blur-md border-b border-moss/10 py-4 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
              <div className="flex items-center gap-3 md:gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory style-cards">
                {cards.map((card) => {
                  const isActive = selectedCategory === card.name;
                  return (
                    <button
                      key={card.name}
                      onClick={() => {
                        setSelectedCategory(card.name);
                        /* 68 is the shrunk header's height - see CLAUDE.md. */
                        scrollToId('gallery-grid', 68);
                      }}
                      className={`shrink-0 w-48 md:w-56 p-4 text-left rounded-xl border transition-all duration-300 snap-start ${
                        isActive 
                          ? 'border-moss shadow-sm bg-moss/5' 
                          : 'border-moss/10 bg-linen hover:border-moss/30 hover:bg-sand/30 hover:-translate-y-0.5'
                      }`}
                    >
                      {isActive ? (
                        <p className="text-[0.6rem] tracking-[0.15em] text-moss/70 uppercase mb-1">Active</p>
                      ) : (
                        <p className="text-[0.6rem] tracking-[0.15em] text-moss/40 uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore</p>
                      )}
                      <h4 className="text-lg md:text-xl font-display font-light text-moss truncate">{card.name}</h4>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto py-12 md:py-20 px-6 md:px-10">
            <div className="mb-10">
              <h3 className="t-h2 text-moss text-4xl md:text-5xl font-light mb-4">{selectedCategory}</h3>
            </div>
            <GalleryGrid items={displayedItems} />
          </div>
        </div>
      )}
    </section>
  );
}
