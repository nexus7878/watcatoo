import React, { useState, useEffect } from 'react';
import { Play, Compass, Info } from 'lucide-react';
import { HERO_FEATURED } from '../data/animeData';

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
      posterUrl: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/display/keyart/T00058844-base_asset_2x3-en-US',
      genres: HERO_FEATURED.genres,
      year: HERO_FEATURED.year,
      episodes: HERO_FEATURED.episodes,
      quality: HERO_FEATURED.quality,
      synopsis: HERO_FEATURED.synopsis,
    },
    {
      id: 'one-piece-series',
      title: 'One Piece',
      bannerUrl: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/Curation%20Testing/UAT%20Round%203%20testing/OnePiece-UW-LTR.png',
      posterUrl: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/display/keyart/T00002348-base_asset_2x3-en-US',
      genres: ['Adventure', 'Action', 'Fantasy'],
      year: 'Egghead Arc',
      episodes: '1100+ Episodes',
      quality: '4K Ultra HD',
      synopsis: 'Monkey D. Luffy and the Straw Hat Pirates explore Future Island Egghead and unravel the century-old secrets of the Void Century.',
    },
    {
      id: 'solo-leveling',
      title: 'Solo Leveling',
      bannerUrl: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/Solo%20Leveling/SEASON%201/ULTRA-WIDE/SoloLeveling-S1-KV1-UW-LTR.png',
      posterUrl: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/display/keyart/T00320667-base_asset_2x3-en-US',
      genres: ['Action', 'Fantasy', 'Adventure'],
      year: '2024',
      episodes: '12 Episodes',
      quality: '4K Ultra HD',
      synopsis: 'In a world of deadly dungeons, the weakest hunter awakens a private quest log that lets him level up without limits.',
    },
    {
      id: 'daemons',
      title: 'Daemons of the Shadow Realm',
      bannerUrl: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/Daemons%20of%20the%20Shadow%20Realm/SEASON%201/ULTRA-WIDE/DaemonsOfTheShadowRealm-S1-KV1-UW-LTR.png',
      posterUrl: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/display/keyart/T00169670-base_asset_2x3-en-US',
      genres: ['Fantasy', 'Mystery', 'Action'],
      year: 'Season 1',
      episodes: 'New Series',
      quality: '4K Ultra HD',
      synopsis: 'Uncover the truth of day and night as twins separated at birth confront supernatural daemons.',
    },
  ];

  // Campaign Auto-Move timer: smoothly cycles to next anime every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % heroList.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroList.length]);

  const current = heroList[activeHeroIdx];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start overflow-hidden pt-16 sm:pt-20 pb-8 sm:pb-14 bg-[#080A09]">
      {/* Desktop Background Image Artwork Container */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <img
          key={current.bannerUrl}
          src={current.bannerUrl}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[35%_center] lg:object-center transition-opacity duration-700 ease-in-out opacity-80 scale-100"
        />

        {/* Cinematic Multi-stop Overlays for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A09] via-[#080A09]/90 to-transparent w-3/4 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#080A09] via-[#080A09]/80 to-transparent z-10" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#080A09]/90 to-transparent z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#39E66B]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile Portrait Thumbnail Visual Showcase (< md) */}
        <div className="relative mb-5 md:hidden flex justify-center items-center">
          {/* Ambient radial emerald glow behind the poster */}
          <div className="absolute w-44 h-60 bg-[#39E66B]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Vertical Anime Poster Thumbnail */}
          <div className="relative w-40 xs:w-48 aspect-[2/3] rounded-2xl overflow-hidden border border-[#262D28] shadow-2xl bg-[#101411]">
            <img
              key={current.posterUrl}
              src={current.posterUrl}
              alt={current.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700"
            />

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
              <span className="px-2 py-0.5 rounded-full bg-[#080A09]/90 border border-[#39E66B]/40 text-[#39E66B] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39E66B] animate-pulse" />
                Featured
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#080A09]/90 border border-[#262D28] text-[#F5F7F5] text-[10px] font-mono font-bold">
                {current.quality || '4K UHD'}
              </span>
            </div>

            {/* Bottom Title Bar */}
            <div className="absolute inset-x-0 bottom-0 pt-8 pb-2.5 px-3 bg-gradient-to-t from-[#080A09] via-[#080A09]/80 to-transparent pointer-events-none">
              <p className="text-xs font-black text-[#F5F7F5] truncate text-center drop-shadow-md">
                {current.title}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl lg:max-w-3xl space-y-3.5 sm:space-y-5 md:space-y-6">
          {/* Featured Content Pill */}
          <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#101411]/90 border border-[#262D28] text-xs font-medium text-[#A0AAA2] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#39E66B] animate-pulse" />
            <span className="tracking-wide uppercase text-[10px] sm:text-[11px] text-[#F5F7F5] font-semibold">
              Featured Premiere
            </span>
            <span className="text-[#262D28]">•</span>
            <span className="text-[#39E66B] text-[10px] sm:text-[11px] font-semibold">Weekly Simulcast</span>
          </div>

          {/* Headline - Primary focus */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F7F5] leading-[1.12]">
              Your Next Anime{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F7F5] via-[#F5F7F5] to-[#39E66B]">
                Obsession.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#A0AAA2] font-normal leading-relaxed max-w-xl">
              {current.synopsis}
            </p>
          </div>

          {/* Metadata Row */}
          <div className="space-y-2 pt-0.5">
            {/* Top specs line: Year, Episode count, and Audio/Quality badges */}
            <div className="flex items-center flex-wrap gap-2 text-xs text-[#A0AAA2]">
              <span className="font-semibold text-[#F5F7F5]">{current.year}</span>
              <span className="text-[#39E66B] font-bold">•</span>
              <span className="text-[#A0AAA2] font-medium">{current.episodes}</span>
              <span className="text-[#262D28]">•</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#151A16] text-[#A0AAA2] border border-[#262D28]">
                SUB / DUB
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#39E66B]/15 text-[#39E66B] border border-[#39E66B]/30">
                {current.quality || '4K ULTRA HD'}
              </span>
            </div>

            {/* Bottom line: Clean genre pill tags */}
            <div className="flex items-center flex-wrap gap-1.5">
              {current.genres.map((g) => (
                <span
                  key={g}
                  className="px-2 py-0.5 rounded bg-[#151A16] border border-[#262D28] text-[#D1D5DB] text-[11px] font-medium"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-1 sm:pt-2 flex flex-row items-center gap-2 sm:gap-4 w-full max-w-full">
            <button
              type="button"
              onClick={onExploreAnime}
              className="flex-1 sm:flex-initial min-w-0 inline-flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold text-[#080A09] bg-[#39E66B] hover:bg-[#20C45A] active:scale-[0.98] rounded-lg transition-all duration-200 shadow-lg shadow-[#39E66B]/20 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current transition-transform group-hover:scale-110 flex-shrink-0" />
              <span className="truncate">Explore Anime</span>
            </button>

            <button
              type="button"
              onClick={onDiscoverWorld}
              className="flex-1 sm:flex-initial min-w-0 inline-flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-[#F5F7F5] bg-[#151A16] hover:bg-[#1A221D] hover:border-[#39E66B]/40 border border-[#262D28] active:scale-[0.98] rounded-lg transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#39E66B] transition-transform group-hover:rotate-45 flex-shrink-0" />
              <span className="truncate">Discover Genres</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectAnimeInfo(current.id)}
              className="p-2.5 sm:p-3 text-[#A0AAA2] hover:text-[#F5F7F5] bg-[#151A16] hover:bg-[#1A221D] border border-[#262D28] hover:border-[#39E66B]/30 rounded-lg transition-colors flex-shrink-0"
              title="Series Details"
              aria-label={`View ${current.title} details`}
            >
              <Info className="w-4 h-4 text-[#39E66B]" />
            </button>
          </div>

          {/* Modern Minimalist Slide Indicators (Replaces old 'Spotlights' button bar) */}
          <div className="pt-3 sm:pt-6 flex items-center gap-2">
            {heroList.map((hero, idx) => (
              <button
                key={hero.id}
                type="button"
                onClick={() => setActiveHeroIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeHeroIdx === idx
                    ? 'w-8 bg-[#39E66B] shadow-sm shadow-[#39E66B]/50'
                    : 'w-2.5 bg-[#262D28] hover:bg-[#A0AAA2]/60'
                }`}
                aria-label={`Slide ${idx + 1}: ${hero.title}`}
              />
            ))}
            <span className="text-[11px] font-mono text-[#A0AAA2] ml-2 font-medium">
              0{activeHeroIdx + 1} / 0{heroList.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
