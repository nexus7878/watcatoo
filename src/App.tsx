import { useState, useEffect } from 'react';
import { Navbar, NavPage } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PopularPage } from './pages/PopularPage';
import { SimulcastsPage } from './pages/SimulcastsPage';
import { GenresPage } from './pages/GenresPage';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AnimeDetailModal } from './components/AnimeDetailModal';
import { NoticeModal } from './components/NoticeModal';
import { ALL_ANIME_COLLECTION, AnimeItem } from './data/animeData';

export function App() {
  const getPageFromHash = (): NavPage => {
    const hash = window.location.hash.toLowerCase().replace('#', '').trim();
    if (hash === 'popular') return 'popular';
    if (hash === 'simulcasts' || hash === 'simulcast') return 'simulcasts';
    if (hash === 'genres' || hash === 'genre') return 'genres';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<NavPage>(getPageFromHash);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  // Notice Modal state for Sign In or Policies
  const [noticeModal, setNoticeModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
    isSignIn: boolean;
  }>({
    isOpen: false,
    title: '',
    content: '',
    isSignIn: false,
  });

  // Listen to browser forward/backward hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: NavPage, genre?: string) => {
    setCurrentPage(page);
    if (genre) {
      setActiveGenre(genre);
    }
    const targetHash = page === 'home' ? '' : `#${page}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash || window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global keyboard shortcut '/' and 'Cmd+K / Ctrl+K' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName);
      if (
        (e.key === '/' && !isInput) ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenSignIn = () => {
    setNoticeModal({
      isOpen: true,
      title: 'Sign In to WATCatoo',
      content:
        'Personal viewer profiles, synchronized watch histories, and simulcast notifications will launch in Phase 2 of our platform rollout. Enter your email below to reserve your founder handle and receive immediate VIP access when accounts go live.',
      isSignIn: true,
    });
  };

  const handleOpenNotice = (title: string, content: string) => {
    setNoticeModal({
      isOpen: true,
      title,
      content,
      isSignIn: false,
    });
  };

  const handleSelectAnimeById = (id: string) => {
    const found = ALL_ANIME_COLLECTION.find((a) => a.id === id);
    if (found) {
      setSelectedAnime(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#080A09] text-[#F5F7F5] selection:bg-[#39E66B]/25 selection:text-[#39E66B] flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSignIn={handleOpenSignIn}
      />

      {/* Main Page Landmark */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            animeList={ALL_ANIME_COLLECTION}
            activeGenre={activeGenre}
            onSelectGenre={setActiveGenre}
            onSelectAnime={(anime) => setSelectedAnime(anime)}
            onSelectAnimeById={handleSelectAnimeById}
            onNavigateToPopular={() => navigate('popular')}
            onNavigateToGenres={() => navigate('genres')}
            onOpenSignIn={handleOpenSignIn}
          />
        )}

        {currentPage === 'popular' && (
          <PopularPage
            animeList={ALL_ANIME_COLLECTION}
            onSelectAnime={(anime) => setSelectedAnime(anime)}
          />
        )}

        {currentPage === 'simulcasts' && (
          <SimulcastsPage
            animeList={ALL_ANIME_COLLECTION}
            onSelectAnime={(anime) => setSelectedAnime(anime)}
          />
        )}

        {currentPage === 'genres' && (
          <GenresPage
            animeList={ALL_ANIME_COLLECTION}
            initialGenre={activeGenre}
            onSelectAnime={(anime) => setSelectedAnime(anime)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenNotice={handleOpenNotice}
        onExploreAnime={() => navigate('popular')}
        onDiscoverGenres={() => navigate('genres')}
        onNavigate={navigate}
      />

      {/* Interactive Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        animeList={ALL_ANIME_COLLECTION}
        onSelectAnime={(anime) => setSelectedAnime(anime)}
      />

      <AnimeDetailModal
        anime={selectedAnime}
        onClose={() => setSelectedAnime(null)}
      />

      <NoticeModal
        isOpen={noticeModal.isOpen}
        onClose={() => setNoticeModal((prev) => ({ ...prev, isOpen: false }))}
        title={noticeModal.title}
        content={noticeModal.content}
        isSignIn={noticeModal.isSignIn}
      />
    </div>
  );
}

export default App;
