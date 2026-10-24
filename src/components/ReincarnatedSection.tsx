import React, { useState } from 'react';
import { AnimeItem, REINCARNATION_CODEX } from '../data/animeData';
import { AnimeImage } from './AnimeImage';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  ChevronRight,
  Star,
  Sparkles,
  Layers
} from 'lucide-react';

interface ReincarnatedSectionProps {
  onSelectAnime: (anime: AnimeItem) => void;
  animeList: AnimeItem[];
}

export const ReincarnatedSection: React.FC<ReincarnatedSectionProps> = ({
  onSelectAnime,
  animeList,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'magic' | 'kingdom' | 'survival' | 'gaming'>('all');
  const [selectedId, setSelectedId] = useState<string>('mushoku-tensei');
  const [watchlist, setWatchlist] = useState<Record<string, boolean>>({});

  const featuredList = REINCARNATION_CODEX.filter((item) => item.featured);
  const activeSeries = REINCARNATION_CODEX.find((item) => item.id === selectedId) || REINCARNATION_CODEX[0];

  const categoryTabs = [
    { id: 'all', label: 'All Chronicles', count: REINCARNATION_CODEX.length },
    { id: 'magic', label: 'Magic & Prodigies', count: REINCARNATION_CODEX.filter(a => a.category === 'magic').length },
    { id: 'kingdom', label: 'Kingdom & Empires', count: REINCARNATION_CODEX.filter(a => a.category === 'kingdom').length },
    { id: 'survival', label: 'Dark Survival', count: REINCARNATION_CODEX.filter(a => a.category === 'survival').length },
    { id: 'gaming', label: 'MMO Rebirth', count: REINCARNATION_CODEX.filter(a => a.category === 'gaming').length },
  ] as const;

  const filteredCatalog = REINCARNATION_CODEX.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleOpenAnime = (seriesId: string) => {
    const existing = animeList.find((a) => a.id === seriesId);
    if (existing) {
      onSelectAnime(existing);
      return;
    }
    const fallback = REINCARNATION_CODEX.find((s) => s.id === seriesId);
    if (fallback) {
      onSelectAnime({
        id: fallback.id,
        title: fallback.title,
        originalTitle: fallback.originalTitle,
        posterUrl: fallback.posterUrl,
        bannerUrl: fallback.bannerUrl,
        genres: ['Isekai', 'Fantasy', fallback.categoryLabel],
        year: fallback.year,
        episodes: fallback.episodes,
        studio: fallback.studio,
        ratingLabel: fallback.ratingLabel,
        synopsis: fallback.synopsis,
      });
    }
  };

  const toggleWatchlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWatchlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="isekai" className="py-16 md:py-24 bg-[#080A09] border-y border-[#262D28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =====================================================================
            1. SECTION HEADER
           ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-[#39E66B] rounded-full inline-block" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#39E66B]">
                Curated Collection • 異世界転生
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5F7F5] tracking-tight">
              Reincarnated in Another World
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A0AAA2] max-w-2xl">
              Awaken in uncharted realms with extraordinary abilities, legendary grimoires, and empires waiting to be built.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none self-start md:self-auto -mx-4 px-4 md:mx-0 md:px-0">
            {categoryTabs.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#39E66B] text-[#080A09] font-bold shadow-sm shadow-[#39E66B]/20'
                      : 'bg-[#101411] text-[#A0AAA2] border border-[#262D28] hover:text-[#F5F7F5] hover:border-[#39E66B]/40'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono px-1 rounded ${
                    isSelected ? 'bg-[#080A09]/20 text-[#080A09]' : 'bg-[#151A16] text-[#A0AAA2]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            2. SPLIT-SURFACE CINEMATIC SHOWCASE (CLEAN, SPACIOUS, ZERO CLASH)
           ===================================================================== */}
        <div className="mb-6 rounded-2xl bg-[#0D110E] border border-[#262D28] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column (5 of 12 cols): Structured Editorial & Information */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262D28] bg-gradient-to-br from-[#101511] to-[#0A0D0A]">
              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#39E66B]/15 border border-[#39E66B]/30 text-[#39E66B] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Spotlight
                  </span>
                  <span className="text-xs text-[#A0AAA2] bg-[#151A16] px-2 py-0.5 rounded border border-[#262D28]">
                    {activeSeries.categoryLabel}
                  </span>
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#A0AAA2] mb-3">
                  <span className="flex items-center gap-1 text-[#39E66B] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#39E66B]" />
                    {activeSeries.rating}
                  </span>
                  <span>•</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#151A16] border border-[#262D28] text-[10px] font-bold text-[#F5F7F5]">
                    {activeSeries.ratingLabel}
                  </span>
                  <span>•</span>
                  <span>{activeSeries.year}</span>
                  <span>•</span>
                  <span>{activeSeries.episodes}</span>
                  <span>•</span>
                  <span>{activeSeries.studio}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7F5] tracking-tight leading-tight">
                  {activeSeries.title}
                </h3>
                
                {/* Tagline */}
                <p className="text-xs sm:text-sm font-semibold text-[#39E66B] mt-1.5">
                  {activeSeries.tagline}
                </p>

                {/* Synopsis */}
                <p className="mt-3.5 text-xs sm:text-sm text-[#A0AAA2] leading-relaxed line-clamp-4">
                  {activeSeries.synopsis}
                </p>

                {/* Rebirth Traits Bar */}
                <div className="mt-5 pt-4 border-t border-[#262D28] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#141915] border border-[#262D28]">
                    <div className="text-[10px] uppercase font-bold text-[#A0AAA2] tracking-wider mb-0.5">
                      Vessel Identity
                    </div>
                    <div className="font-semibold text-[#F5F7F5] truncate">
                      {activeSeries.rebornIdentity}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#141915] border border-[#262D28]">
                    <div className="text-[10px] uppercase font-bold text-[#39E66B] tracking-wider mb-0.5">
                      Cheat Ability
                    </div>
                    <div className="font-semibold text-[#39E66B] truncate">
                      {activeSeries.cheatPower}
                    </div>
                  </div>
                </div>
              </div>

              {/* Streaming Action Buttons */}
              <div className="mt-6 pt-5 border-t border-[#262D28] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenAnime(activeSeries.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#39E66B] text-[#080A09] font-bold text-xs sm:text-sm shadow-md shadow-[#39E66B]/20 hover:bg-[#20C45A] hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Episode 1</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenAnime(activeSeries.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151A16] border border-[#262D28] text-[#F5F7F5] hover:border-[#39E66B]/60 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <Info className="w-4 h-4 text-[#39E66B]" />
                  <span>Details</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleWatchlist(e, activeSeries.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    watchlist[activeSeries.id]
                      ? 'bg-[#39E66B]/15 border-[#39E66B] text-[#39E66B]'
                      : 'bg-[#151A16] border-[#262D28] text-[#A0AAA2] hover:text-[#F5F7F5] hover:border-[#39E66B]/40'
                  }`}
                  aria-label="Add to Watchlist"
                >
                  {watchlist[activeSeries.id] ? (
                    <>
                      <Check className="w-4 h-4 text-[#39E66B]" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Watchlist</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column (7 of 12 cols): Crisp, Unobstructed Landscape Artwork */}
            <div 
              onClick={() => handleOpenAnime(activeSeries.id)}
              className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-[#080A09] cursor-pointer group"
            >
              <img
                src={activeSeries.bannerUrl}
                alt={activeSeries.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D110E] via-transparent to-transparent lg:hidden" />
              
              {/* Play Badge Overlay on Hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#39E66B] text-[#080A09] flex items-center justify-center shadow-2xl shadow-[#39E66B]/40 transform group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Japanese Kanji Subtitle Watermark in bottom corner */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-[#080A09]/80 border border-[#262D28] text-[11px] text-[#A0AAA2] font-medium backdrop-blur-xs">
                {activeSeries.originalTitle}
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================================
            3. HORIZONTAL REALM SELECTOR DOCK (5 FLAGSHIPS)
           ===================================================================== */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold tracking-wider uppercase text-[#A0AAA2] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#39E66B]" />
              Select Universe Spotlight:
            </span>
            <span className="text-xs text-[#39E66B] font-mono">
              {featuredList.findIndex(a => a.id === activeSeries.id) + 1} of {featuredList.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {featuredList.map((item) => {
              const isSelected = item.id === activeSeries.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  type="button"
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#151D17] border-[#39E66B] shadow-md shadow-[#39E66B]/15 scale-[1.02]'
                      : 'bg-[#101411] border-[#262D28] hover:border-[#39E66B]/40 hover:bg-[#131814]'
                  }`}
                >
                  <div className="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#080A09]">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#F5F7F5] truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-[#39E66B] font-semibold mt-0.5 truncate">
                      {item.categoryLabel}
                    </div>
                    <div className="text-[10px] text-[#A0AAA2] mt-0.5">
                      ★ {item.rating}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            4. CURATED POSTER GRID (ALL 8 REINCARNATION TITLES)
           ===================================================================== */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-[#F5F7F5]">
            Browse All Reincarnated Epics
          </h3>
          <span className="text-xs text-[#A0AAA2]">
            Showing <strong className="text-[#39E66B]">{filteredCatalog.length}</strong> titles
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredCatalog.map((anime) => {
            const isCurrentSpotlight = anime.id === activeSeries.id;
            return (
              <div
                key={anime.id}
                onClick={() => handleOpenAnime(anime.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenAnime(anime.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${anime.title}`}
                className={`group relative bg-[#101411] border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] ${
                  isCurrentSpotlight
                    ? 'border-[#39E66B] ring-1 ring-[#39E66B] shadow-lg shadow-[#39E66B]/10'
                    : 'border-[#262D28] hover:border-[#39E66B]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50'
                }`}
              >
                {/* 2:3 Aspect Ratio Portrait Poster */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#080A09]">
                  <AnimeImage
                    src={anime.posterUrl}
                    alt={anime.title}
                    aspectRatio="2/3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101411] via-transparent to-transparent opacity-80" />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#080A09]/90 border border-[#262D28] text-[11px] font-bold text-[#39E66B] flex items-center gap-1 backdrop-blur-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{anime.rating}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#080A09]/90 border border-[#262D28] text-[10px] font-bold uppercase tracking-wider text-[#A0AAA2] backdrop-blur-xs">
                    {anime.categoryLabel}
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-[#39E66B] text-[#080A09] flex items-center justify-center shadow-lg shadow-[#39E66B]/30 transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-[#A0AAA2] flex items-center justify-between mb-1">
                      <span>{anime.year}</span>
                      <span>{anime.episodes}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors line-clamp-1">
                      {anime.title}
                    </h4>

                    <p className="mt-1 text-xs text-[#A0AAA2] line-clamp-2 leading-relaxed">
                      {anime.synopsis}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#262D28] flex items-center justify-between text-xs font-semibold text-[#A0AAA2] group-hover:text-[#39E66B] transition-colors">
                    <span>Watch Now</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
