import React, { useState } from 'react';
import { Play, Compass, Info } from 'lucide-react';
import { HERO_FEATURED, ALTERNATIVE_HEROES } from '../data/animeData';

interface HeroSectionProps {
  onExploreAnime: () => void;
  onDiscoverWorld: () => void;
  onSelectAnimeInfo: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreAnime,
  onDiscoverWorld,
  onSelectAnimeInfo,
}) => {
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  const heroList = [
    {
      id: HERO_FEATURED.id,
      title: HERO_FEATURED.title,
      bannerUrl: HERO_FEATURED.bannerUrl,
      logoUrl: HERO_FEATURED.logoUrl,
      genres: HERO_FEATURED.genres,
      year: HERO_FEATURED.year,
      episodes: HERO_FEATURED.episodes,
      quality: HERO_FEATURED.quality,
      synopsis: HERO_FEATURED.synopsis,
    },
    ...ALTERNATIVE_HEROES.map((h) => ({
      id: h.id,
      title: h.title,
      bannerUrl: h.bannerUrl,
      logoUrl: undefined,
      genres: h.genres,
      year: h.year,
      episodes: h.episodes,
      quality: '4K Ultra HD',
      synopsis: 'Stream the most celebrated saga in modern anime, remastered in full high-definition sound and vision on WATCatoo.',
    })),
  ];

  const current = heroList[activeHeroIdx];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-start overflow-hidden pt-20 pb-16 bg-[#080A09]">
      {/* Background Image Artwork Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          key={current.bannerUrl}
          src={current.bannerUrl}
          alt={current.title}
          className="w-full h-full object-cover object-right md:object-center transition-opacity duration-700 ease-in-out opacity-85 scale-100"
        />

        {/* Cinematic Multi-stop Overlays for maximum text readability */}
        {/* Left gradient for text protection */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A09] via-[#080A09]/80 md:via-[#080A09]/70 to-transparent w-full md:w-3/4 z-10" />

        {/* Bottom gradient fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#080A09] via-[#080A09]/80 to-transparent z-10" />

        {/* Top subtle vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080A09]/90 to-transparent z-10" />

        {/* Subtle radial green ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#39E66B]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Featured Content Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#101411]/90 border border-[#262D28] text-xs font-medium text-[#A0AAA2] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#39E66B] animate-pulse" />
            <span className="tracking-wide uppercase text-[11px] text-[#F5F7F5]">
              Featured Premiere
            </span>
            <span className="text-[#262D28]">•</span>
            <span className="text-[#39E66B] text-[11px] font-semibold">Simulcast in 4K</span>
          </div>

          {/* Headline - Primary focus */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#F5F7F5] leading-[1.08] font-sans">
              Your Next Anime <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F7F5] via-[#F5F7F5] to-[#39E66B]">
                Obsession.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-[#A0AAA2] font-normal leading-relaxed max-w-xl">
              Discover unforgettable worlds, legendary adventures, and stories that stay with you.
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#A0AAA2]">
            {/* Genre pills */}
            <div className="flex items-center gap-1.5">
              {current.genres.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-0.5 rounded bg-[#151A16] border border-[#262D28] text-[#F5F7F5] text-xs font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            <span className="text-[#262D28] hidden sm:inline">•</span>

            <span className="text-[#A0AAA2] font-medium">{current.year}</span>

            <span className="text-[#262D28]">•</span>

            <span className="text-[#A0AAA2]">{current.episodes}</span>

            <span className="text-[#262D28] hidden sm:inline">•</span>

            {/* Audio / Quality badges */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#262D28]/70 text-[#A0AAA2] border border-[#262D28]">
                SUB / DUB
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#39E66B]/10 text-[#39E66B] border border-[#39E66B]/30">
                ULTRA HD
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onExploreAnime}
              className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-[#080A09] bg-[#39E66B] hover:bg-[#20C45A] active:scale-[0.98] rounded-md transition-all duration-200 shadow-lg shadow-[#39E66B]/15 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
            >
              <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
              <span>Explore Anime</span>
            </button>

            <button
              type="button"
              onClick={onDiscoverWorld}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#F5F7F5] bg-[#101411]/90 hover:bg-[#151A16] hover:border-[#39E66B]/40 border border-[#262D28] active:scale-[0.98] rounded-md transition-all duration-200 backdrop-blur-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
            >
              <Compass className="w-4 h-4 text-[#39E66B] transition-transform group-hover:rotate-45" />
              <span>Discover Your World</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectAnimeInfo('demon-slayer-series')}
              className="hidden lg:inline-flex items-center justify-center p-3.5 text-[#A0AAA2] hover:text-[#F5F7F5] bg-[#101411]/60 hover:bg-[#151A16] border border-[#262D28] rounded-md transition-colors"
              title="Series Details"
              aria-label="View series details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Spotlight switcher tabs (restrained, modern pill controls) */}
          <div className="pt-6 sm:pt-10 flex items-center space-x-2">
            <span className="text-[11px] uppercase tracking-wider text-[#A0AAA2]/70 mr-2 font-medium">
              Featured Spotlights:
            </span>
            {heroList.map((hero, idx) => (
              <button
                key={hero.id}
                onClick={() => setActiveHeroIdx(idx)}
                className={`group relative py-1 px-2.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 ${
                  activeHeroIdx === idx
                    ? 'bg-[#151A16] text-[#39E66B] border border-[#39E66B]/40 font-semibold'
                    : 'text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#101411] border border-transparent'
                }`}
                aria-label={`View ${hero.title}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeHeroIdx === idx ? 'bg-[#39E66B]' : 'bg-[#262D28] group-hover:bg-[#A0AAA2]'
                  }`}
                />
                <span className="truncate max-w-[120px] sm:max-w-[160px]">{hero.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
