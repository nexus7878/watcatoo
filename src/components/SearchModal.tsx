import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Film, ArrowRight } from 'lucide-react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? animeList.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.genres.some((g) => g.toLowerCase().includes(query.toLowerCase())) ||
          (item.synopsis && item.synopsis.toLowerCase().includes(query.toLowerCase()))
      )
    : animeList.slice(0, 6); // default suggestions

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#101411] border border-[#262D28] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#262D28] bg-[#151A16]">
          <Search className="w-5 h-5 text-[#39E66B] flex-shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime by title, genre (Action, Fantasy...) or keyword..."
            className="w-full bg-transparent text-[#F5F7F5] placeholder-[#A0AAA2] text-sm focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#A0AAA2] hover:text-[#F5F7F5]"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#A0AAA2] bg-[#080A09] border border-[#262D28] rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Trending Search Suggestions Chips */}
        <div className="px-4 py-2.5 bg-[#101411] border-b border-[#262D28] flex items-center space-x-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[11px] font-semibold text-[#A0AAA2] uppercase tracking-wider flex-shrink-0">
            Trending:
          </span>
          {['Solo Leveling', 'Demon Slayer', 'Jujutsu Kaisen', 'One Piece', 'Action', 'Fantasy'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#151A16] hover:bg-[#1a221d] hover:text-[#39E66B] border border-[#262D28] text-[#A0AAA2] text-[11px] font-medium transition-colors flex-shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#A0AAA2] px-2 mb-2">
            <span>
              {query ? `Found ${filtered.length} matches` : 'Featured Recommendations'}
            </span>
            <span className="text-[11px] text-[#39E66B]">Live Discovery</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#A0AAA2]">
              <Film className="w-8 h-8 text-[#262D28] mx-auto mb-2" />
              <p className="text-sm">No results found for “{query}”.</p>
              <p className="text-xs text-[#A0AAA2]/70 mt-1">Try searching for “Action”, “Fantasy”, or “Demon Slayer”.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectAnime(item);
                  onClose();
                }}
                className="group flex items-center justify-between p-2.5 rounded-lg bg-[#151A16]/50 hover:bg-[#151A16] border border-transparent hover:border-[#39E66B]/30 cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-[#080A09]">
                    <AnimeImage
                      src={item.posterUrl}
                      alt={item.title}
                      aspectRatio="2/3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#A0AAA2] truncate">
                      {item.genres.join(' • ')}
                    </p>
                    <span className="text-[10px] text-[#A0AAA2]/70 mt-0.5 inline-block">
                      {item.year} {item.episodes ? `• ${item.episodes}` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pl-3">
                  <span className="opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-[#39E66B] flex items-center gap-1">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
