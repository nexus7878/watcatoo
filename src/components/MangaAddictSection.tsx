import React, { useState } from 'react';
import { MANGA_ADDICT_COLLECTION, MangaItem } from '../data/mangaData';
import { 
  BookOpen, 
  Bookmark, 
  Check, 
  ChevronRight, 
  Star, 
  Sparkles, 
  X,
  ChevronLeft,
  FileText,
  ArrowRight
} from 'lucide-react';

interface MangaAddictSectionProps {
  onNavigateToManga?: () => void;
  isLoggedIn?: boolean;
  onRequireAuth?: (message: string, onSuccess?: () => void) => void;
}

export const MangaAddictSection: React.FC<MangaAddictSectionProps> = ({ 
  onNavigateToManga,
  isLoggedIn = false,
  onRequireAuth
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fantasy' | 'action' | 'mystery' | 'comedy' | 'romance'>('all');
  const [selectedMangaId, setSelectedMangaId] = useState<string>('bocchi-the-rock');
  const [readingList, setReadingList] = useState<Record<string, boolean>>({});
  
  // Interactive Reader Modal state
  const [readerModal, setReaderModal] = useState<{
    isOpen: boolean;
    manga: MangaItem | null;
    currentChapter: string;
    currentPage: number;
    totalPages: number;
    isFullscreen: boolean;
  }>({
    isOpen: false,
    manga: null,
    currentChapter: '',
    currentPage: 1,
    totalPages: 32,
    isFullscreen: false,
  });

  const activeManga = MANGA_ADDICT_COLLECTION.find((m) => m.id === selectedMangaId) || MANGA_ADDICT_COLLECTION[0];

  const categoryFilters = [
    { id: 'all', label: 'All', count: MANGA_ADDICT_COLLECTION.length },
    { id: 'action', label: 'Action & Super', count: MANGA_ADDICT_COLLECTION.filter(m => m.category === 'action').length },
    { id: 'comedy', label: 'Comedy & Slice', count: MANGA_ADDICT_COLLECTION.filter(m => m.category === 'comedy').length },
    { id: 'fantasy', label: 'Fantasy & Isekai', count: MANGA_ADDICT_COLLECTION.filter(m => m.category === 'fantasy').length },
    { id: 'mystery', label: 'Mystery', count: MANGA_ADDICT_COLLECTION.filter(m => m.category === 'mystery').length },
    { id: 'romance', label: 'Romance', count: MANGA_ADDICT_COLLECTION.filter(m => m.category === 'romance').length },
  ] as const;

  const filteredManga = MANGA_ADDICT_COLLECTION.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleReadingList = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setReadingList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openReader = (manga: MangaItem, chapterNumber?: string) => {
    const chapter = manga.sampleChapters.find((c) => c.chapterNumber === chapterNumber) || manga.sampleChapters[0];
    setReaderModal({
      isOpen: true,
      manga,
      currentChapter: chapterNumber || chapter?.chapterNumber || 'Ch. 1',
      currentPage: 1,
      totalPages: chapter?.pages || 32,
      isFullscreen: false,
    });
  };

  const handleReadAction = (manga: MangaItem, chapterNumber?: string) => {
    if (!isLoggedIn && onRequireAuth) {
      onRequireAuth(`Sign in to read ${manga.title}`, () => openReader(manga, chapterNumber));
      return;
    }
    openReader(manga, chapterNumber);
  };

  const closeReader = () => {
    setReaderModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section id="manga" className="py-10 sm:py-16 md:py-24 bg-[#080A09] border-y border-[#262D28] relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* =====================================================================
            1. SECTION HEADER
           ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-[#39E66B] rounded-full inline-block" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#39E66B]">
                Official Publication • 漫画アディクト
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#F5F7F5] tracking-tight">
              Manga Addict
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
              <p className="text-sm sm:text-base text-[#A0AAA2] max-w-2xl">
                Immerse yourself in officially licensed manga chapters, same-day Tokyo simulpubs, and rich graphic novels straight from master mangakas.
              </p>
              <button
                type="button"
                onClick={() => (onNavigateToManga ? onNavigateToManga() : (window.location.hash = 'manga'))}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#151A16] hover:bg-[#1A221D] border border-[#39E66B]/30 hover:border-[#39E66B] rounded-lg text-xs font-semibold text-[#39E66B] transition-colors flex-shrink-0 self-start sm:self-auto shadow-xs"
              >
                <span>Full Manga Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none self-start md:self-auto w-full max-w-full">
            {categoryFilters.map((tab) => {
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
            2. FEATURED MANGA SPOTLIGHT DECK
           ===================================================================== */}
        <div id="manga-spotlight" className="mb-10 rounded-2xl bg-[#0D110E] border border-[#262D28] overflow-hidden shadow-2xl scroll-mt-28 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Cover Preview (4 cols): Realistic Book Presentation */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex items-center justify-center bg-gradient-to-br from-[#121713] to-[#0A0D0A] border-b lg:border-b-0 lg:border-r border-[#262D28]">
              <div 
                onClick={() => handleReadAction(activeManga)}
                className="relative group cursor-pointer max-w-[260px] w-full"
              >
                {/* Book Drop Shadow & Glow */}
                <div className="absolute -inset-2 bg-[#39E66B]/10 rounded-2xl blur-xl group-hover:bg-[#39E66B]/20 transition-all duration-500 opacity-70" />
                
                {/* Book Card Container */}
                <div className="relative rounded-xl overflow-hidden border border-[#262D28] shadow-2xl bg-[#101411] group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={activeManga.coverUrl}
                    alt={activeManga.title}
                    onError={(e) => {
                      if (activeManga.fallbackUrl) {
                        (e.target as HTMLImageElement).src = activeManga.fallbackUrl;
                      }
                    }}
                    className="w-full aspect-[2/3] object-cover"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#080A09]/90 border border-[#262D28] text-xs font-bold text-[#39E66B] flex items-center gap-1 backdrop-blur-xs">
                    <Star className="w-3.5 h-3.5 fill-[#39E66B]" />
                    <span>{activeManga.rating}</span>
                  </div>

                  {/* Status Pill */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#080A09]/90 border border-[#39E66B]/40 text-[10px] font-bold uppercase tracking-wider text-[#39E66B] backdrop-blur-xs">
                    {activeManga.status}
                  </div>

                  {/* Read Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-[#39E66B] text-[#080A09] font-bold text-xs flex items-center gap-2 shadow-xl">
                      <BookOpen className="w-4 h-4" />
                      <span>Start Reading</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-3 text-[11px] text-[#A0AAA2] font-medium">
                  Click cover to open reader
                </div>
              </div>
            </div>

            {/* Right Details Panel (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div>
                
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#39E66B]/15 border border-[#39E66B]/30 text-[#39E66B] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Spotlight Series
                  </span>
                  <span className="text-xs text-[#A0AAA2] bg-[#151A16] px-2.5 py-0.5 rounded border border-[#262D28]">
                    {activeManga.publisher}
                  </span>
                  <span className="text-xs text-[#39E66B] bg-[#151A16] px-2.5 py-0.5 rounded border border-[#262D28]">
                    {activeManga.categoryLabel}
                  </span>
                </div>

                {/* Title & Kanji Subtitle */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5F7F5] tracking-tight leading-tight">
                  {activeManga.title}
                </h3>
                {activeManga.subtitle && (
                  <div className="text-xs sm:text-sm font-semibold text-[#39E66B] mt-1">
                    {activeManga.subtitle}
                  </div>
                )}
                <div className="text-xs text-[#A0AAA2]/80 mt-0.5">
                  {activeManga.originalTitle}
                </div>

                {/* Creators & Stats */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#A0AAA2] pb-3 border-b border-[#262D28]">
                  <span>Story: <strong className="text-[#F5F7F5]">{activeManga.author}</strong></span>
                  {activeManga.artist && (
                    <>
                      <span>•</span>
                      <span>Art: <strong className="text-[#F5F7F5]">{activeManga.artist}</strong></span>
                    </>
                  )}
                  <span>•</span>
                  <span>Total: <strong className="text-[#39E66B]">{activeManga.totalChapters}</strong></span>
                </div>

                {/* Synopsis */}
                <p className="mt-3 text-xs sm:text-sm text-[#A0AAA2] leading-relaxed line-clamp-3">
                  {activeManga.synopsis}
                </p>

                {/* Sample Chapters Quick-List */}
                <div className="mt-5">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-[#A0AAA2] mb-2 flex items-center justify-between">
                    <span>Available Chapters</span>
                    <span className="text-[#39E66B] font-mono text-[10px]">Verified Kadokawa Simulpub</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeManga.sampleChapters.slice(0, 3).map((chap, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleReadAction(activeManga, chap.chapterNumber)}
                        className="p-2.5 rounded-lg bg-[#141915] border border-[#262D28] hover:border-[#39E66B]/60 transition-colors cursor-pointer group/chap flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#F5F7F5] group-hover/chap:text-[#39E66B]">
                          <span>{chap.chapterNumber}</span>
                          <span className="text-[10px] text-[#A0AAA2] font-normal">{chap.pages} pages</span>
                        </div>
                        <div className="text-[11px] text-[#A0AAA2] truncate mt-1">
                          {chap.title}
                        </div>
                        <div className="text-[9px] text-[#39E66B] font-mono mt-1">
                          {chap.releaseDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#262D28] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleReadAction(activeManga)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39E66B] text-[#080A09] font-bold text-xs sm:text-sm shadow-md shadow-[#39E66B]/20 hover:bg-[#20C45A] hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Chapter 1 Free</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleReadAction(activeManga)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151A16] border border-[#262D28] text-[#F5F7F5] hover:border-[#39E66B]/60 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#39E66B]" />
                  <span>Chapter Index</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleReadingList(e, activeManga.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    readingList[activeManga.id]
                      ? 'bg-[#39E66B]/15 border-[#39E66B] text-[#39E66B]'
                      : 'bg-[#151A16] border-[#262D28] text-[#A0AAA2] hover:text-[#F5F7F5] hover:border-[#39E66B]/40'
                  }`}
                >
                  {readingList[activeManga.id] ? (
                    <>
                      <Check className="w-4 h-4 text-[#39E66B]" />
                      <span>In Library</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmark</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* =====================================================================
            3. ALL 7 MANGA CARDS GRID
           ===================================================================== */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F7F5] tracking-tight">
              Manga & Graphic Novels Vault
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AAA2]">
              Select any title to preview chapter pages and synopsis.
            </p>
          </div>
          <span className="text-xs text-[#A0AAA2] bg-[#101411] border border-[#262D28] px-3 py-1.5 rounded-xl font-mono">
            {filteredManga.length} Titles Available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredManga.map((manga) => {
            const isSelected = manga.id === activeManga.id;
            return (
              <div
                key={manga.id}
                onClick={() => {
                  setSelectedMangaId(manga.id);
                  const el = document.getElementById('manga-spotlight');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedMangaId(manga.id);
                    const el = document.getElementById('manga-spotlight');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${manga.title}`}
                className={`group relative bg-[#101411] border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] ${
                  isSelected
                    ? 'border-[#39E66B] ring-2 ring-[#39E66B]/50 shadow-lg shadow-[#39E66B]/15 scale-[1.01]'
                    : 'border-[#262D28] hover:border-[#39E66B]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50'
                }`}
              >
                {/* 2:3 Cover Artwork */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#080A09]">
                  <img
                    src={manga.coverUrl}
                    alt={manga.title}
                    onError={(e) => {
                      if (manga.fallbackUrl) {
                        (e.target as HTMLImageElement).src = manga.fallbackUrl;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101411] via-transparent to-transparent opacity-80" />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#080A09]/90 border border-[#262D28] text-[11px] font-bold text-[#39E66B] flex items-center gap-1 backdrop-blur-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{manga.rating}</span>
                  </div>

                  {/* Status Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#080A09]/90 border border-[#39E66B]/30 text-[10px] font-bold uppercase tracking-wider text-[#39E66B] backdrop-blur-xs">
                    {manga.status}
                  </div>

                  {/* Quick Read Overlay on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadAction(manga);
                      }}
                      className="w-full py-2 bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#39E66B]/25"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Free</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMangaId(manga.id);
                        const el = document.getElementById('manga-spotlight');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }}
                      className="w-full py-1.5 bg-[#151A16] hover:bg-[#1A221D] border border-[#262D28] text-[11px] text-[#F5F7F5] rounded-lg transition-colors"
                    >
                      View in Spotlight
                    </button>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-[#39E66B] mb-1 truncate">
                      {manga.categoryLabel}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors line-clamp-1 leading-snug">
                      {manga.title}
                    </h4>

                    <div className="text-[11px] text-[#A0AAA2] mt-0.5 truncate">
                      By {manga.author}
                    </div>

                    <p className="mt-1.5 text-xs text-[#A0AAA2] line-clamp-2 leading-relaxed">
                      {manga.synopsis}
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-3 pt-2.5 border-t border-[#262D28] flex items-center justify-between text-xs font-semibold text-[#A0AAA2] group-hover:text-[#39E66B] transition-colors">
                    <span className="truncate">{manga.latestChapter.split(':')[0]}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadAction(manga);
                      }}
                      className="flex items-center gap-1 text-[#39E66B] hover:underline flex-shrink-0 ml-1"
                    >
                      Read
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* =====================================================================
          4. INTERACTIVE MANGA READER PREVIEW MODAL
         ===================================================================== */}
      {readerModal.isOpen && readerModal.manga && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeReader}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-[#0D110E] border border-[#262D28] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#121814] border-b border-[#262D28] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-11 rounded overflow-hidden flex-shrink-0 bg-[#080A09] border border-[#262D28]">
                  <img src={readerModal.manga.coverUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-[#F5F7F5] truncate">
                    {readerModal.manga.title}
                  </h4>
                  <p className="text-[11px] text-[#39E66B] font-mono truncate">
                    Reading: {readerModal.currentChapter} • {readerModal.manga.publisher}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline font-mono text-[11px] text-[#A0AAA2] px-2.5 py-1 rounded bg-[#080A09] border border-[#262D28]">
                  Page {readerModal.currentPage} of {readerModal.totalPages}
                </span>

                <button
                  type="button"
                  onClick={closeReader}
                  className="p-1.5 rounded-lg bg-[#151A16] text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#1a211b] border border-[#262D28] transition-colors"
                  aria-label="Close reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Reader Viewport */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-between bg-[#080A09]">
              
              {/* Center Page Canvas */}
              <div className="relative max-w-sm sm:max-w-md w-full aspect-[2/3] rounded-xl overflow-hidden border border-[#262D28] shadow-2xl bg-[#101411] flex flex-col justify-between p-4 sm:p-6 text-center select-none">
                
                {/* Header Spine Marks */}
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#A0AAA2] border-b border-[#262D28] pb-2">
                  <span>{readerModal.manga.publisher.split('/')[0]}</span>
                  <span className="text-[#39E66B]">STUDIO VERIFIED COPY</span>
                  <span>{readerModal.currentChapter}</span>
                </div>

                {/* Simulated Content */}
                <div className="flex-1 flex flex-col items-center justify-center p-2">
                  {readerModal.currentPage === 1 ? (
                    <div className="space-y-3">
                      <div className="w-28 sm:w-36 aspect-[2/3] mx-auto rounded-lg overflow-hidden border border-[#262D28] shadow-lg">
                        <img src={readerModal.manga.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-[#F5F7F5]">{readerModal.manga.title}</h4>
                        <p className="text-xs text-[#39E66B] font-mono mt-0.5">{readerModal.currentChapter}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-[#151A16] border border-[#39E66B]/30 flex items-center justify-center mx-auto text-[#39E66B]">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-[#F5F7F5]">Page {readerModal.currentPage} of {readerModal.totalPages}</h4>
                      <p className="text-xs text-[#A0AAA2] max-w-xs mx-auto">
                        High-definition studio page master. Uncompressed Japanese reading spread with lossless linework.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Page Marker */}
                <div className="w-full text-center text-[10px] font-mono text-[#A0AAA2] pt-2 border-t border-[#262D28]">
                  — Page {readerModal.currentPage} —
                </div>
              </div>

              {/* Reader Floating Controls Bar */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReaderModal(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                  disabled={readerModal.currentPage === 1}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#151A16] hover:bg-[#1A221D] border border-[#262D28] text-xs font-semibold text-[#F5F7F5] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-[#39E66B]" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max={readerModal.totalPages}
                    value={readerModal.currentPage}
                    onChange={(e) => setReaderModal(prev => ({ ...prev, currentPage: Number(e.target.value) }))}
                    className="w-24 sm:w-36 accent-[#39E66B] cursor-pointer"
                  />
                  <span className="text-xs text-[#A0AAA2] font-mono">
                    {readerModal.currentPage} / {readerModal.totalPages}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setReaderModal(prev => ({ ...prev, currentPage: Math.min(prev.totalPages, prev.currentPage + 1) }))}
                  disabled={readerModal.currentPage === readerModal.totalPages}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] text-xs font-bold disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Bottom Chapter Switcher Strip */}
            <div className="p-3 bg-[#101411] border-t border-[#262D28]">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-semibold text-[#A0AAA2] whitespace-nowrap pl-1">
                  Chapters:
                </span>
                {readerModal.manga.sampleChapters.map((chap) => (
                  <button
                    key={chap.chapterNumber}
                    type="button"
                    onClick={() => setReaderModal(prev => ({ ...prev, currentChapter: chap.chapterNumber, currentPage: 1 }))}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap border transition-all ${
                      readerModal.currentChapter === chap.chapterNumber
                        ? 'bg-[#39E66B] text-[#080A09] font-bold border-[#39E66B]'
                        : 'bg-[#151A16] text-[#A0AAA2] hover:text-[#F5F7F5] border-[#262D28]'
                    }`}
                  >
                    {chap.chapterNumber}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
