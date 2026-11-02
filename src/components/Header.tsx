import React from 'react';
import { Sparkles, RotateCcw, Bookmark, Lightbulb, Compass, BookOpen } from 'lucide-react';
import { NavigationTab } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  savedCount: number;
  onReset: () => void;
  isAiProcessing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onReset,
  isAiProcessing = false,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
          {/* Logo & title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-1 ring-white/20 shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                  SimulasiVokasi
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  SMKN 4 Kendari
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal line-clamp-1">
                Simulator Proyek Kejuruan Berbasis Alat &amp; Bahan Sekitar
              </p>
            </div>
          </div>

          {/* Top right actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* AI Status Badge */}
            <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAiProcessing
                ? 'bg-purple-600 text-white animate-pulse shadow-md shadow-purple-500/40 ring-1 ring-purple-400'
                : 'bg-purple-600/25 border border-purple-500/40 text-purple-300 shadow-sm'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isAiProcessing ? 'animate-spin' : 'text-purple-300'}`} />
              <span>AI Gemini</span>
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              title="Reset ke Langkah 1"
              className="text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Mulai Baru</span>
            </button>

            {/* Saved Projects Button / Shortcut */}
            <button
              onClick={() => onSelectTab('saved')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
                currentTab === 'saved'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-indigo-950/40 hover:bg-indigo-900/60 border-indigo-700/50 text-indigo-200 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Tersimpan ({savedCount})</span>
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 pb-2.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-800/40">
          <button
            onClick={() => onSelectTab('recommendation')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'recommendation'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Rekomendasi Proyek Siswa</span>
          </button>

          <button
            onClick={() => onSelectTab('saved')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'saved'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-indigo-400" />
            <span>Ide &amp; Lembar Kerja</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-semibold bg-slate-800 text-indigo-300 border border-slate-700">
              {savedCount}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('curriculum')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'curriculum'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Bank Profesi &amp; Kurikulum</span>
          </button>
        </div>
      </div>
    </header>
  );
};
