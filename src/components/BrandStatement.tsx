import React, { useState } from 'react';
import { Sparkles, Tv, Globe2, HeartHandshake, Check, ShieldCheck, Zap } from 'lucide-react';

export const BrandStatement: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      icon: Tv,
      title: 'Uncut Cinema Mastering',
      badge: '4K UHD • HDR10+ • Dolby Atmos',
      description:
        'Experience hand-drawn linework, explosive sakuga animation, and orchestral scores in pristine 4K fidelity with lossless multi-channel sound — exactly as the animation directors intended.',
      bgArtwork:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/Black%20Torch/SEASON%201/ULTRA-WIDE/BlackTorch-S1-KV1-UW-LTR.png',
      stat: '4K 60FPS',
      statLabel: 'Master Playback',
    },
    {
      icon: Globe2,
      title: 'Direct Tokyo Simulcasts',
      badge: 'Express Broadcast Sync',
      description:
        'Watch weekly broadcast releases as they air in Tokyo. Fully localized with studio-verified subtitles, culturally authentic dialogue notes, and premiere professional dub tracks.',
      bgArtwork:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/Daemons%20of%20the%20Shadow%20Realm/SEASON%201/ULTRA-WIDE/DaemonsOfTheShadowRealm-S1-KV1-UW-LTR.png',
      stat: '< 60 Mins',
      statLabel: 'Tokyo to Screen',
    },
    {
      icon: HeartHandshake,
      title: 'Curated by Devoted Fans',
      badge: 'Human Editorial Discovery',
      description:
        'No soulless engagement algorithms. Discover handpicked thematic collections organized by atmospheric mood, narrative tension, legendary studios, and visionary creators.',
      bgArtwork:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/That%20Time%20I%20Got%20Reincarnated%20as%20a%20Slime/SEASON%204/ULTRA-WIDE/ThatTimeIGotReincarnatedAsASlime-S4-Character-UW-LTR.png',
      stat: '100% Uncut',
      statLabel: 'Creator Vision',
    },
  ];

  return (
    <section id="story" className="py-12 sm:py-20 md:py-32 bg-[#080A09] relative overflow-hidden border-t border-[#262D28] w-full max-w-full">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-[#39E66B]/5 rounded-full blur-[100px] pointer-events-none animate-glow-breathe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-full">
        {/* Editorial Top Headline Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-14 md:mb-20 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101411] border border-[#262D28] text-xs font-semibold text-[#39E66B] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="uppercase tracking-widest text-[11px]">The WATCatoo Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F5F7F5] tracking-tight leading-[1.12]">
            “Every world has a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F7F5] via-[#39E66B] to-[#20C45A]">
              story.
            </span>”
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#A0AAA2] font-normal leading-relaxed max-w-3xl mx-auto">
            We believe anime is more than animation — it is a gateway to mythologies, heartfelt journeys, and bonds that defy time. WATCatoo was created for passionate viewers and curious newcomers alike, crafting an intimate stage where timeless masterpieces and groundbreaking simulcasts live side by side.
          </p>

          {/* Minimal green accent line */}
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#39E66B] to-transparent mx-auto opacity-75 mt-8" />
        </div>

        {/* 3 Interactive Cinematic Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = activePillar === idx;

            return (
              <div
                key={pillar.title}
                onMouseEnter={() => setActivePillar(idx)}
                tabIndex={0}
                className={`group relative rounded-2xl p-7 md:p-8 bg-[#101411] border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] ${
                  isHovered
                    ? 'border-[#39E66B]/50 shadow-xl shadow-[#39E66B]/5 -translate-y-1'
                    : 'border-[#262D28] hover:border-[#39E66B]/30'
                }`}
              >
                {/* Background Artwork Subtle Watermark with Dark Gradient */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <img
                    src={pillar.bgArtwork}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101411] via-[#101411]/90 to-[#101411]/60" />
                </div>

                {/* Top Content */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#39E66B] text-[#080A09] shadow-md shadow-[#39E66B]/30'
                          : 'bg-[#151A16] text-[#39E66B] border border-[#262D28]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#151A16]/90 border border-[#262D28] text-[#A0AAA2]">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#A0AAA2] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Stat Bar */}
                <div className="relative z-10 pt-6 mt-6 border-t border-[#262D28] flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-[#F5F7F5] font-sans group-hover:text-[#39E66B] transition-colors">
                      {pillar.stat}
                    </div>
                    <div className="text-[11px] text-[#A0AAA2]/70 uppercase tracking-wider">
                      {pillar.statLabel}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-[#39E66B] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39E66B] animate-ping" />
                    <span className="text-[11px] uppercase tracking-wider">Active Standard</span>
                  </div>
                </div>

                {/* Subtle Green Top Accent Bar on Hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-[#39E66B] transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Global Platform Guarantees Strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-xl bg-[#101411]/50 border border-[#262D28] flex flex-wrap items-center justify-around gap-4 text-xs text-[#A0AAA2]">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-[#39E66B]" />
            <span className="text-[#F5F7F5] font-medium">Lossless Audio & Stereo Sync</span>
          </div>
          <div className="text-[#262D28] hidden sm:inline">•</div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#39E66B]" />
            <span className="text-[#F5F7F5] font-medium">Zero Intrusive Mid-Roll Ads</span>
          </div>
          <div className="text-[#262D28] hidden sm:inline">•</div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-[#39E66B]" />
            <span className="text-[#F5F7F5] font-medium">Instant Cloud Progress Sync</span>
          </div>
        </div>
      </div>
    </section>
  );
};
