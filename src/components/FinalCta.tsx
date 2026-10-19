import React, { useState } from 'react';
import { Play, Sparkles, Tv, Smartphone, Monitor, Gamepad2, Download, ArrowRight, Check } from 'lucide-react';
import { ALL_ANIME_COLLECTION } from '../data/animeData';

interface FinalCtaProps {
  onExploreAnime: () => void;
  onOpenSignIn?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onExploreAnime, onOpenSignIn }) => {
  const [activeDevice, setActiveDevice] = useState<string>('tv');

  // Double the list for infinite seamless marquee loop
  const marqueeList = [...ALL_ANIME_COLLECTION, ...ALL_ANIME_COLLECTION];

  const devices = [
    { id: 'tv', label: 'Smart TVs', icon: Tv, detail: 'Apple TV, Android TV, LG webOS, Samsung Tizen & Fire TV' },
    { id: 'mobile', label: 'Mobile & Tablet', icon: Smartphone, detail: 'iOS, iPadOS & Android with offline episode downloads' },
    { id: 'desktop', label: 'Web & Desktop', icon: Monitor, detail: 'Ultra-fast web player supporting 4K HDR and picture-in-picture' },
    { id: 'console', label: 'Game Consoles', icon: Gamepad2, detail: 'PlayStation 5, PlayStation 4 & Xbox Series X/S' },
  ];

  const currentDevice = devices.find((d) => d.id === activeDevice) || devices[0];

  return (
    <section className="py-24 md:py-32 bg-[#080A09] relative overflow-hidden border-t border-[#262D28]">
      {/* Background Infinite Moving Anime Poster Marquee */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none flex items-center">
        <div className="animate-marquee flex space-x-4">
          {marqueeList.map((anime, idx) => (
            <div
              key={`${anime.id}-${idx}`}
              className="w-32 sm:w-40 aspect-[2/3] flex-shrink-0 rounded-lg overflow-hidden bg-[#151A16] border border-[#262D28]/40"
            >
              <img
                src={anime.posterUrl}
                alt=""
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </div>
          ))}
        </div>

        {/* Cinematic Vignette Overlays for Maximum Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-[#080A09]/85 to-[#080A09]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A09] via-transparent to-[#080A09]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080A09]/70 to-[#080A09]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101411]/90 border border-[#262D28] text-xs font-semibold text-[#39E66B] mb-6 backdrop-blur-sm shadow-md">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="uppercase tracking-widest text-[11px]">Stream Anywhere • On Any Screen</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F5F7F5] tracking-tight leading-tight">
          Ready for your next{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F7F5] via-[#39E66B] to-[#20C45A]">
            adventure?
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl text-[#A0AAA2] max-w-2xl mx-auto font-normal leading-relaxed">
          Find your next favourite story on WATCatoo. Stream uninterrupted across your entire ecosystem with automatic progress sync.
        </p>

        {/* Interactive Device Ecosystem Selector */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#101411]/80 border border-[#262D28] rounded-xl backdrop-blur-sm">
            {devices.map((device) => {
              const Icon = device.icon;
              const isSelected = activeDevice === device.id;

              return (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => setActiveDevice(device.id)}
                  className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#151A16] text-[#39E66B] border border-[#39E66B]/40 shadow-sm'
                      : 'text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16]/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{device.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 text-xs text-[#A0AAA2] flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-[#151A16]/50 border border-[#262D28]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39E66B]" />
            <span className="text-[#F5F7F5] font-medium">{currentDevice.label}:</span>
            <span className="text-[#A0AAA2]">{currentDevice.detail}</span>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#A0AAA2]">
          <span className="px-3 py-1 rounded-full bg-[#101411] border border-[#262D28] flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5 text-[#39E66B]" />
            <span>Offline Downloads</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-[#101411] border border-[#262D28] flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#39E66B]" />
            <span>4K HDR Bitrates</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-[#101411] border border-[#262D28] flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#39E66B]" />
            <span>Cross-Device Cloud Resume</span>
          </span>
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreAnime}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 text-base font-bold text-[#080A09] bg-[#39E66B] hover:bg-[#20C45A] active:scale-[0.98] rounded-md transition-all duration-200 shadow-xl shadow-[#39E66B]/25 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            <span>Explore Anime</span>
          </button>

          {onOpenSignIn && (
            <button
              type="button"
              onClick={onOpenSignIn}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 text-sm font-semibold text-[#F5F7F5] bg-[#101411] hover:bg-[#151A16] hover:border-[#39E66B]/40 border border-[#262D28] rounded-md transition-colors"
            >
              <span>Request VIP Early Access</span>
              <ArrowRight className="w-4 h-4 text-[#39E66B]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
