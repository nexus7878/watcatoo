import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrendingSection } from '../components/TrendingSection';
import { MangaAddictSection } from '../components/MangaAddictSection';
import { BrandStatement } from '../components/BrandStatement';
import { FinalCta } from '../components/FinalCta';
import { AnimeItem } from '../data/animeData';

interface HomePageProps {
  animeList: AnimeItem[];
  activeGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
  onSelectAnime: (anime: AnimeItem) => void;
  onSelectAnimeById: (id: string) => void;
  onNavigateToPopular: () => void;
  onNavigateToGenres: () => void;
  onNavigateToManga?: () => void;
  onOpenSignIn: () => void;
  isLoggedIn?: boolean;
  onRequireAuth?: (message: string, onSuccess?: () => void) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  animeList,
  activeGenre,
  onSelectGenre,
  onSelectAnime,
  onSelectAnimeById,
  onNavigateToPopular,
  onNavigateToGenres,
  onNavigateToManga,
  onOpenSignIn,
  isLoggedIn,
  onRequireAuth,
}) => {
  const handleExploreAnime = () => {
    onSelectGenre(null);
    const el = document.getElementById('trending');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection
        onExploreAnime={handleExploreAnime}
        onDiscoverWorld={onNavigateToGenres}
        onSelectAnimeInfo={onSelectAnimeById}
      />

      {/* Trending Anime Row */}
      <TrendingSection
        animeList={animeList}
        selectedGenre={activeGenre}
        onSelectGenre={onSelectGenre}
        onSelectAnime={onSelectAnime}
      />

      {/* Manga Addict Showcase */}
      <MangaAddictSection
        onNavigateToManga={onNavigateToManga}
        isLoggedIn={isLoggedIn}
        onRequireAuth={onRequireAuth}
      />

      {/* Brand Statement / Vision */}
      <BrandStatement />

      {/* Stream Anywhere / Final CTA */}
      <FinalCta
        onExploreAnime={onNavigateToPopular}
        onOpenSignIn={onOpenSignIn}
      />
    </div>
  );
};
