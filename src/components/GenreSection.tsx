import React from 'react';
import { GENRE_CATEGORIES } from '../data/animeData';
import { ArrowRight, Compass } from 'lucide-react';

interface GenreSectionProps {
  activeGenre: string | null;
  onSelectGenre: (genre: string) => void;
}

export const GenreSection: React.FC<GenreSectionProps> = ({
  activeGenre,
  onSelectGenre,
}) => {
  const handleGenreClick = (genreId: string) => {
    onSelectGenre(genreId);
    const trendingEl = document.getElementById('trending');
    if (trendingEl) {
      trendingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="genres" className="py-16 md:py-24 bg-[#101411] border-y border-[#262D28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-[#39E66B]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#39E66B]">
              Explore Universes
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5F7F5] tracking-tight">
            Find Your Kind of Story
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#A0AAA2]">
            From sprawling mythological epics to intimate character studies, dive into worlds built to captivate.
          </p>
        </div>

        {/* 6 Genre Tiles Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {GENRE_CATEGORIES.map((genre) => {
            const isSelected = activeGenre === genre.id;

            return (
              <div
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGenreClick(genre.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${genre.name} anime`}
                className={`group relative h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] ${
                  isSelected
                    ? 'border-[#39E66B] shadow-lg shadow-[#39E66B]/10 ring-1 ring-[#39E66B]'
                    : 'border-[#262D28] hover:border-[#39E66B]/50'
                }`}
              >
                {/* Background Image Artwork */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={genre.bgImage}
                    alt={genre.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-45 group-hover:opacity-60"
                  />
                  {/* Gradient mask for readable text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-[#080A09]/75 to-[#080A09]/30" />
                </div>

                {/* Subtle top indicator bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#39E66B]'
                      : 'bg-transparent group-hover:bg-[#39E66B]/60'
                  }`}
                />

                {/* Content Overlay */}
                <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#39E66B] bg-[#151A16]/90 border border-[#262D28] px-2 py-0.5 rounded backdrop-blur-xs">
                      Category
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#151A16]/80 border border-[#262D28] flex items-center justify-center text-[#A0AAA2] group-hover:text-[#39E66B] group-hover:border-[#39E66B]/40 group-hover:translate-x-0.5 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors">
                      {genre.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#A0AAA2] line-clamp-2 leading-relaxed">
                      {genre.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
