import React, { useState } from 'react';
import { AnimeItem, GENRE_CATEGORIES } from '../data/animeData';
import { AnimeImage } from '../components/AnimeImage';
import { Layers, Play, Info } from 'lucide-react';

interface GenresPageProps {
  animeList: AnimeItem[];
  initialGenre?: string | null;
  onSelectAnime: (anime: AnimeItem) => void;
}

export const GenresPage: React.FC<GenresPageProps> = ({
  animeList,
  initialGenre = null,
  onSelectAnime,
}) => {
  const [activeGenre, setActiveGenre] = useState<string>(initialGenre || 'All');

  const allGenresList = ['All', ...GENRE_CATEGORIES.map((g) => g.id), 'Sports', 'Supernatural'];

  const filteredList = animeList.filter((anime) => {
    if (activeGenre === 'All') return true;
    return anime.genres.some((g) => g.toLowerCase() === activeGenre.toLowerCase());
  });

  const activeGenreMeta = GENRE_CATEGORIES.find((g) => g.id.toLowerCase() === activeGenre.toLowerCase());

  return (
    <div className="pt-24 pb-20 bg-[#080A09] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#262D28] pb-10 mb-10 pt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101411] border border-[#262D28] text-xs font-semibold text-[#39E66B] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#39E66B]" />
            <span className="uppercase tracking-widest text-[11px]">Thematic Catalog</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F5F7F5] tracking-tight">
                Explore by Genre
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#A0AAA2] max-w-2xl">
                Dive deep into specific storytelling corridors — from high-adrenaline shonen clashes to atmospheric psychological mysteries.
              </p>
            </div>

            {/* Counter */}
            <div className="px-3.5 py-2 rounded-xl bg-[#101411] border border-[#262D28] text-xs text-[#A0AAA2]">
              Showing <strong className="text-[#39E66B]">{filteredList.length}</strong> series in{' '}
              <strong className="text-[#F5F7F5]">{activeGenre === 'All' ? 'All Genres' : activeGenre}</strong>
            </div>
          </div>

          {/* Genre Tabs Bar with edge-to-edge scroll on mobile */}
          <div className="mt-8 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none pt-4 border-t border-[#262D28]/60 -mx-4 px-4 sm:mx-0 sm:px-0">
            {allGenresList.map((g) => {
              const isSelected = activeGenre === g;
              const count = g === 'All' ? animeList.length : animeList.filter((a) => a.genres.some((genre) => genre.toLowerCase() === g.toLowerCase())).length;

              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActiveGenre(g)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#39E66B] text-[#080A09] font-bold shadow-sm'
                      : 'bg-[#101411] text-[#A0AAA2] hover:text-[#F5F7F5] border border-[#262D28]'
                  }`}
                >
                  <span>{g}</span>
                  <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-[#080A09]/20 text-[#080A09]' : 'bg-[#151A16] text-[#A0AAA2]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Genre Banner (if specific category selected) */}
        {activeGenreMeta && (
          <div className="relative mb-8 sm:mb-10 rounded-2xl overflow-hidden border border-[#262D28] p-5 sm:p-8 bg-[#101411]">
            <div className="absolute inset-0 z-0 opacity-25">
              <img
                src={activeGenreMeta.bgImage}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter blur-xs"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101411] via-[#101411]/85 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#39E66B]/15 text-[#39E66B] border border-[#39E66B]/30 mb-2 inline-block">
                Featured Corridor
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#F5F7F5]">
                {activeGenreMeta.name} Anime
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#A0AAA2] leading-relaxed">
                {activeGenreMeta.description}
              </p>
            </div>
          </div>
        )}

        {/* Filtered Grid (2 cols on phone, 3 on tablet, 4 on desktop, 5-6 on wide screens) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {filteredList.map((anime) => (
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
              aria-label={`View ${anime.title}`}
              className="group relative flex flex-col bg-[#101411] border border-[#262D28] hover:border-[#39E66B]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#39E66B]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
            >
              {/* Poster 2:3 */}
              <div className="relative aspect-[2/3] w-full bg-[#151A16] overflow-hidden">
                <AnimeImage
                  src={anime.posterUrl}
                  alt={anime.title}
                  aspectRatio="2/3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#080A09]/80 text-[#F5F7F5] border border-[#262D28]">
                    {anime.year}
                  </span>
                </div>

                {/* Hover state */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div className="w-full flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#080A09] bg-[#39E66B] px-2.5 py-1 rounded">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Preview</span>
                    </span>
                    <span className="p-1 bg-[#151A16] text-[#F5F7F5] rounded border border-[#262D28]">
                      <Info className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors truncate">
                    {anime.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {anime.genres.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className={`text-[10px] px-1.5 py-0.2 rounded border ${
                          g.toLowerCase() === activeGenre.toLowerCase()
                            ? 'bg-[#39E66B]/15 text-[#39E66B] border-[#39E66B]/30 font-semibold'
                            : 'bg-[#151A16] text-[#A0AAA2] border-[#262D28]'
                        }`}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#262D28]/60 flex items-center justify-between text-[11px] text-[#A0AAA2]">
                  <span className="truncate">{anime.ratingLabel || 'TV-14'}</span>
                  <span className="text-[#39E66B] font-medium">{anime.episodes || anime.season}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
