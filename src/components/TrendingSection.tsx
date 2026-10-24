import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const dragDistanceRef = useRef(0);

  // Track window resize for responsive arc math
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter based on selectedGenre if active
  const filteredList = selectedGenre
    ? animeList.filter((item) =>
        item.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      )
    : animeList;

  // Reset active index when genre filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedGenre]);

  // Infinite circular navigation helpers: Never ends, continuously wraps around
  const handlePrev = useCallback(() => {
    if (filteredList.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  }, [filteredList.length]);

  const handleNext = useCallback(() => {
    if (filteredList.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filteredList.length);
  }, [filteredList.length]);

  // Autoplay loop timer: auto-moves continuously every 2.0s
  useEffect(() => {
    if (isAutoPaused || isDragging || hoveredIndex !== null || filteredList.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPaused, isDragging, hoveredIndex, filteredList.length, handleNext]);

  // Responsive dimensions configuration
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const cardWidth = isMobile ? 150 : isTablet ? 190 : 225;
  const cardSpacing = isMobile ? 160 : isTablet ? 200 : 240;
  const arcDropFactor = isMobile ? 6 : isTablet ? 9 : 12;
  const rotAngleFactor = isMobile ? 3.2 : isTablet ? 4.5 : 5.8;
  const maxVisibleDist = isMobile ? 2.2 : isTablet ? 2.8 : 3.8;

  // Circular shortest distance on a ring
  const getCircularDist = (index: number, currentPos: number, total: number) => {
    if (total <= 1) return 0;
    let d = (index - currentPos) % total;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  // Wheel & horizontal touchpad gesture handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey
          ? e.deltaY
          : 0;

      if (Math.abs(delta) > 25) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastWheelTime > 320) {
          lastWheelTime = now;
          if (delta > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev]);

  const pointerDownRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
    isDown: boolean;
  }>({ x: 0, y: 0, pointerId: 0, isDown: false });

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only handle primary button (left click / touch)
    if (e.button !== 0) return;
    pointerDownRef.current = {
      x: e.clientX,
      y: e.clientY,
      pointerId: e.pointerId,
      isDown: true,
    };
    setDragStartX(e.clientX);
    setDragOffset(0);
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerDownRef.current.isDown) return;
    const delta = e.clientX - dragStartX;
    dragDistanceRef.current = Math.abs(delta);

    // Only engage drag tracking after user moves more than 7 pixels
    if (!isDragging && Math.abs(delta) > 7) {
      setIsDragging(true);
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    if (isDragging) {
      setDragOffset(delta);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const wasDragging = isDragging;
    pointerDownRef.current.isDown = false;

    if (wasDragging) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      const threshold = cardSpacing * 0.22;
      if (dragOffset < -threshold) {
        handleNext();
      } else if (dragOffset > threshold) {
        handlePrev();
      }

      setIsDragging(false);
      setDragOffset(0);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    pointerDownRef.current.isDown = false;
    if (isDragging) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  // Keyboard navigation when section is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Enter' && filteredList[activeIndex]) {
      e.preventDefault();
      onSelectAnime(filteredList[activeIndex]);
    }
  };

  const total = filteredList.length || 1;
  const effectiveOffset = isDragging ? dragOffset / cardSpacing : 0;
  const currentFloatIndex = ((activeIndex - effectiveOffset) % total + total) % total;

  return (
    <section
      id="trending"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsAutoPaused(true)}
      onMouseLeave={() => setIsAutoPaused(false)}
      className="py-10 sm:py-16 md:py-20 bg-[#080A09] relative overflow-hidden w-full max-w-full select-none focus:outline-none"
    >
      {/* Background ambient spotlight bloom behind carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] lg:w-[850px] h-[300px] sm:h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(57,230,107,0.12)_0%,rgba(8,10,9,0)_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-[#39E66B] rounded-full inline-block shadow-[0_0_8px_#39E66B]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#39E66B]">
                Curated Streaming
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5F7F5] tracking-tight">
              Trending Now
            </h2>
          </div>

          {/* Right controls: Genre filter pill & responsive arrow buttons */}
          <div className="flex items-center gap-3">
            {selectedGenre && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#151A16] border border-[#39E66B]/30 rounded-full text-xs text-[#F5F7F5]">
                <span>Filter: <strong>{selectedGenre}</strong></span>
                <button
                  type="button"
                  onClick={() => onSelectGenre(null)}
                  className="p-0.5 hover:text-[#39E66B] rounded-full transition-colors cursor-pointer"
                  aria-label="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Auto Loop Indicator Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121914] border border-[#263529] text-[11px] font-mono text-[#8FA093]">
              <span className={`w-2 h-2 rounded-full ${isAutoPaused || hoveredIndex !== null ? 'bg-[#A0AAA2]' : 'bg-[#39E66B] animate-pulse shadow-[0_0_6px_#39E66B]'}`} />
              <span>{isAutoPaused || hoveredIndex !== null ? 'Paused' : 'Auto Loop'}</span>
            </div>

            {/* Carousel navigation buttons - Never disabled in infinite loop */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-[#263529] hover:border-[#39E66B]/50 text-[#A0AAA2] hover:text-[#39E66B] hover:bg-[#151E17] hover:shadow-[0_0_12px_rgba(57,230,107,0.2)] transition-all duration-200 cursor-pointer"
                aria-label="Previous trending anime"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-full border border-[#263529] hover:border-[#39E66B]/50 text-[#A0AAA2] hover:text-[#39E66B] hover:bg-[#151E17] hover:shadow-[0_0_12px_rgba(57,230,107,0.2)] transition-all duration-200 cursor-pointer"
                aria-label="Next trending anime"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty state when genre filter yields no results */}
        {filteredList.length === 0 ? (
          <div className="bg-[#101411] border border-[#262D28] rounded-xl p-12 text-center">
            <p className="text-[#A0AAA2] mb-3">No series found matching the selected category.</p>
            <button
              onClick={() => onSelectGenre(null)}
              className="px-4 py-2 text-sm font-semibold bg-[#39E66B] text-[#080A09] rounded-md hover:bg-[#20C45A] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Curved 3D Carousel Stage with Infinite Wrap */
          <div className="relative w-full">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              className={`relative w-full h-[410px] sm:h-[460px] md:h-[500px] overflow-visible touch-pan-y cursor-grab ${
                isDragging ? 'cursor-grabbing' : ''
              }`}
              style={{
                perspective: isMobile ? '900px' : '1300px',
                perspectiveOrigin: '50% 50%',
              }}
            >
              {filteredList.map((anime, idx) => {
                const dist = getCircularDist(idx, currentFloatIndex, total);
                const absDist = Math.abs(dist);

                // Cull cards too far out of view
                if (absDist > maxVisibleDist) return null;

                // Curved Arc Math:
                // - Center is at X = 0, wings spaced along cardSpacing
                // - Vertical displacement follows a smooth parabola (arc drop)
                // - Subtle perspective rotation along Y axis (curves toward viewer)
                // - Center card scaled to 1.06, wings scale down gently
                const posX = dist * cardSpacing;
                const posY = Math.pow(absDist, 1.85) * arcDropFactor;
                const baseScale = Math.max(0.76, 1.06 - absDist * (isMobile ? 0.08 : 0.065));
                const rotY = -dist * rotAngleFactor;
                const zIndex = Math.round(50 - absDist * 10);
                const opacity = Math.max(0, 1 - Math.max(0, absDist - (isMobile ? 1.4 : 2.2)) * 0.7);

                const isHovered = hoveredIndex === idx;
                const isCenter = Math.abs(dist) < 0.45;

                // Gentle hover elevation without breaking carousel layout
                const hoverLift = isHovered ? -10 : 0;
                const scale = isHovered ? baseScale * 1.04 : baseScale;

                return (
                  <div
                    key={anime.id}
                    onClick={() => {
                      if (dragDistanceRef.current > 7) return;
                      setActiveIndex(idx);
                      onSelectAnime(anime);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveIndex(idx);
                        onSelectAnime(anime);
                      }
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      width: `${cardWidth}px`,
                      left: '50%',
                      top: '20px',
                      transform: `translate3d(calc(-50% + ${posX}px), ${posY + hoverLift}px, 0) scale(${scale}) rotateY(${rotY}deg)`,
                      zIndex,
                      opacity,
                      transition: isDragging
                        ? 'none'
                        : 'transform 0.45s cubic-bezier(0.2, 0.85, 0.3, 1), opacity 0.38s ease, filter 0.38s ease',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                    }}
                    className="absolute cursor-pointer flex flex-col group outline-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${anime.title}`}
                  >
                    {/* Poster Card Container */}
                    <div
                      className={`relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#131915] border transition-all duration-300 ${
                        isCenter
                          ? 'border-[#39E66B]/50 shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_25px_rgba(57,230,107,0.2)]'
                          : 'border-[#222E25] hover:border-[#39E66B]/40 shadow-[0_10px_24px_rgba(0,0,0,0.65)]'
                      } ${isHovered ? 'shadow-[0_20px_42px_rgba(57,230,107,0.25)] border-[#39E66B]/70' : ''}`}
                    >
                      <AnimeImage
                        src={anime.posterUrl}
                        alt={anime.title}
                        aspectRatio="2/3"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Subtle ambient gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/90 via-transparent to-black/25 pointer-events-none" />

                      {/* Top Badges: Ranking, Year, Age-Rating */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                        {idx < 3 && !selectedGenre ? (
                          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-[#080A09]/90 text-[#39E66B] border border-[#39E66B]/40 backdrop-blur-md flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-2.5 h-2.5" />
                            Top {idx + 1}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-[#080A09]/85 text-[#9EAAA1] border border-[#232F26] backdrop-blur-xs">
                            {anime.year}
                          </span>
                        )}

                        {anime.ratingLabel && (
                          <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-[#121814]/90 text-[#9EAAA1] border border-[#232F26] backdrop-blur-xs">
                            {anime.ratingLabel}
                          </span>
                        )}
                      </div>

                      {/* Hover action overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-[#080A09] via-[#080A09]/40 to-transparent flex items-end p-3 transition-opacity duration-200 ${
                          isHovered || (isCenter && isMobile)
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      >
                        <div className="w-full flex items-center justify-between gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectAnime(anime);
                            }}
                            className="flex-1 inline-flex items-center justify-center space-x-1.5 text-xs font-semibold text-[#080A09] bg-[#39E66B] hover:bg-[#20C45A] px-2.5 py-1.5 rounded-md transition-colors shadow-sm cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Preview</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectAnime(anime);
                            }}
                            className="p-1.5 bg-[#141C16]/90 hover:bg-[#1E2B21] text-[#F5F7F5] hover:text-[#39E66B] rounded-md border border-[#28372D] transition-colors cursor-pointer"
                            aria-label="View info"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Metadata Below Poster */}
                    <div className="mt-2.5 px-0.5 space-y-1 text-left">
                      <h3
                        className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                          isCenter
                            ? 'text-[#F5F7F5] group-hover:text-[#39E66B]'
                            : 'text-[#D3DDD5] group-hover:text-[#F5F7F5]'
                        }`}
                      >
                        {anime.title}
                      </h3>

                      <div className="flex items-center justify-between text-xs text-[#8A968E]">
                        <span className="truncate max-w-[130px]">
                          {anime.genres.slice(0, 2).join(', ')}
                        </span>
                        <span className="text-[11px] text-[#768379] flex-shrink-0">
                          {anime.episodes || anime.season}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Side Action Chevrons (Desktop) - Infinite, never disabled */}
            <button
              type="button"
              onClick={handlePrev}
              className="hidden md:flex absolute -left-3 top-[38%] -translate-y-1/2 z-40 w-10 h-10 items-center justify-center rounded-full bg-[#0D120F]/90 hover:bg-[#151E17] text-[#A0AAA2] hover:text-[#39E66B] border border-[#253328] hover:border-[#39E66B]/50 backdrop-blur-md shadow-xl transition-all duration-200 cursor-pointer"
              aria-label="Previous poster"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="hidden md:flex absolute -right-3 top-[38%] -translate-y-1/2 z-40 w-10 h-10 items-center justify-center rounded-full bg-[#0D120F]/90 hover:bg-[#151E17] text-[#A0AAA2] hover:text-[#39E66B] border border-[#253328] hover:border-[#39E66B]/50 backdrop-blur-md shadow-xl transition-all duration-200 cursor-pointer"
              aria-label="Next poster"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Flow Indicators & Pagination Bar */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#768379] px-2">
              <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
                {filteredList.map((item, dotIdx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(dotIdx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activeIndex === dotIdx
                        ? 'w-7 sm:w-8 h-1.5 bg-[#39E66B] shadow-[0_0_8px_#39E66B]'
                        : 'w-1.5 sm:w-2 h-1.5 bg-[#202B23] hover:bg-[#39E66B]/50'
                    }`}
                    aria-label={`Jump to ${item.title}`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="text-[#39E66B] font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[#3B483F]">/</span>
                <span className="text-[#768379]">
                  {String(filteredList.length).padStart(2, '0')}
                </span>
                <span className="hidden sm:inline-block text-[#526056] font-sans text-[11px] ml-2">
                  • Continuous auto-loop • Drag or swipe
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
