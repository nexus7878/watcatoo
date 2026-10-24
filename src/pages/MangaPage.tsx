import React, { useState, useMemo } from 'react';
import { 
  MANGA_ADDICT_COLLECTION, 
  MangaItem, 
  MangaCategory 
} from '../data/mangaData';
import { 
  BookOpen, 
  Bookmark, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Sparkles, 
  Search, 
  Filter, 
  X, 
  Maximize2, 
  Minimize2,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

interface MangaPageProps {
  onNavigateHome?: () => void;
  isLoggedIn?: boolean;
  onRequireAuth?: (message: string, onSuccess?: () => void) => void;
}

export const MangaPage: React.FC<MangaPageProps> = ({
  isLoggedIn,
  onRequireAuth,
}) => {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MangaCategory | 'reading-list'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Simulpub' | 'Completed' | 'Ongoing'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'chapters'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Bookmarking / Reading list state
  const [readingList, setReadingList] = useState<Record<string, boolean>>({});

  // Active detail modal
  const [detailManga, setDetailManga] = useState<MangaItem | null>(null);

  // Active Interactive Reader Modal
  const [readerState, setReaderState] = useState<{
    isOpen: boolean;
    manga: MangaItem | null;
    chapterNumber: string;
    chapterTitle: string;
    currentPage: number;
    totalPages: number;
    isFullscreen: boolean;
  }>({
    isOpen: false,
    manga: null,
    chapterNumber: '',
    chapterTitle: '',
    currentPage: 1,
    totalPages: 32,
    isFullscreen: false,
  });

  // Featured Spotlight manga (defaults to Bocchi the Rock)
  const [spotlightManga, setSpotlightManga] = useState<MangaItem>(() => {
    return MANGA_ADDICT_COLLECTION.find((m) => m.id === 'bocchi-the-rock') || MANGA_ADDICT_COLLECTION[0];
  });

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setReadingList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openReader = (manga: MangaItem, chapterNumber?: string) => {
    if (!isLoggedIn && onRequireAuth) {
      onRequireAuth(`Sign in to read ${manga.title} and access all licensed chapters.`, () => {
        openReader(manga, chapterNumber);
      });
      return;
    }

    const chapter = manga.sampleChapters.find((c) => c.chapterNumber === chapterNumber) || manga.sampleChapters[0];
    setReaderState({
      isOpen: true,
      manga,
      chapterNumber: chapter?.chapterNumber || 'Ch. 1',
      chapterTitle: chapter?.title || 'Preview Chapter',
      currentPage: 1,
      totalPages: chapter?.pages || 32,
      isFullscreen: false,
    });
  };

  const closeReader = () => {
    setReaderState((prev) => ({ ...prev, isOpen: false }));
  };

  // Categories configuration with dynamic counts
  const categories = useMemo(() => [
    { id: 'all' as const, label: 'All Manga', count: MANGA_ADDICT_COLLECTION.length },
    { id: 'action' as const, label: 'Action & Supernatural', count: MANGA_ADDICT_COLLECTION.filter((m) => m.category === 'action').length },
    { id: 'fantasy' as const, label: 'Fantasy & Isekai', count: MANGA_ADDICT_COLLECTION.filter((m) => m.category === 'fantasy').length },
    { id: 'mystery' as const, label: 'Mystery & Drama', count: MANGA_ADDICT_COLLECTION.filter((m) => m.category === 'mystery').length },
    { id: 'comedy' as const, label: 'Comedy & Slice of Life', count: MANGA_ADDICT_COLLECTION.filter((m) => m.category === 'comedy').length },
    { id: 'romance' as const, label: 'Romance & School', count: MANGA_ADDICT_COLLECTION.filter((m) => m.category === 'romance').length },
    { id: 'reading-list' as const, label: 'Saved Reading List', count: Object.values(readingList).filter(Boolean).length },
  ], [readingList]);

  // Filtered & Sorted Manga items
  const filteredMangaList = useMemo(() => {
    return MANGA_ADDICT_COLLECTION
      .filter((manga) => {
        // Category Filter
        if (selectedCategory === 'reading-list') {
          if (!readingList[manga.id]) return false;
        } else if (selectedCategory !== 'all') {
          if (manga.category !== selectedCategory) return false;
        }

        // Status Filter
        if (selectedStatus !== 'all' && manga.status !== selectedStatus) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = manga.title.toLowerCase().includes(q);
          const matchOriginal = manga.originalTitle.toLowerCase().includes(q);
          const matchAuthor = manga.author.toLowerCase().includes(q);
          const matchPublisher = manga.publisher.toLowerCase().includes(q);
          const matchTags = manga.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchOriginal && !matchAuthor && !matchPublisher && !matchTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return parseFloat(b.rating) - parseFloat(a.rating);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'chapters') {
          const aCount = parseInt(a.totalChapters, 10) || 0;
          const bCount = parseInt(b.totalChapters, 10) || 0;
          return bCount - aCount;
        }
        return 0;
      });
  }, [selectedCategory, selectedStatus, searchQuery, sortBy, readingList]);

  return (
    <div className="pt-20 md:pt-24 pb-24 bg-[#080A09] min-h-screen text-[#F5F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =====================================================================
            1. EDITORIAL HERO & SPOTLIGHT
           ===================================================================== */}
        <section className="mb-12 md:mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-[#262D28] bg-gradient-to-br from-[#101411] via-[#0D100E] to-[#080A09] shadow-2xl p-6 sm:p-8 md:p-10">
            {/* Ambient Background Aura */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#39E66B]/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-[#39E66B]/5 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* Left: Text & Badges */}
              <div className="flex-1 space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A16] border border-[#39E66B]/30 text-xs font-semibold text-[#39E66B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#39E66B]" />
                  <span className="uppercase tracking-widest text-[11px]">WATCatoo Manga Addict</span>
                  <span className="text-[#A0AAA2]">•</span>
                  <span className="text-[#A0AAA2]">35 Curated Masterpieces</span>
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F5F7F5] tracking-tight leading-[1.1]">
                    The Manga <span className="text-[#39E66B]">Addict</span> Hub
                  </h1>
                  <p className="mt-3 text-sm sm:text-base md:text-lg text-[#A0AAA2] max-w-2xl leading-relaxed">
                    Official licensed translations, daily simulpubs, and collector-tier tankōbon covers direct from Japan's leading publishers — Kadokawa, Houbunsha, Square Enix, and Bushiroad.
                  </p>
                </div>

                {/* Spotlight Manga Micro-Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#080A09]/80 border border-[#262D28] flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-[#39E66B] uppercase tracking-wider font-semibold">Featured Spotlight</span>
                      <span className="text-[#A0AAA2]">•</span>
                      <span className="text-xs text-[#A0AAA2]">{spotlightManga.categoryLabel}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#F5F7F5] flex items-center gap-2">
                      {spotlightManga.title}
                      <span className="text-xs font-normal text-[#A0AAA2] hidden sm:inline">({spotlightManga.originalTitle})</span>
                    </h3>
                    <p className="text-xs text-[#A0AAA2] mt-0.5 line-clamp-1 max-w-md">
                      By {spotlightManga.author} • {spotlightManga.publisher}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => openReader(spotlightManga)}
                      className="px-4 py-2 text-xs font-semibold bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] rounded-lg transition-all shadow-sm flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Free Ch. 1</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetailManga(spotlightManga)}
                      className="px-3 py-2 text-xs font-medium bg-[#151A16] hover:bg-[#1A221D] text-[#F5F7F5] border border-[#262D28] hover:border-[#39E66B]/30 rounded-lg transition-all focus:outline-none"
                    >
                      Details
                    </button>
                  </div>
                </div>

                {/* Quick Quality Standards Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="px-3 py-2 rounded-lg bg-[#101411]/70 border border-[#262D28]/80 text-left">
                    <div className="text-[11px] font-mono text-[#39E66B] font-semibold">100% LEGAL</div>
                    <div className="text-xs text-[#F5F7F5] font-medium">Licensed Covers</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-[#101411]/70 border border-[#262D28]/80 text-left">
                    <div className="text-[11px] font-mono text-[#39E66B] font-semibold">SIMULPUB</div>
                    <div className="text-xs text-[#F5F7F5] font-medium">Same-Day Releases</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-[#101411]/70 border border-[#262D28]/80 text-left">
                    <div className="text-[11px] font-mono text-[#39E66B] font-semibold">FREE CH. 1</div>
                    <div className="text-xs text-[#F5F7F5] font-medium">Sample Every Title</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-[#101411]/70 border border-[#262D28]/80 text-left">
                    <div className="text-[11px] font-mono text-[#39E66B] font-semibold">HD SAKUGA</div>
                    <div className="text-xs text-[#F5F7F5] font-medium">Lossless Double-Spread</div>
                  </div>
                </div>
              </div>

              {/* Right: Cover Showcase Trio */}
              <div className="w-full lg:w-auto flex items-center justify-center gap-3 sm:gap-4 flex-shrink-0">
                {MANGA_ADDICT_COLLECTION.filter((m) => m.featured).slice(0, 3).map((manga, idx) => {
                  const isCenter = idx === 1;
                  return (
                    <div
                      key={manga.id}
                      onClick={() => {
                        setSpotlightManga(manga);
                        setDetailManga(manga);
                      }}
                      className={`group cursor-pointer transition-all duration-300 relative ${
                        isCenter
                          ? 'scale-105 z-20 shadow-2xl -translate-y-2'
                          : 'scale-95 opacity-80 hover:opacity-100 hover:scale-100 z-10'
                      }`}
                    >
                      <div className="w-28 sm:w-36 md:w-40 aspect-[2/3] rounded-xl overflow-hidden border-2 border-[#262D28] group-hover:border-[#39E66B]/60 shadow-lg relative bg-[#101411]">
                        <img
                          src={manga.coverUrl}
                          alt={manga.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                          <span className="text-[10px] font-semibold text-[#39E66B] truncate">Click to view</span>
                        </div>
                      </div>
                      <div className="mt-2 text-center max-w-[140px]">
                        <p className="text-xs font-bold text-[#F5F7F5] truncate group-hover:text-[#39E66B] transition-colors">
                          {manga.title}
                        </p>
                        <span className="text-[10px] text-[#A0AAA2] font-mono flex items-center justify-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-[#39E66B] text-[#39E66B]" /> {manga.rating}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================================
            2. DISCOVERY & FILTER TOOLBAR
           ===================================================================== */}
        <section className="mb-8 space-y-4">
          
          {/* Top Row: Search Input & Sort Options */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#A0AAA2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search manga by title, author, or publisher..."
                className="w-full h-10 pl-10 pr-9 bg-[#101411] border border-[#262D28] focus:border-[#39E66B]/60 rounded-xl text-xs sm:text-sm text-[#F5F7F5] placeholder-[#A0AAA2]/70 focus:outline-none focus:ring-1 focus:ring-[#39E66B] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AAA2] hover:text-[#F5F7F5]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right Tools: Sort By, Status Filter, View Toggle */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-[#101411] border border-[#262D28] px-2.5 py-1.5 rounded-lg text-xs">
                <Filter className="w-3.5 h-3.5 text-[#39E66B]" />
                <span className="text-[#A0AAA2] text-[11px]">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="bg-transparent text-[#F5F7F5] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#101411]">All Statuses</option>
                  <option value="Simulpub" className="bg-[#101411]">Simulpub</option>
                  <option value="Ongoing" className="bg-[#101411]">Ongoing</option>
                  <option value="Completed" className="bg-[#101411]">Completed</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 bg-[#101411] border border-[#262D28] px-2.5 py-1.5 rounded-lg text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#39E66B]" />
                <span className="text-[#A0AAA2] text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#F5F7F5] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="rating" className="bg-[#101411]">Highest Rated</option>
                  <option value="title" className="bg-[#101411]">Title (A-Z)</option>
                  <option value="chapters" className="bg-[#101411]">Most Chapters</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-[#101411] border border-[#262D28] p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewMode === 'grid' ? 'bg-[#151A16] text-[#39E66B]' : 'text-[#A0AAA2] hover:text-[#F5F7F5]'
                  }`}
                  title="Grid View"
                  aria-label="Grid view"
                >
                  <Layers className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewMode === 'compact' ? 'bg-[#151A16] text-[#39E66B]' : 'text-[#A0AAA2] hover:text-[#F5F7F5]'
                  }`}
                  title="Compact View"
                  aria-label="Compact view"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Row: Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all flex items-center gap-2 border flex-shrink-0 ${
                    isActive
                      ? 'bg-[#39E66B] text-[#080A09] font-bold border-[#39E66B] shadow-xs'
                      : 'bg-[#101411] text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] border-[#262D28]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#080A09]/20 text-[#080A09]' : 'bg-[#151A16] text-[#A0AAA2]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </section>

        {/* =====================================================================
            3. RESULTS COUNT & ACTIVE FILTER BAR
           ===================================================================== */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#262D28]">
          <div className="text-xs text-[#A0AAA2]">
            Showing <span className="font-mono text-[#F5F7F5] font-bold">{filteredMangaList.length}</span> titles
            {selectedCategory !== 'all' && (
              <span> in <strong className="text-[#39E66B] capitalize">{selectedCategory.replace('-', ' ')}</strong></span>
            )}
            {searchQuery && (
              <span> matching "<span className="text-[#F5F7F5]">{searchQuery}</span>"</span>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="text-xs text-[#39E66B] hover:underline flex items-center gap-1"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* =====================================================================
            4. MANGA COLLECTION GRID
           ===================================================================== */}
        {filteredMangaList.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#101411]/50 border border-[#262D28] p-8">
            <BookOpen className="w-12 h-12 text-[#262D28] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#F5F7F5]">No manga matched your filter</h3>
            <p className="text-xs sm:text-sm text-[#A0AAA2] mt-1 max-w-sm mx-auto">
              Try searching with a different keyword, clearing your genre filter, or resetting your reading list.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-4 px-4 py-2 bg-[#151A16] hover:bg-[#1A221D] border border-[#262D28] text-xs font-semibold text-[#39E66B] rounded-lg transition-colors"
            >
              Show All Manga
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredMangaList.map((manga) => {
              const isBookmarked = !!readingList[manga.id];
              return (
                <div
                  key={manga.id}
                  onClick={() => setDetailManga(manga)}
                  className="group flex flex-col bg-[#101411] border border-[#262D28] hover:border-[#39E66B]/50 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                >
                  {/* Book Cover Container with 2:3 ratio */}
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#0D100E]">
                    <img
                      src={manga.coverUrl}
                      alt={manga.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Badges: Rating & Bookmark */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#080A09]/85 backdrop-blur-xs border border-white/10 text-[10px] font-mono text-[#F5F7F5] font-semibold">
                        <Star className="w-2.5 h-2.5 fill-[#39E66B] text-[#39E66B]" />
                        {manga.rating}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(e, manga.id)}
                        className={`pointer-events-auto p-1.5 rounded-md backdrop-blur-xs transition-colors ${
                          isBookmarked
                            ? 'bg-[#39E66B] text-[#080A09]'
                            : 'bg-[#080A09]/75 text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#080A09]'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark volume'}
                        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark volume'}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Status Ribbon */}
                    <div className="absolute bottom-2 left-2 pointer-events-none">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-xs ${
                        manga.status === 'Simulpub'
                          ? 'bg-[#39E66B]/90 text-[#080A09]'
                          : manga.status === 'Completed'
                          ? 'bg-[#151A16]/90 text-[#A0AAA2] border border-[#262D28]'
                          : 'bg-[#080A09]/85 text-[#39E66B] border border-[#39E66B]/30'
                      }`}>
                        {manga.status}
                      </span>
                    </div>

                    {/* Hover Quick Read Action Overlay */}
                    <div className="absolute inset-0 bg-[#080A09]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openReader(manga);
                        }}
                        className="w-full py-2 bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Free</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailManga(manga);
                        }}
                        className="w-full py-1.5 bg-[#151A16] hover:bg-[#1A221D] text-[#F5F7F5] text-[11px] font-medium rounded-lg border border-[#262D28] transition-colors text-center"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Metadata Content */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors line-clamp-1">
                        {manga.title}
                      </h4>
                      <p className="text-[11px] text-[#A0AAA2] mt-0.5 line-clamp-1">
                        {manga.author}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#262D28]/60 flex items-center justify-between text-[10px] text-[#A0AAA2]">
                      <span className="truncate max-w-[100px]">{manga.publisher.split('/')[0]}</span>
                      <span className="font-mono text-[#39E66B] flex-shrink-0">{manga.totalChapters.split(' ')[0]} ch</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Compact List View */
          <div className="space-y-3">
            {filteredMangaList.map((manga) => {
              const isBookmarked = !!readingList[manga.id];
              return (
                <div
                  key={manga.id}
                  onClick={() => setDetailManga(manga)}
                  className="group p-3 sm:p-4 rounded-xl bg-[#101411] border border-[#262D28] hover:border-[#39E66B]/40 transition-all flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <img
                      src={manga.coverUrl}
                      alt={manga.title}
                      className="w-12 h-16 sm:w-14 sm:h-20 object-cover rounded-md border border-[#262D28] flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold text-[#39E66B] uppercase tracking-wider">{manga.status}</span>
                        <span className="text-[#A0AAA2] text-[10px]">•</span>
                        <span className="text-[10px] text-[#A0AAA2] truncate">{manga.categoryLabel}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors truncate">
                        {manga.title}
                      </h4>
                      <p className="text-xs text-[#A0AAA2] truncate mt-0.5">
                        By {manga.author} {manga.artist ? `& ${manga.artist}` : ''} • Published by {manga.publisher}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className="hidden md:flex flex-col items-end text-right">
                      <span className="text-xs font-mono text-[#F5F7F5] font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#39E66B] text-[#39E66B]" /> {manga.rating}
                      </span>
                      <span className="text-[11px] text-[#A0AAA2]">{manga.totalChapters}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(e, manga.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isBookmarked
                          ? 'bg-[#39E66B] text-[#080A09] border-[#39E66B]'
                          : 'bg-[#151A16] text-[#A0AAA2] hover:text-[#F5F7F5] border-[#262D28]'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark volume'}
                      aria-label="Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openReader(manga);
                      }}
                      className="px-3.5 py-2 bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Read Free</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* =====================================================================
          5. MANGA DETAIL MODAL
         ===================================================================== */}
      {detailManga && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#101411] border border-[#262D28] rounded-2xl shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setDetailManga(null)}
              className="absolute top-4 right-4 p-2 text-[#A0AAA2] hover:text-[#F5F7F5] bg-[#151A16] hover:bg-[#1A221D] rounded-full border border-[#262D28] transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Cover Column */}
              <div className="w-36 sm:w-48 aspect-[2/3] rounded-xl overflow-hidden border border-[#262D28] shadow-lg flex-shrink-0 mx-auto sm:mx-0">
                <img
                  src={detailManga.coverUrl}
                  alt={detailManga.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Column */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#39E66B]/20 text-[#39E66B] border border-[#39E66B]/30">
                      {detailManga.status}
                    </span>
                    <span className="text-xs text-[#A0AAA2] font-mono flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#39E66B] text-[#39E66B]" /> {detailManga.rating} / 10
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7F5] tracking-tight">
                    {detailManga.title}
                  </h2>
                  <p className="text-xs font-mono text-[#A0AAA2] mt-0.5">
                    {detailManga.originalTitle} {detailManga.subtitle ? `• ${detailManga.subtitle}` : ''}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-[#262D28]">
                  <div>
                    <span className="text-[#A0AAA2] text-[11px] block">Story / Author</span>
                    <strong className="text-[#F5F7F5] font-semibold">{detailManga.author}</strong>
                  </div>
                  {detailManga.artist && (
                    <div>
                      <span className="text-[#A0AAA2] text-[11px] block">Art / Illustration</span>
                      <strong className="text-[#F5F7F5] font-semibold">{detailManga.artist}</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-[#A0AAA2] text-[11px] block">Publisher</span>
                    <strong className="text-[#F5F7F5] font-semibold">{detailManga.publisher}</strong>
                  </div>
                  <div>
                    <span className="text-[#A0AAA2] text-[11px] block">Catalog Volumes</span>
                    <strong className="text-[#39E66B] font-mono font-semibold">{detailManga.totalChapters}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A0AAA2] mb-1">Synopsis</h4>
                  <p className="text-xs sm:text-sm text-[#A0AAA2] leading-relaxed">
                    {detailManga.synopsis}
                  </p>
                </div>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {detailManga.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-[#151A16] border border-[#262D28] text-[11px] text-[#A0AAA2]">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Chapter Previews Table */}
                <div className="pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A0AAA2] mb-2 flex items-center justify-between">
                    <span>Available Free Chapters</span>
                    <span className="text-[11px] font-mono text-[#39E66B]">{detailManga.sampleChapters.length} Chapters</span>
                  </h4>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {detailManga.sampleChapters.map((ch) => (
                      <div
                        key={ch.chapterNumber}
                        onClick={() => {
                          setDetailManga(null);
                          openReader(detailManga, ch.chapterNumber);
                        }}
                        className="p-2 rounded-lg bg-[#080A09] hover:bg-[#151A16] border border-[#262D28] hover:border-[#39E66B]/40 flex items-center justify-between text-xs cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#39E66B]">{ch.chapterNumber}</span>
                          <span className="text-[#F5F7F5] truncate max-w-xs">{ch.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#A0AAA2] text-[11px] flex-shrink-0">
                          <span>{ch.pages}p</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#39E66B]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Bottom Actions */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDetailManga(null);
                      openReader(detailManga);
                    }}
                    className="flex-1 py-2.5 bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Start Reading Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => toggleBookmark(e, detailManga.id)}
                    className={`px-4 py-2.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                      readingList[detailManga.id]
                        ? 'bg-[#151A16] text-[#39E66B] border-[#39E66B]/50'
                        : 'bg-[#151A16] text-[#F5F7F5] border-[#262D28] hover:border-[#39E66B]/30'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{readingList[detailManga.id] ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. INTERACTIVE MANGA READER MODAL
         ===================================================================== */}
      {readerState.isOpen && readerState.manga && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`relative flex flex-col bg-[#080A09] border border-[#262D28] transition-all duration-200 overflow-hidden ${
            readerState.isFullscreen
              ? 'w-screen h-screen rounded-none'
              : 'w-full max-w-4xl h-[92vh] rounded-2xl shadow-2xl'
          }`}>
            
            {/* Top Reader Navbar */}
            <div className="px-4 py-3 bg-[#101411] border-b border-[#262D28] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={closeReader}
                  className="p-1.5 rounded-lg text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] transition-colors"
                  aria-label="Back to library"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="min-w-0">
                  <h4 className="font-bold text-[#F5F7F5] truncate">{readerState.manga.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#A0AAA2]">
                    <span className="font-mono text-[#39E66B] font-semibold">{readerState.chapterNumber}</span>
                    <span>•</span>
                    <span className="truncate">{readerState.chapterTitle}</span>
                  </div>
                </div>
              </div>

              {/* Right Tools */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline font-mono text-[11px] text-[#A0AAA2] px-2 py-1 rounded bg-[#080A09] border border-[#262D28]">
                  Page {readerState.currentPage} of {readerState.totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setReaderState((prev) => ({ ...prev, isFullscreen: !prev.isFullscreen }))}
                  className="p-1.5 rounded-lg text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] border border-[#262D28] transition-colors"
                  title="Toggle Fullscreen"
                  aria-label="Toggle Fullscreen"
                >
                  {readerState.isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={closeReader}
                  className="p-1.5 rounded-lg text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] border border-[#262D28] transition-colors"
                  aria-label="Close reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reader Canvas Area */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-[#080A09] relative select-none">
              
              {/* Prev Page Click Zone / Button */}
              <button
                type="button"
                onClick={() => setReaderState((prev) => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                disabled={readerState.currentPage === 1}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#101411]/80 hover:bg-[#151A16] border border-[#262D28] text-[#F5F7F5] disabled:opacity-30 disabled:pointer-events-none transition-all z-20 shadow-lg"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5 text-[#39E66B]" />
              </button>

              {/* Manga Page Mock Canvas */}
              <div className="relative max-h-full max-w-lg aspect-[2/3] bg-[#101411] border border-[#262D28] rounded-lg shadow-2xl overflow-hidden flex flex-col items-center justify-between p-6">
                
                {/* Header Spine Marks */}
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#A0AAA2] border-b border-[#262D28] pb-2">
                  <span>{readerState.manga.publisher.split('/')[0]} OFFICIAL</span>
                  <span className="text-[#39E66B]">DIGITAL SAKUGA PREVIEW</span>
                  <span>{readerState.chapterNumber}</span>
                </div>

                {/* Center Page Simulation */}
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  {readerState.currentPage === 1 ? (
                    <div className="space-y-4">
                      <div className="w-32 aspect-[2/3] mx-auto rounded-md overflow-hidden border border-[#262D28] shadow-md">
                        <img src={readerState.manga.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-[#F5F7F5]">{readerState.manga.title}</h3>
                        <p className="text-xs text-[#39E66B] font-mono">{readerState.chapterNumber}: {readerState.chapterTitle}</p>
                        <p className="text-[11px] text-[#A0AAA2]">High-definition studio page master scan</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-[#151A16] border border-[#39E66B]/30 flex items-center justify-center mx-auto text-[#39E66B]">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#F5F7F5]">Page {readerState.currentPage} Preview</h4>
                        <p className="text-xs text-[#A0AAA2] max-w-xs mx-auto">
                          Simulated manga reader spread. WATCatoo offers uncompressed Japanese double-spread art with right-to-left layout rendering.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Page Number */}
                <div className="w-full text-center text-[11px] font-mono text-[#A0AAA2] pt-2 border-t border-[#262D28]">
                  — {readerState.currentPage} —
                </div>
              </div>

              {/* Next Page Click Zone / Button */}
              <button
                type="button"
                onClick={() => setReaderState((prev) => ({ ...prev, currentPage: Math.min(prev.totalPages, prev.currentPage + 1) }))}
                disabled={readerState.currentPage === readerState.totalPages}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#101411]/80 hover:bg-[#151A16] border border-[#262D28] text-[#F5F7F5] disabled:opacity-30 disabled:pointer-events-none transition-all z-20 shadow-lg"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5 text-[#39E66B]" />
              </button>

            </div>

            {/* Bottom Scrubber Toolbar */}
            <div className="px-6 py-3 bg-[#101411] border-t border-[#262D28] flex items-center justify-between gap-4 text-xs">
              <span className="font-mono text-[#A0AAA2] text-[11px]">Pg {readerState.currentPage}</span>
              
              <div className="flex-1 max-w-md flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max={readerState.totalPages}
                  value={readerState.currentPage}
                  onChange={(e) => setReaderState((prev) => ({ ...prev, currentPage: Number(e.target.value) }))}
                  className="w-full accent-[#39E66B] cursor-pointer"
                />
              </div>

              <span className="font-mono text-[#A0AAA2] text-[11px]">Total {readerState.totalPages}</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
