import React, { useState } from 'react';
import {
  Lightbulb,
  Search,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  Gauge,
  ArrowRight,
  Trash2,
  Printer,
  FileText,
  PlusCircle,
} from 'lucide-react';
import { ProjectSimulation } from '../types';

interface SavedProjectsTabProps {
  savedProjects: ProjectSimulation[];
  onOpenProject: (project: ProjectSimulation) => void;
  onDeleteProject: (projectId: string) => void;
  onStartNewProject: () => void;
}

export const SavedProjectsTab: React.FC<SavedProjectsTabProps> = ({
  savedProjects,
  onOpenProject,
  onDeleteProject,
  onStartNewProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredProjects = savedProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'completed') {
      const allDone = p.steps.every((s) => s.completed);
      return matchesSearch && allDone;
    }
    if (selectedFilter === 'in-progress') {
      const someDone = p.steps.some((s) => !s.completed);
      return matchesSearch && someDone;
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-slate-800 p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mb-2">
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>DOKUMEN LEMBAR KERJA &amp; PURWARUPA SISWA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Ide &amp; Lembar Kerja Proyek Tersimpan
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Arsip rancangan proyek simulasi kejuruan yang telah dibuat siswa dan guru SMKN 4 Kendari. Buka kembali lembar kerja untuk memperbarui catatan dan mengedit deskripsi langkah pengerjaan.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartNewProject}
            className="self-start sm:self-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Rancang Proyek Baru</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan judul, profesi (TKJ, TBSM, Boga, DKV...)..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-1.5 shrink-0">
            {[
              { id: 'all', label: 'Semua Proyek' },
              { id: 'in-progress', label: 'Sedang Berjalan' },
              { id: 'completed', label: 'Tuntas' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">
            Belum ada proyek yang cocok
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Mulai eksplorasi profesi kejuruan dan rancang purwarupa baru dengan AI Gemini.
          </p>
          <button
            type="button"
            onClick={onStartNewProject}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
          >
            Mulai Simulasi Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((proj) => {
            const completedCount = proj.steps.filter((s) => s.completed).length;
            const total = proj.steps.length;
            const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

            return (
              <div
                key={proj.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all shadow-lg flex flex-col justify-between group"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {proj.profession}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{proj.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5 leading-snug">
                    {proj.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-indigo-200/80 line-clamp-1 font-medium mb-3">
                    {proj.tagline}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 font-medium">Progres Jobsheet:</span>
                      <span className="font-bold text-emerald-400">
                        {completedCount}/{total} Langkah ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Tools preview */}
                  <div className="text-[11px] text-slate-400 mb-4 line-clamp-1">
                    <span className="font-semibold text-slate-300">Alat Utama: </span>
                    {proj.toolsUsed?.slice(0, 3).join(', ') || 'Alat standar'}
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
                  <button
                    type="button"
                    onClick={() => onDeleteProject(proj.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-800 cursor-pointer"
                    title="Hapus proyek ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenProject(proj)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
                  >
                    <span>Buka &amp; Kerjakan Langkah</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
