import React, { useRef } from 'react';
import { AnimeItem } from '../data/animeData';
import { AnimeImage } from './AnimeImage';
import { ChevronLeft, ChevronRight, Play, Info, Sparkles, X } from 'lucide-react';

interface TrendingSectionProps {
  animeList: AnimeItem[];
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
  onSelectAnime: (anime: AnimeItem) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  animeList,
  selectedGenre,
  onSelectGenre,
  onSelectAnime,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Filter based on selectedGenre if active
  const filteredList = selectedGenre
    ? animeList.filter((item) =>
        item.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      )
    : animeList;

  return (
    <section id="trending" className="py-16 md:py-24 bg-[#080A09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-[#39E66B] rounded-full inline-block" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#39E66B]">
                Curated Streaming
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5F7F5] tracking-tight">
              Trending Now
            </h2>
          </div>

          {/* Right controls: Genre indicator & horizontal navigation buttons */}
          <div className="flex items-center gap-3">
            {selectedGenre && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#151A16] border border-[#39E66B]/30 rounded-full text-xs text-[#F5F7F5]">
                <span>Filter: <strong>{selectedGenre}</strong></span>
                <button
                  type="button"
                  onClick={() => onSelectGenre(null)}
                  className="p-0.5 hover:text-[#39E66B] rounded-full transition-colors"
                  aria-label="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Scroll buttons for desktop */}
            <div className="hidden sm:flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="p-2 text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] border border-[#262D28] rounded-full transition-colors focus:outline-none focus-visible:border-[#39E66B]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="p-2 text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] border border-[#262D28] rounded-full transition-colors focus:outline-none focus-visible:border-[#39E66B]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Anime Cards Row - Scrollable & Responsive */}
        {filteredList.length === 0 ? (
          <div className="bg-[#101411] border border-[#262D28] rounded-xl p-12 text-center">
            <p className="text-[#A0AAA2] mb-3">No series found matching the selected category.</p>
            <button
              onClick={() => onSelectGenre(null)}
              className="px-4 py-2 text-sm font-semibold bg-[#39E66B] text-[#080A09] rounded-md hover:bg-[#20C45A] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 sm:space-x-5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            tabIndex={0}
            aria-label="Trending anime list"
          >
            {filteredList.map((anime, idx) => (
              <div
                key={anime.id}
                onClick={() => onSelectAnime(anime)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectAnime(anime);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${anime.title}`}
                className="group flex-shrink-0 w-44 sm:w-52 md:w-56 lg:w-60 snap-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] rounded-lg transition-transform duration-200"
              >
                {/* Poster Container */}
                <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#151A16] border border-[#262D28] group-hover:border-[#39E66B]/50 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-[#39E66B]/5">
                  <AnimeImage
                    src={anime.posterUrl}
                    alt={anime.title}
                    aspectRatio="2/3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Top badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                    {idx < 3 && !selectedGenre ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-[#080A09]/90 text-[#39E66B] border border-[#39E66B]/30 backdrop-blur-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Top {idx + 1}
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-[#080A09]/80 text-[#A0AAA2] border border-[#262D28]">
                        {anime.year}
                      </span>
                    )}

                    {anime.ratingLabel && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-[#151A16]/90 text-[#A0AAA2] border border-[#262D28]">
                        {anime.ratingLabel}
                      </span>
                    )}
                  </div>

                  {/* Dark gradient on hover bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div className="w-full flex items-center justify-between">
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#080A09] bg-[#39E66B] px-2.5 py-1 rounded">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Preview</span>
                      </span>
                      <span className="p-1.5 bg-[#151A16]/90 text-[#F5F7F5] rounded hover:text-[#39E66B] border border-[#262D28]">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Info Below Poster */}
                <div className="mt-2.5 space-y-1">
                  <h3 className="text-sm sm:text-base font-semibold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors truncate">
                    {anime.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-[#A0AAA2]">
                    <span className="truncate max-w-[130px]">
                      {anime.genres.slice(0, 2).join(', ')}
                    </span>
                    <span className="text-[11px] text-[#A0AAA2]/80 flex-shrink-0">
                      {anime.episodes || anime.season}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
