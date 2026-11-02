import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Gauge,
  Printer,
  Edit3,
  Check,
  Plus,
  Trash2,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  HelpCircle,
  Award,
  SlidersHorizontal,
  FileText,
  Save,
  RotateCw,
  Bookmark,
  Layers,
} from 'lucide-react';
import { ProjectSimulation, ProjectStep, ToolItem, MaterialItem } from '../types';
import { AiProjectStudioModal, SimulationFocus } from './AiProjectStudioModal';
import { PrintReportModal } from './PrintReportModal';

interface Step3ProjectJobsheetProps {
  project: ProjectSimulation;
  profession: string;
  tools: ToolItem[];
  materials: MaterialItem[];
  onUpdateProject: (updated: ProjectSimulation) => void;
  onSaveProject: (project: ProjectSimulation) => void;
  isSaved: boolean;
  onGoToStep1: () => void;
  onGoToStep2: () => void;
  onExecuteCustomProject: (config: {
    profession: string;
    toolsStr: string;
    materialsStr: string;
    focus: SimulationFocus;
    difficulty: string;
    notes: string;
  }) => void;
  isGeneratingProject: boolean;
  onOpenAiConsultant: () => void;
  initialOpenStudioModal?: boolean;
}

export const Step3ProjectJobsheet: React.FC<Step3ProjectJobsheetProps> = ({
  project,
  profession,
  tools,
  materials,
  onUpdateProject,
  onSaveProject,
  isSaved,
  onGoToStep1,
  onGoToStep2,
  onExecuteCustomProject,
  isGeneratingProject,
  onOpenAiConsultant,
  initialOpenStudioModal = false,
}) => {
  // Studio Modal state (User requirement: "tambahkan pop up seperti digambar sebelum menampilkan langkah pengerjaan & progress siswa")
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(initialOpenStudioModal);
  // Print Report & Assessment Modal state
  const [isPrintReportOpen, setIsPrintReportOpen] = useState(false);

  React.useEffect(() => {
    if (initialOpenStudioModal) {
      setIsStudioModalOpen(true);
    }
  }, [initialOpenStudioModal]);

  // Difficulty filter state
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Semua');

  // Editing step description state
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>('');

  // Add new step state
  const [showAddStep, setShowAddStep] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDesc, setNewStepDesc] = useState('');
  const [newStepSafety, setNewStepSafety] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle step completion
  const handleToggleComplete = (stepId: string) => {
    const updatedSteps = project.steps.map((st) =>
      st.id === stepId ? { ...st, completed: !st.completed } : st
    );
    const updated = { ...project, steps: updatedSteps, lastEditedAt: new Date().toISOString() };
    onUpdateProject(updated);
    if (isSaved) {
      onSaveProject(updated);
    }
  };

  // Start editing a step description
  const handleStartEditDesc = (step: ProjectStep) => {
    setEditingStepId(step.id);
    setEditedDescription(step.description);
  };

  // Save edited description
  const handleSaveEditDesc = (stepId: string) => {
    if (!editedDescription.trim()) return;
    const updatedSteps = project.steps.map((st) =>
      st.id === stepId ? { ...st, description: editedDescription.trim() } : st
    );
    const updated = { ...project, steps: updatedSteps, lastEditedAt: new Date().toISOString() };
    onUpdateProject(updated);
    setEditingStepId(null);
    if (isSaved) {
      onSaveProject(updated);
    }
    showToast('Deskripsi langkah berhasil diperbarui!');
  };

  // Update step custom notes
  const handleUpdateStepNotes = (stepId: string, notes: string) => {
    const updatedSteps = project.steps.map((st) =>
      st.id === stepId ? { ...st, notes } : st
    );
    const updated = { ...project, steps: updatedSteps, lastEditedAt: new Date().toISOString() };
    onUpdateProject(updated);
    if (isSaved) {
      onSaveProject(updated);
    }
  };

  // Delete a step
  const handleDeleteStep = (stepId: string) => {
    const updatedSteps = project.steps
      .filter((st) => st.id !== stepId)
      .map((st, idx) => ({ ...st, stepNumber: idx + 1 }));
    const updated = { ...project, steps: updatedSteps, lastEditedAt: new Date().toISOString() };
    onUpdateProject(updated);
    if (isSaved) {
      onSaveProject(updated);
    }
    showToast('Langkah berhasil dihapus');
  };

  // Add new step
  const handleAddNewStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStepTitle.trim() || !newStepDesc.trim()) return;

    const newStep: ProjectStep = {
      id: `step-${Date.now()}`,
      stepNumber: project.steps.length + 1,
      title: newStepTitle.trim(),
      description: newStepDesc.trim(),
      safetyNote: newStepSafety.trim() || undefined,
      expectedResult: 'Langkah terlaksana sesuai standar.',
      completed: false,
      notes: '',
    };

    const updated = {
      ...project,
      steps: [...project.steps, newStep],
      lastEditedAt: new Date().toISOString(),
    };
    onUpdateProject(updated);
    if (isSaved) {
      onSaveProject(updated);
    }
    setNewStepTitle('');
    setNewStepDesc('');
    setNewStepSafety('');
    setShowAddStep(false);
    showToast('Langkah baru berhasil ditambahkan!');
  };

  // Save project button handler
  const handleSaveClick = () => {
    onSaveProject(project);
    showToast('Rancangan ide proyek berhasil disimpan ke lembar kerja!');
  };

  // Print jobsheet
  const handlePrint = () => {
    window.print();
  };

  // Available counts
  const availableToolsCount = tools.filter((t) => t.available).length || project.toolsUsed?.length || 4;
  const availableMaterialsCount = materials.filter((m) => m.available).length || project.materialsUsed?.length || 5;

  // Progress calculations
  const totalSteps = project.steps.length;
  const completedSteps = project.steps.filter((s) => s.completed).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-semibold border border-indigo-400/40 animate-bounce">
          <Check className="w-4 h-4 bg-white/20 rounded p-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Hero Card (Exact replica of image_61275337.png) */}
      <div className="rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>LANGKAH 3: REKOMENDASI PROYEK SIMULASI KEJURUAN</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Proyek Sederhana Representasi Profesi Siswa
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Berdasarkan profesi{' '}
            <span className="text-indigo-400 font-bold">{profession || project.profession || 'sablon baju'}</span>{' '}
            dan ketersediaan{' '}
            <span className="text-emerald-400 font-bold">{availableToolsCount} alat</span>{' '}
            serta{' '}
            <span className="text-emerald-400 font-bold">{availableMaterialsCount} bahan</span>{' '}
            di sekitar siswa, berikut simulasi proyek realistis yang dapat langsung dipraktikkan.
          </p>

          {/* Two Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={onGoToStep1}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Profesi:</span>
              <span className="font-bold text-white">{profession || project.profession || 'sablon baju'}</span>
              <span className="text-indigo-400">(Ubah)</span>
            </button>

            <button
              type="button"
              onClick={onGoToStep2}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Sumber Daya:</span>
              <span className="font-bold text-white">
                {availableToolsCount} Alat, {availableMaterialsCount} Bahan
              </span>
              <span className="text-emerald-400">(Kelola)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter & Action Bar (Exact replica of image_61275337.png) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Kesulitan:</span>
          </div>

          <div className="flex gap-1.5">
            {['Semua', 'Mudah', 'Sedang', 'Menantang'].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button: Rancang Ide Proyek AI Gemini -> Opens Studio Modal */}
        <button
          type="button"
          onClick={() => setIsStudioModalOpen(true)}
          className="self-start sm:self-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Rancang Ide Proyek AI Gemini</span>
        </button>
      </div>

      {/* 3. Project Detail & Jobsheet Section */}
      <div className="space-y-6">
        {/* Project Card Header with Quick Actions */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-800/40 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Top row with badges and action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  {project.profession}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{project.difficulty}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{project.estimatedTime}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-400">
                  SMKN 4 Kendari
                </span>
              </div>

              {/* Action Buttons: Save, Print, AI Mentor */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onOpenAiConsultant}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Tanya Guru AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPrintReportOpen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Cetak lembar laporan hasil pengerjaan, progress, dan nilai siswa"
                >
                  <Printer className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Cetak Hasil &amp; Nilai</span>
                </button>

                {/* SAVE PROJECT BUTTON */}
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isSaved
                      ? 'bg-emerald-600/90 hover:bg-emerald-600 text-white shadow-emerald-900/30 border border-emerald-500/40'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 border border-indigo-400/40'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Tersimpan</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>Simpan Proyek</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-300/90 font-medium mt-1">
                {project.tagline}
              </p>
            </div>

            {/* Overview */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {project.overview}
            </p>

            {/* Dual Cards: Output Fisik & Peluang Usaha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-900/40">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs sm:text-sm mb-1">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Wujud Fisik Purwarupa (Deliverable Akhir):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.prototypeOutput}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-900/40">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs sm:text-sm mb-1">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Peluang Usaha &amp; Nilai Ekonomi (Kewirausahaan):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.entrepreneurshipOpportunity}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Resources Pill List */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-300">
              Alat &amp; Bahan Terverifikasi yang Digunakan:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.toolsUsed?.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
                  🔧 {t}
                </span>
              ))}
              {project.materialsUsed?.map((m, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                  📦 {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress & Steps List with INLINE DESCRIPTION EDITING */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-6">
          {/* Progress Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Langkah Pengerjaan &amp; Progres Siswa</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {completedSteps} dari {totalSteps} Selesai
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Centang langkah yang selesai. <span className="text-indigo-400 font-semibold">Klik ikon pensil untuk mengedit deskripsi instruksi teknis</span> sesuai modul praktikum di sekolah.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                {/* BUTTON CETAK HASIL LANGKAH PENGERJAAN & PROGRESS SISWA BESERTA NILAINYA */}
                <button
                  type="button"
                  onClick={() => setIsPrintReportOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/25 cursor-pointer"
                  title="Cetak hasil langkah pengerjaan dan progress siswa beserta nilainya"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Hasil &amp; Nilai Siswa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddStep(!showAddStep)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Langkah</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden mt-3">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mt-1.5 px-0.5">
              <span>Persiapan &amp; K3</span>
              <span className="font-bold text-indigo-300">{progressPercent}% Tuntas</span>
              <span>Dokumentasi 5R</span>
            </div>
          </div>

          {/* Add Step Form */}
          {showAddStep && (
            <form onSubmit={handleAddNewStep} className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-indigo-500/40 space-y-3">
              <div className="font-bold text-xs text-indigo-300">Tambah Langkah Pengerjaan Baru:</div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Judul Langkah:</label>
                <input
                  type="text"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                  placeholder="Misal: Kalibrasi Sudut Pencahayaan Diffuser"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Deskripsi Petunjuk Kerja:</label>
                <textarea
                  value={newStepDesc}
                  onChange={(e) => setNewStepDesc(e.target.value)}
                  rows={2}
                  placeholder="Instruksi rinci pengerjaan teknis..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Peringatan K3 (Opsional):</label>
                <input
                  type="text"
                  value={newStepSafety}
                  onChange={(e) => setNewStepSafety(e.target.value)}
                  placeholder="Peringatan keselamatan jika ada..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddStep(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Simpan Langkah
                </button>
              </div>
            </form>
          )}

          {/* Steps List */}
          <div className="space-y-4">
            {project.steps.map((step) => {
              const isEditing = editingStepId === step.id;

              return (
                <div
                  key={step.id}
                  className={`rounded-xl border transition-all p-4 sm:p-5 ${
                    step.completed
                      ? 'bg-slate-950/40 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => handleToggleComplete(step.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                          step.completed
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/30'
                            : 'border-2 border-slate-700 hover:border-indigo-500 bg-slate-900 text-transparent'
                        }`}
                        title={step.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                            Langkah {step.stepNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              step.completed
                                ? 'bg-emerald-500/15 text-emerald-300'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {step.completed ? 'Selesai' : 'Dalam Proses'}
                          </span>
                        </div>
                        <h5
                          className={`text-sm sm:text-base font-bold transition-colors ${
                            step.completed ? 'text-slate-200 line-through decoration-emerald-500/60' : 'text-white'
                          }`}
                        >
                          {step.title}
                        </h5>
                      </div>
                    </div>

                    {/* Actions: Edit Deskripsi & Delete */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => (isEditing ? setEditingStepId(null) : handleStartEditDesc(step))}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500/40 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                        title="Edit deskripsi langkah pengerjaan"
                      >
                        <Edit3 className="w-3 h-3 text-indigo-400" />
                        <span className="hidden xs:inline">{isEditing ? 'Batal' : 'Edit Deskripsi'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteStep(step.id)}
                        className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Hapus langkah"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="pl-9 space-y-3">
                    {isEditing ? (
                      <div className="space-y-2 p-3 bg-slate-900 rounded-xl border border-indigo-500/50 shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Deskripsi Pengerjaan Langkah:</span>
                          </span>
                          <span className="text-[10px] text-slate-400">Tekan Simpan setelah selesai</span>
                        </div>
                        <textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          rows={4}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingStepId(null)}
                            className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEditDesc(step.id)}
                            className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Simpan Perubahan</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    )}

                    {/* Safety Alert (K3) */}
                    {step.safetyNote && (
                      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/25 border border-amber-800/40 text-amber-200/90 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-300">Peringatan K3: </span>
                          <span>{step.safetyNote}</span>
                        </div>
                      </div>
                    )}

                    {/* Expected Result */}
                    {step.expectedResult && (
                      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200/90 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-indigo-300">Target Sukses: </span>
                          <span>{step.expectedResult}</span>
                        </div>
                      </div>
                    )}

                    {/* Student/Teacher Practical Notes Field */}
                    <div className="pt-2">
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Catatan Progres Siswa / Catatan Guru Pembimbing:
                      </label>
                      <input
                        type="text"
                        value={step.notes || ''}
                        onChange={(e) => handleUpdateStepNotes(step.id, e.target.value)}
                        placeholder="Tulis hasil pengukuran, kendala di lapangan, atau catatan paraf instruktur..."
                        className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evaluation Rubric */}
        {project.assessmentRubric && project.assessmentRubric.length > 0 && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="text-base sm:text-lg font-bold text-white">
                Rubrik Penilaian Unjuk Kerja (Jobsheet Guru SMK)
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Komponen Penilaian</th>
                    <th className="py-2.5 px-3 w-20">Bobot</th>
                    <th className="py-2.5 px-3">Indikator Keberhasilan Siswa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {project.assessmentRubric.map((rubric, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40">
                      <td className="py-2.5 px-3 font-semibold text-white">{rubric.criteria}</td>
                      <td className="py-2.5 px-3 font-bold text-indigo-400">{rubric.weight}</td>
                      <td className="py-2.5 px-3 text-slate-400">{rubric.indicator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* POPUP MODAL (User Requirement: "tambahkan pop up seperti digambar sebelum menampilkan langkah pengerjaan & progress siswa") */}
      <AiProjectStudioModal
        isOpen={isStudioModalOpen}
        onClose={() => setIsStudioModalOpen(false)}
        profession={profession || project.profession || 'sablon baju'}
        tools={tools}
        materials={materials}
        difficulty={selectedDifficulty}
        onExecuteGenerate={(config) => {
          onExecuteCustomProject(config);
          setIsStudioModalOpen(false);
        }}
        isLoading={isGeneratingProject}
      />

      {/* MODAL CETAK HASIL LANGKAH PENGERJAAN & PROGRESS SISWA BESERTA NILAINYA */}
      <PrintReportModal
        isOpen={isPrintReportOpen}
        onClose={() => setIsPrintReportOpen(false)}
        project={project}
        profession={profession || project.profession || 'sablon baju'}
      />
    </div>
  );
};
