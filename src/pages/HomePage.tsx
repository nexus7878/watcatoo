import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrendingSection } from '../components/TrendingSection';
import { GenreSection } from '../components/GenreSection';
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
  onOpenSignIn: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  animeList,
  activeGenre,
  onSelectGenre,
  onSelectAnime,
  onSelectAnimeById,
  onNavigateToPopular,
  onNavigateToGenres,
  onOpenSignIn,
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

      {/* Discover by Genre Showcase */}
      <GenreSection
        activeGenre={activeGenre}
        onSelectGenre={(g) => {
          onSelectGenre(g);
          const el = document.getElementById('trending');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
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
