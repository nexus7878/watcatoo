import React, { useState, useEffect } from 'react';
import { X, Play, Plus, Check } from 'lucide-react';
import { AnimeItem } from '../data/animeData';
import { AnimeImage } from './AnimeImage';

interface AnimeDetailModalProps {
  anime: AnimeItem | null;
  onClose: () => void;
}

export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({ anime, onClose }) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  useEffect(() => {
    setInWatchlist(false);
    setIsPlayingPreview(false);
  }, [anime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!anime) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#101411] border border-[#262D28] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-[#080A09]/80 text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] border border-[#262D28] transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Container */}
        <div className="flex flex-col sm:flex-row">
          {/* Poster Image */}
          <div className="h-48 xs:h-56 sm:h-auto sm:w-5/12 flex-shrink-0 bg-[#080A09] relative overflow-hidden">
            <AnimeImage
              src={anime.posterUrl}
              alt={anime.title}
              aspectRatio="2/3"
              className="w-full h-full object-cover object-top sm:object-center sm:min-h-[380px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#101411] sm:from-transparent via-transparent to-transparent sm:to-[#101411] pointer-events-none" />
          </div>

          {/* Details Body */}
          <div className="p-4 sm:p-7 sm:w-7/12 flex flex-col justify-between space-y-4">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#39E66B]/10 text-[#39E66B] border border-[#39E66B]/30">
                  {anime.ratingLabel || 'TV-14'}
                </span>
                <span className="text-xs text-[#A0AAA2]">{anime.year}</span>
                <span className="text-[#262D28]">•</span>
                <span className="text-xs text-[#A0AAA2]">{anime.episodes || anime.season}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-[#F5F7F5] leading-snug">
                {anime.title}
              </h3>
              {anime.season && (
                <p className="text-xs font-medium text-[#39E66B] mt-0.5">
                  {anime.season}
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-0.5 text-xs rounded bg-[#151A16] border border-[#262D28] text-[#A0AAA2]"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <p className="text-xs sm:text-sm text-[#A0AAA2] leading-relaxed line-clamp-5">
                {anime.synopsis ||
                  'Watch this acclaimed anime series in full high definition on WATCatoo. Add to your watchlist to stay updated on new simulcast episodes.'}
              </p>
            </div>

            {/* Simulated Streaming Preview / Watchlist Action */}
            <div className="pt-3 border-t border-[#262D28] space-y-3">
              {isPlayingPreview ? (
                <div className="p-3 bg-[#151A16] border border-[#39E66B]/30 rounded-lg text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#39E66B] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#39E66B] animate-ping" />
                      Previewing Simulcast Feed
                    </span>
                    <button
                      onClick={() => setIsPlayingPreview(false)}
                      className="text-[#A0AAA2] hover:text-[#F5F7F5]"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-[#A0AAA2] text-[11px]">
                    Full player streaming engine will activate in Phase 2. All video streams are served in adaptive bitrate 1080p/4K.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlayingPreview(true)}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 text-sm font-bold text-[#080A09] bg-[#39E66B] hover:bg-[#20C45A] rounded-md transition-colors shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInWatchlist(!inWatchlist)}
                    className={`inline-flex items-center justify-center space-x-1.5 py-2.5 px-4 text-xs font-semibold rounded-md border transition-colors ${
                      inWatchlist
                        ? 'bg-[#151A16] border-[#39E66B] text-[#39E66B]'
                        : 'bg-[#151A16] border-[#262D28] text-[#F5F7F5] hover:border-[#A0AAA2]'
                    }`}
                  >
                    {inWatchlist ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>In Watchlist</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Watchlist</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
