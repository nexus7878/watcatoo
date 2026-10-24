import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenNotice: (title: string, content: string) => void;
  onExploreAnime: () => void;
  onDiscoverGenres: () => void;
  onNavigate?: (page: 'home' | 'popular' | 'simulcasts' | 'genres' | 'manga', genre?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenNotice,
  onExploreAnime,
  onDiscoverGenres,
  onNavigate,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
    }
  };

  const openAbout = () => {
    onOpenNotice(
      'About WATCatoo',
      'WATCatoo is a next-generation anime discovery and streaming brand engineered for devoted fans. Inspired by the golden era of animation and modern cinematic streaming platforms, our mission is to deliver uncut high-definition master streams, rapid Tokyo broadcast simulcasts, and a human-curated catalog free from clutter and ad interruptions.'
    );
  };

  const openPrivacy = () => {
    onOpenNotice(
      'Privacy Policy',
      'At WATCatoo, user trust is foundational. We do not sell your personal data or track your viewing habits across third-party ad networks. In this preview landing phase, no tracking cookies or personal data are collected without explicit viewer consent.'
    );
  };

  const openTerms = () => {
    onOpenNotice(
      'Terms of Service',
      'Welcome to WATCatoo. All anime trademarks, promotional artwork, and keyart showcased on this discovery page remain the intellectual property of their respective creators and production committees. This landing page represents Phase 1 of the WATCatoo platform.'
    );
  };

  const openLicensing = () => {
    onOpenNotice(
      'Licensing & Attribution',
      'All anime titles, keyart, logos, and characters displayed are copyrights of their respective animation studios and publishers (TOEI Animation, MAPPA, ufotable, Aniplex, Shueisha, Kodansha). Displayed under fair discovery and preview evaluation for the WATCatoo platform.'
    );
  };

  return (
    <footer className="bg-[#080A09] border-t border-[#262D28] text-[#A0AAA2] text-xs relative overflow-hidden">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[#39E66B]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Top Newsletter / Simulcast Drops Bar */}
        <div className="pb-12 mb-12 border-b border-[#262D28] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-lg">
            <div className="flex items-center space-x-2 text-[11px] font-semibold text-[#39E66B] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulcast Alerts</span>
            </div>
            <h3 className="text-xl font-bold text-[#F5F7F5]">
              Never miss a weekly Tokyo premiere.
            </h3>
            <p className="text-xs text-[#A0AAA2] mt-1">
              Receive notifications the exact moment new simulcast episodes and dub releases go live on WATCatoo.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSent ? (
              <div className="flex items-center space-x-2 px-4 py-2.5 bg-[#151A16] border border-[#39E66B]/50 rounded-lg text-xs text-[#F5F7F5]">
                <CheckCircle2 className="w-4 h-4 text-[#39E66B]" />
                <span>You’re subscribed! Simulcast broadcast alerts enabled.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#A0AAA2] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-9 pr-3 py-2.5 bg-[#101411] border border-[#262D28] rounded-md text-xs text-[#F5F7F5] placeholder-[#A0AAA2] focus:outline-none focus:border-[#39E66B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] font-bold text-xs rounded-md transition-colors flex items-center justify-center space-x-1 flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Responsive Links Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-14">
          {/* Brand Info */}
          <div className="col-span-1 xs:col-span-2 space-y-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B] rounded transition-transform hover:opacity-90"
            >
              <img
                src="/watcatoo-logo.png"
                alt="WATCatoo"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </a>
            <p className="text-[#A0AAA2] text-xs leading-relaxed max-w-sm">
              Your next anime obsession. Connecting viewers worldwide with unforgettable storytelling, curated catalogs, and ultra-high-definition streaming without clutter.
            </p>
            <div className="flex items-center space-x-2 pt-1 text-[11px] text-[#A0AAA2]/80">
              <span className="w-2 h-2 rounded-full bg-[#39E66B] animate-pulse" />
              <span className="font-medium text-[#F5F7F5]">Global Streaming Network: Operational</span>
            </div>
          </div>

          {/* Discovery Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7F5]">
              Discover
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('popular') : onExploreAnime()}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Most Popular Anime
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('simulcasts') : onExploreAnime()}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Simulcast Calendar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('genres') : onDiscoverGenres()}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Curated Genres
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('manga')}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left flex items-center gap-1.5"
                >
                  <span>Manga Addict</span>
                  <span className="text-[10px] font-mono font-semibold px-1 py-0.2 bg-[#39E66B]/15 text-[#39E66B] rounded">NEW</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('home');
                    }
                    setTimeout(() => {
                      const el = document.getElementById('story');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  The WATCatoo Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Genres List */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7F5]">
              Browse Genres
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('genres', 'Action') : onDiscoverGenres()}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Action & Battles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('genres', 'Fantasy') : onDiscoverGenres()}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Dark Fantasy & Isekai
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('genres', 'Mystery') : onDiscoverGenres()}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Mystery & Suspense
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('genres', 'Sci-Fi') : onDiscoverGenres()}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Sci-Fi & Cyberpunk
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7F5]">
              Legal & Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={openAbout}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  About WATCatoo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openPrivacy}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openTerms}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openLicensing}
                  className="hover:text-[#39E66B] transition-colors focus:outline-none text-left"
                >
                  Licensing Attribution
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Copyright Bar */}
        <div className="pt-8 border-t border-[#262D28] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A0AAA2]/70">
          <p>© 2026 WATCatoo Entertainment. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-[#151A16] border border-[#262D28] text-[#F5F7F5]">
              4K UHD 60FPS
            </span>
            <span className="px-2 py-0.5 rounded bg-[#151A16] border border-[#262D28] text-[#F5F7F5]">
              Dolby Atmos Lossless
            </span>
            <span className="text-[#262D28]">•</span>
            <span>English (Global)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
