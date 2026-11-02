import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ArrowRight,
  Layers,
  Wrench,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { VOCATIONAL_PROGRAMS } from '../data/vocationalCurriculum';

interface CurriculumBankTabProps {
  onSelectProfession: (professionName: string) => void;
}

export const CurriculumBankTab: React.FC<CurriculumBankTabProps> = ({
  onSelectProfession,
}) => {
  const [search, setSearch] = useState('');
  const [clusterFilter, setClusterFilter] = useState('all');

  const clusters = [
    { id: 'all', label: 'Semua Bidang' },
    { id: 'Teknologi Informasi & Komunikasi', label: 'TI & Jaringan' },
    { id: 'Teknologi Rekayasa & Otomotif', label: 'Otomotif & Mesin' },
    { id: 'Pariwisata & Kuliner', label: 'Kuliner & Boga' },
    { id: 'Pertanian & Agribisnis', label: 'Pertanian Modern' },
    { id: 'Seni & Ekonomi Kreatif', label: 'Desain & Seni' },
  ];

  const filteredPrograms = VOCATIONAL_PROGRAMS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.prototypeExamples.some((ex) => ex.toLowerCase().includes(search.toLowerCase()));

    const matchesCluster =
      clusterFilter === 'all' || p.cluster === clusterFilter;

    return matchesSearch && matchesCluster;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 sm:p-7 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
          <span>BANK PROFESI &amp; KURIKULUM KEJURUAN SMK</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Katalog Kejuruan &amp; Standar Simulasi Purwarupa
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Pustaka referensi jurusan vokasi untuk panduan guru dan siswa SMKN 4 Kendari. Setiap program telah dilengkapi contoh purwarupa representatif industri dan daftar peralatan esensial.
        </p>

        {/* Search & Cluster Filters */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari jurusan, keahlian, atau jenis purwarupa..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 shrink-0">
            {clusters.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setClusterFilter(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  clusterFilter === c.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all p-5 sm:p-6 shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {prog.code}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {prog.cluster}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
                {prog.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {prog.description}
              </p>

              {/* Sample Prototypes */}
              <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Contoh Simulasi Purwarupa:</span>
                </div>
                <ul className="text-xs text-slate-400 space-y-1 pl-1">
                  {prog.prototypeExamples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-400 text-[10px] mt-0.5">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Essential Tools */}
              <div className="mb-4">
                <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-slate-500" />
                  <span>Alat Esensial:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {prog.essentialTools.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectProfession(prog.title)}
              className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-teal-600 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-teal-500 shadow-md"
            >
              <span>Gunakan Profesi Ini di Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
