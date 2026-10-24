import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Film, ArrowRight, Flame, Sparkles, Star } from 'lucide-react';
import { AnimeItem } from '../data/animeData';
import { AnimeImage } from './AnimeImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeList: AnimeItem[];
  onSelectAnime: (anime: AnimeItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  animeList,
  onSelectAnime,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? animeList.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.genres.some((g) => g.toLowerCase().includes(query.toLowerCase())) ||
          (item.synopsis && item.synopsis.toLowerCase().includes(query.toLowerCase()))
      )
    : animeList.slice(0, 7); // curated default suggestions

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        onSelectAnime(filtered[selectedIndex]);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, onSelectAnime]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-gradient-to-b from-[#0F1411]/98 to-[#090C0A]/98 border border-[#27352B] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(57,230,107,0.08)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek emerald top highlight line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#39E66B] to-transparent opacity-80" />

        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-5 py-4 border-b border-[#232F26] bg-[#121914]/80">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#39E66B]/15 border border-[#39E66B]/35 mr-3 flex-shrink-0 shadow-[0_0_12px_rgba(57,230,107,0.25)]">
            <Search className="w-4 h-4 text-[#39E66B]" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search anime by title, genre (Action, Fantasy...) or keyword..."
            className="w-full bg-transparent text-[#F5F7F5] placeholder-[#7E8B82] text-sm sm:text-base font-normal focus:outline-none tracking-wide"
          />

          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-[#8A968E] hover:text-[#F5F7F5] bg-[#1A241D] hover:bg-[#223026] border border-[#2B3A2F] rounded-full transition-colors flex-shrink-0"
              aria-label="Clear query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-[#8A968E] bg-[#141C16] border border-[#27352B] rounded shadow-xs select-none flex-shrink-0">
              ESC
            </kbd>
          )}
        </div>

        {/* Trending Suggestions Chips */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#0C110E] border-b border-[#1E2721] flex items-center space-x-2 overflow-x-auto text-xs scrollbar-none">
          <div className="flex items-center space-x-1 text-[11px] font-semibold text-[#8A968E] uppercase tracking-wider flex-shrink-0 mr-1">
            <Flame className="w-3.5 h-3.5 text-[#39E66B]" />
            <span>Trending:</span>
          </div>
          {['Solo Leveling', 'Demon Slayer', 'Jujutsu Kaisen', 'One Piece', 'Action', 'Fantasy'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag);
                setSelectedIndex(0);
              }}
              className="px-2.5 py-1 rounded-full bg-[#131A15] hover:bg-[#1A251D] hover:text-[#39E66B] border border-[#243027] hover:border-[#39E66B]/40 text-[#9EAAA1] text-[11px] font-medium transition-all flex-shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[58vh] overflow-y-auto p-3 sm:p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#8A968E] px-2 mb-2">
            <span>
              {query ? `Found ${filtered.length} matches` : 'Featured Recommendations'}
            </span>
            <span className="text-[11px] text-[#39E66B] flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-[#39E66B]" />
              Live Discovery
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-14 text-center text-[#8A968E]">
              <Film className="w-9 h-9 text-[#263329] mx-auto mb-2.5" />
              <p className="text-sm font-medium text-[#D1D9D3]">No results found for “{query}”.</p>
              <p className="text-xs text-[#8A968E]/80 mt-1">Try searching for “Action”, “Fantasy”, or “Demon Slayer”.</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAnime(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#17231A] via-[#141E17] to-[#121A14] border border-[#39E66B]/50 shadow-[0_2px_12px_rgba(57,230,107,0.1)]'
                      : 'bg-[#121814]/40 hover:bg-[#151D17] border border-transparent hover:border-[#2A372E]'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#080A09] border border-[#232F26] shadow-sm">
                      <AnimeImage
                        src={item.posterUrl}
                        alt={item.title}
                        aspectRatio="2/3"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-semibold truncate transition-colors ${
                          isSelected ? 'text-[#39E66B]' : 'text-[#F5F7F5] group-hover:text-[#39E66B]'
                        }`}>
                          {item.title}
                        </h4>
                        {item.ratingLabel && (
                          <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-[#39E66B]/15 text-[#39E66B] font-mono text-[10px] font-bold">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            {item.ratingLabel}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8A968E] truncate mt-0.5">
                        {item.genres.join(' • ')}
                      </p>
                      <span className="text-[11px] text-[#7E8B82] mt-0.5 inline-block">
                        {item.year} {item.episodes ? `• ${item.episodes}` : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pl-3 flex-shrink-0">
                    <span className={`text-xs font-semibold flex items-center gap-1 transition-opacity ${
                      isSelected ? 'opacity-100 text-[#39E66B]' : 'opacity-70 sm:opacity-0 group-hover:opacity-100 text-[#39E66B]'
                    }`}>
                      <span>Watch</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Keyboard Shortcuts Bar */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#090D0A] border-t border-[#1C251F] flex items-center justify-between text-[11px] text-[#76837A] select-none">
          <div className="hidden sm:flex items-center space-x-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-[#121914] border border-[#232F26] rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-[#121914] border border-[#232F26] rounded">↓</kbd>
              <span className="ml-1">to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-[#121914] border border-[#232F26] rounded">↵</kbd>
              <span className="ml-1">to select</span>
            </span>
          </div>
          <span className="flex items-center gap-1 ml-auto">
            <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-[#121914] border border-[#232F26] rounded">ESC</kbd>
            <span className="ml-1">to close</span>
          </span>
        </div>
      </div>
    </div>
  );
};
