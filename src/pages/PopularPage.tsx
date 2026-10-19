import React, { useState } from 'react';
import { AnimeItem } from '../data/animeData';
import { AnimeImage } from '../components/AnimeImage';
import { Trophy, Play, Info, Filter } from 'lucide-react';

interface PopularPageProps {
  animeList: AnimeItem[];
  onSelectAnime: (anime: AnimeItem) => void;
}

export const PopularPage: React.FC<PopularPageProps> = ({
  animeList,
  onSelectAnime,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rank' | 'title' | 'episodes'>('rank');

  // Filter list to popular titles or sort by rank
  const popularList = animeList
    .filter((a) => (selectedGenre === 'All' ? true : a.genres.includes(selectedGenre)))
    .sort((a, b) => {
      if (sortBy === 'rank') {
        return (a.popularRank || 99) - (b.popularRank || 99);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'episodes') {
        const epA = parseInt(a.episodes || '0', 10) || 0;
        const epB = parseInt(b.episodes || '0', 10) || 0;
        return epB - epA;
      }
      return 0;
    });

  const genres = ['All', 'Action', 'Fantasy', 'Adventure', 'Sci-Fi', 'Mystery', 'Romance'];

  return (
    <div className="pt-24 pb-20 bg-[#080A09] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#262D28] pb-10 mb-10 pt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101411] border border-[#262D28] text-xs font-semibold text-[#39E66B] mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#39E66B]" />
            <span className="uppercase tracking-widest text-[11px]">WATCatoo Global Charts</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F5F7F5] tracking-tight">
                Most Popular Anime
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#A0AAA2] max-w-2xl">
                The most-streamed sagas, viral seasonal phenoms, and critically acclaimed masterpieces across WATCatoo.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-[#101411] border border-[#262D28] text-xs text-[#A0AAA2]">
                <strong className="text-[#39E66B]">{popularList.length}</strong> Titles Ranked
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#101411] border border-[#262D28] text-xs text-[#A0AAA2]">
                Updated Daily • <strong className="text-[#F5F7F5]">Simulcast & Archives</strong>
              </span>
            </div>
          </div>

          {/* Filter and Sort Toolbar */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#262D28]/60">
            {/* Genre Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-[#A0AAA2] flex-shrink-0 mr-1" />
              {genres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGenre(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
                    selectedGenre === g
                      ? 'bg-[#39E66B] text-[#080A09] font-bold shadow-xs'
                      : 'bg-[#101411] text-[#A0AAA2] hover:text-[#F5F7F5] border border-[#262D28]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2 text-xs text-[#A0AAA2] self-end sm:self-auto">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#101411] border border-[#262D28] text-[#F5F7F5] rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#39E66B]"
              >
                <option value="rank">Popularity Rank</option>
                <option value="title">Title (A-Z)</option>
                <option value="episodes">Most Episodes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Popular Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {popularList.map((anime, idx) => {
            const rank = anime.popularRank || idx + 1;

            return (
              <div
                key={anime.id}
                onClick={() => onSelectAnime(anime)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectAnime(anime);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${anime.title}`}
                className="group relative flex flex-col bg-[#101411] border border-[#262D28] hover:border-[#39E66B]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#39E66B]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
              >
                {/* Poster Artwork with 2:3 ratio */}
                <div className="relative aspect-[2/3] w-full bg-[#151A16] overflow-hidden">
                  <AnimeImage
                    src={anime.posterUrl}
                    alt={anime.title}
                    aspectRatio="2/3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Rank Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span
                      className={`inline-flex items-center justify-center font-black px-2 py-0.5 rounded text-xs shadow-md border ${
                        rank === 1
                          ? 'bg-[#39E66B] text-[#080A09] border-[#39E66B]'
                          : rank <= 3
                          ? 'bg-[#151A16] text-[#39E66B] border-[#39E66B]/40'
                          : 'bg-[#080A09]/80 text-[#F5F7F5] border-[#262D28]'
                      }`}
                    >
                      #{rank}
                    </span>
                  </div>

                  {/* Studio / Year Top Right Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#080A09]/80 text-[#A0AAA2] border border-[#262D28]">
                      {anime.year}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div className="w-full flex items-center justify-between">
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#080A09] bg-[#39E66B] px-2.5 py-1 rounded">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Preview</span>
                      </span>
                      <span className="p-1 bg-[#151A16] text-[#F5F7F5] rounded border border-[#262D28]">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors truncate">
                      {anime.title}
                    </h3>
                    <p className="text-[11px] text-[#A0AAA2] truncate mt-0.5">
                      {anime.genres.slice(0, 2).join(' • ')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#262D28]/60 flex items-center justify-between text-[11px] text-[#A0AAA2]">
                    <span className="truncate max-w-[100px]">{anime.studio || 'Simulcast'}</span>
                    <span className="text-[#39E66B] font-medium">{anime.episodes || anime.season}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
