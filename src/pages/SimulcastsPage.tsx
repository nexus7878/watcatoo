import React, { useState } from 'react';
import { AnimeItem } from '../data/animeData';
import { AnimeImage } from '../components/AnimeImage';
import { Calendar, Clock, Play, Radio, Tv } from 'lucide-react';

interface SimulcastsPageProps {
  animeList: AnimeItem[];
  onSelectAnime: (anime: AnimeItem) => void;
}

export const SimulcastsPage: React.FC<SimulcastsPageProps> = ({
  animeList,
  onSelectAnime,
}) => {
  const days = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
  const [selectedDay, setSelectedDay] = useState<typeof days[number]>('All Days');

  // Filter simulcasts
  const simulcastList = animeList.filter((a) => {
    if (!a.isSimulcast) return false;
    if (selectedDay === 'All Days') return true;
    return a.simulcastDay === selectedDay;
  });

  return (
    <div className="pt-24 pb-20 bg-[#080A09] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#262D28] pb-10 mb-10 pt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101411] border border-[#262D28] text-xs font-semibold text-[#39E66B] mb-4">
            <Radio className="w-3.5 h-3.5 text-[#39E66B] animate-pulse" />
            <span className="uppercase tracking-widest text-[11px]">Direct Tokyo Broadcast Lineup</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F5F7F5] tracking-tight">
                Simulcast Calendar
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#A0AAA2] max-w-2xl">
                Stream new episodes minutes after their original Tokyo television broadcast, complete with studio-mastered audio and localized subtitles.
              </p>
            </div>

            {/* Sync Status Badge */}
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#101411] border border-[#39E66B]/30 text-xs text-[#F5F7F5]">
              <span className="w-2 h-2 rounded-full bg-[#39E66B] animate-ping" />
              <span>Simulcast Engine: <strong>Tokyo Sync Active</strong></span>
            </div>
          </div>

          {/* Weekly Day Selector Tabs */}
          <div className="mt-8 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none pt-4 border-t border-[#262D28]/60">
            <Calendar className="w-4 h-4 text-[#A0AAA2] flex-shrink-0 mr-1" />
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex-shrink-0 flex items-center gap-1.5 ${
                  selectedDay === day
                    ? 'bg-[#39E66B] text-[#080A09] font-bold shadow-sm'
                    : 'bg-[#101411] text-[#A0AAA2] hover:text-[#F5F7F5] border border-[#262D28]'
                }`}
              >
                <span>{day}</span>
                {day !== 'All Days' && (
                  <span className={`text-[10px] px-1 rounded ${selectedDay === day ? 'bg-[#080A09]/20 text-[#080A09]' : 'bg-[#151A16] text-[#A0AAA2]'}`}>
                    {animeList.filter((a) => a.isSimulcast && a.simulcastDay === day).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Simulcasts List */}
        {simulcastList.length === 0 ? (
          <div className="bg-[#101411] border border-[#262D28] rounded-xl p-12 text-center">
            <p className="text-[#A0AAA2]">No broadcast releases scheduled for {selectedDay}.</p>
            <button
              onClick={() => setSelectedDay('All Days')}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-[#39E66B] text-[#080A09] rounded-md hover:bg-[#20C45A]"
            >
              View Full Week Schedule
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {simulcastList.map((anime) => (
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
                aria-label={`View simulcast details for ${anime.title}`}
                className="group flex bg-[#101411] border border-[#262D28] hover:border-[#39E66B]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#39E66B]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39E66B]"
              >
                {/* Left Thumbnail (2:3 aspect ratio) */}
                <div className="w-28 sm:w-32 flex-shrink-0 relative bg-[#151A16]">
                  <AnimeImage
                    src={anime.posterUrl}
                    alt={anime.title}
                    aspectRatio="2/3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#080A09]/90 text-[#39E66B] border border-[#39E66B]/30">
                      Simulcast
                    </span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    {/* Time & Day Badge */}
                    <div className="flex items-center justify-between text-[11px] text-[#A0AAA2] mb-1">
                      <span className="flex items-center gap-1 text-[#39E66B] font-semibold">
                        <Clock className="w-3 h-3" />
                        <span>{anime.simulcastTime || 'Weekly Drop'}</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#151A16] border border-[#262D28] text-[#F5F7F5] font-medium">
                        {anime.simulcastDay || 'Weekly'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-[#F5F7F5] group-hover:text-[#39E66B] transition-colors line-clamp-1">
                      {anime.title}
                    </h3>
                    {anime.season && (
                      <p className="text-[11px] text-[#A0AAA2] font-medium truncate">
                        {anime.season}
                      </p>
                    )}

                    {/* Episode drop & studio */}
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-[#A0AAA2]">
                      <span className="font-semibold text-[#F5F7F5] px-1.5 py-0.5 rounded bg-[#151A16] border border-[#262D28]">
                        {anime.latestEpisode || 'New Episode'}
                      </span>
                      <span className="truncate text-[#A0AAA2]/80">{anime.studio || 'Tokyo Broadcast'}</span>
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-2 border-t border-[#262D28]/60 flex items-center justify-between">
                    <span className="text-[10px] text-[#A0AAA2] flex items-center gap-1">
                      <Tv className="w-3 h-3 text-[#39E66B]" />
                      <span>SUB & DUB 4K</span>
                    </span>

                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#080A09] bg-[#39E66B] group-hover:bg-[#20C45A] px-2.5 py-1 rounded transition-colors">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Stream</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
