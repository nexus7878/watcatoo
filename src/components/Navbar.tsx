import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Flame, Layers, User, Radio, BookOpen, LogOut } from 'lucide-react';
import { AuthUser } from './AuthModal';

export type NavPage = 'home' | 'popular' | 'simulcasts' | 'genres' | 'manga';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenSearch: () => void;
  onOpenSignIn: () => void;
  currentUser?: AuthUser | null;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenSignIn,
  currentUser,
  onSignOut,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: NavPage) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const navItems: { id: NavPage; label: string; icon?: React.ReactNode; isHot?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'popular', label: 'Popular', icon: <Flame className="w-3.5 h-3.5 text-[#39E66B]" />, isHot: true },
    { id: 'simulcasts', label: 'Simulcast', icon: <Radio className="w-3.5 h-3.5 text-[#39E66B]" /> },
    { id: 'genres', label: 'Genres', icon: <Layers className="w-3.5 h-3.5 text-[#39E66B]" /> },
    { id: 'manga', label: 'Manga', icon: <BookOpen className="w-3.5 h-3.5 text-[#39E66B]" /> },
  ];

  const hints = [
    'Search anime, genres...',
    "Try 'Solo Leveling'...",
    "Try 'Demon Slayer'...",
    "Try 'Jujutsu Kaisen'...",
    "Try 'One Piece'...",
    "Try 'Action' or 'Fantasy'...",
  ];
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHintIndex((prev: number) => (prev + 1) % hints.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [hints.length]);

  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent || navigator.platform || ''));
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full max-w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#080A09]/95 backdrop-blur-md border-b border-[#262D28] py-3 shadow-lg shadow-black/50'
            : 'bg-[#080A09]/90 sm:bg-gradient-to-b sm:from-[#080A09]/90 sm:via-[#080A09]/60 sm:to-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-[#262D28]/60 sm:border-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="flex items-center justify-between">
            {/* Left: Brand Wordmark & Nav */}
            <div className="flex items-center space-x-6 lg:space-x-9">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] rounded-md transition-transform duration-200 hover:opacity-95"
                aria-label="WATCatoo Home"
              >
                <img
                  src="/watcatoo-logo.png"
                  alt="WATCatoo"
                  className="h-6 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                />
              </button>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? 'text-[#39E66B] bg-[#151A16] border border-[#39E66B]/30 font-semibold shadow-xs'
                          : 'text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#101411]/70 border border-transparent'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39E66B] ml-0.5 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right: Search & Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Ultra-sleek Glassmorphic Search Bar Button */}
              <div className="relative group flex-shrink-0">
                {/* Ambient dynamic emerald halo on hover */}
                <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#39E66B]/35 via-[#20C45A]/20 to-[#39E66B]/35 opacity-0 group-hover:opacity-100 blur-[6px] transition-all duration-300 pointer-events-none" />

                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="relative flex items-center h-10 w-10 sm:w-60 md:w-72 lg:w-80 px-0 sm:pl-3 sm:pr-2.5 bg-gradient-to-b from-[#141A16]/95 to-[#0B0F0C]/95 hover:from-[#1A241D]/95 hover:to-[#0F1612]/95 border border-[#27352B]/85 hover:border-[#39E66B]/60 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] justify-center sm:justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_20px_rgba(57,230,107,0.18)] cursor-pointer"
                  aria-label="Search anime and manga"
                >
                  {/* Left: Icon Housing & Rolling Animated Placeholder */}
                  <div className="flex items-center space-x-2.5 min-w-0 flex-1 justify-center sm:justify-start">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#18231C]/90 group-hover:bg-[#39E66B]/15 border border-[#2A372E]/60 group-hover:border-[#39E66B]/40 transition-all duration-200 flex-shrink-0">
                      <Search className="w-3.5 h-3.5 text-[#8FA093] group-hover:text-[#39E66B] transition-all duration-200 group-hover:scale-105" />
                    </div>

                    <div className="hidden sm:block min-w-0 flex-1 overflow-hidden h-5 relative text-left">
                      <span
                        key={hintIndex}
                        className="animate-hint-slide block text-[13px] font-normal text-[#8A968E] group-hover:text-[#E2E8E4] truncate transition-colors text-left leading-5"
                      >
                        {hints[hintIndex]}
                      </span>
                    </div>
                  </div>

                  {/* Right: Tactile 3D Keycap Badge (Desktop) */}
                  <div className="hidden sm:flex items-center pl-2 flex-shrink-0">
                    <div className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-[#8A968E] group-hover:text-[#39E66B] bg-[#141D16] group-hover:bg-[#1A261D] border border-[#29372D] group-hover:border-[#39E66B]/40 rounded-[5px] shadow-[0_1px_2px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 select-none">
                      <span className="font-sans font-semibold tracking-wide text-[9px] opacity-75">
                        {isMac ? '⌘' : 'Ctrl'}
                      </span>
                      <span className="font-bold">K</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* User Profile or Sign In Button (Desktop) */}
              {currentUser ? (
                <div className="hidden sm:inline-flex items-center space-x-2 pl-3 pr-2 py-1 bg-[#101411] border border-[#39E66B]/30 rounded-full text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#39E66B] text-[#080A09] font-bold flex items-center justify-center text-[11px]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-[#F5F7F5] max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  {currentUser.isVip && (
                    <span className="px-1.5 py-0.2 rounded bg-[#39E66B]/20 text-[#39E66B] font-mono text-[9px] font-bold">
                      VIP
                    </span>
                  )}
                  {onSignOut && (
                    <button
                      type="button"
                      onClick={onSignOut}
                      title="Sign Out"
                      className="p-1 text-[#A0AAA2] hover:text-[#FF6B6B] transition-colors rounded-full"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenSignIn}
                  className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-1.5 text-sm font-medium text-[#080A09] bg-[#39E66B] hover:bg-[#20C45A] active:scale-[0.98] rounded-md transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#39E66B] focus-visible:ring-offset-[#080A09]"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile menu toggle: perfectly matched in height, width, border radius & styling */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center h-9 w-9 text-[#A0AAA2] hover:text-[#F5F7F5] bg-[#101411] hover:bg-[#151A16] border border-[#262D28] hover:border-[#39E66B]/40 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] flex-shrink-0"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-[#39E66B]" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#262D28] bg-[#080A09]/98 px-4 pt-3 pb-5 space-y-2 mt-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#151A16] text-[#39E66B] border border-[#39E66B]/30 font-semibold'
                      : 'text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#101411]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#39E66B]" />}
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#262D28]">
              {currentUser ? (
                <div className="flex items-center justify-between p-2.5 bg-[#101411] rounded-lg border border-[#262D28]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#39E66B] text-[#080A09] font-bold flex items-center justify-center text-xs">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#F5F7F5] block">{currentUser.name}</span>
                      <span className="text-[10px] text-[#A0AAA2]">{currentUser.email}</span>
                    </div>
                  </div>
                  {onSignOut && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSignOut();
                      }}
                      className="text-xs text-[#FF6B6B] hover:underline"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-[#080A09] bg-[#39E66B] hover:bg-[#20C45A] rounded-md transition-colors"
                >
                  Sign In to WATCatoo
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
