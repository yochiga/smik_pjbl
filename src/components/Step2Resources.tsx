import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Wrench,
  Package,
  Layers,
  RotateCw,
  Clock,
  AlertTriangle,
  Lightbulb,
  Leaf,
  Store,
  Zap,
  ArrowRight,
  ArrowLeft,
  Check,
  Trash2,
  Plus,
  Loader2,
} from 'lucide-react';
import {
  ResourceRecommendation,
  ToolItem,
  MaterialItem,
  PrototypeApproach,
} from '../types';

interface Step2ResourcesProps {
  profession: string;
  recommendation: ResourceRecommendation | null;
  onBackToStep1: () => void;
  onGenerateProject: (
    selectedTools: ToolItem[],
    selectedMaterials: MaterialItem[],
    prototypeIdea: string,
    notes: string
  ) => void;
  isGeneratingProject: boolean;
  isAnalyzingResources?: boolean;
  onRegenerateRecommendation?: (approach: PrototypeApproach) => void;
}

export const Step2Resources: React.FC<Step2ResourcesProps> = ({
  profession,
  recommendation,
  onBackToStep1,
  onGenerateProject,
  isGeneratingProject,
  isAnalyzingResources = false,
  onRegenerateRecommendation,
}) => {
  // Selected Approach
  const [selectedApproach, setSelectedApproach] = useState<PrototypeApproach>(
    recommendation?.approach || 'Standar Vokasi SMK'
  );

  // Tools and Materials state
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);

  // Manual Add Tool state
  const [showAddTool, setShowAddTool] = useState(false);
  const [newToolName, setNewToolName] = useState('');
  const [newToolImportance, setNewToolImportance] = useState<'Wajib' | 'Pendukung'>('Wajib');
  const [newToolDesc, setNewToolDesc] = useState('');
  const [newToolSub, setNewToolSub] = useState('');

  // Manual Add Material state
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [newMaterialQty, setNewMaterialQty] = useState('');
  const [newMaterialDesc, setNewMaterialDesc] = useState('');
  const [newMaterialRecycle, setNewMaterialRecycle] = useState('');

  // Sync with incoming recommendation
  useEffect(() => {
    if (recommendation) {
      if (recommendation.recommendedTools) {
        setTools(recommendation.recommendedTools);
      }
      if (recommendation.recommendedMaterials) {
        setMaterials(recommendation.recommendedMaterials);
      }
      if (recommendation.approach) {
        setSelectedApproach(recommendation.approach);
      }
    }
  }, [recommendation]);

  // Toggle tool checkbox
  const toggleTool = (id: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, available: !t.available } : t))
    );
  };

  // Toggle material checkbox
  const toggleMaterial = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m))
    );
  };

  // Remove tool
  const removeTool = (id: string) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
  };

  // Remove material
  const removeMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  // Add custom tool
  const handleAddToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName.trim()) return;

    const newT: ToolItem = {
      id: `tool-${Date.now()}`,
      name: newToolName.trim(),
      importance: newToolImportance,
      description: newToolDesc.trim() || 'Peralatan pendukung tambahan',
      substituteTip: newToolSub.trim() || undefined,
      available: true,
      isCustom: true,
    };

    setTools((prev) => [...prev, newT]);
    setNewToolName('');
    setNewToolDesc('');
    setNewToolSub('');
    setShowAddTool(false);
  };

  // Add custom material
  const handleAddMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterialName.trim()) return;

    const newM: MaterialItem = {
      id: `mat-${Date.now()}`,
      name: newMaterialName.trim(),
      estimatedQty: newMaterialQty.trim() || 'Secukupnya',
      description: newMaterialDesc.trim() || 'Bahan baku pendukung tambahan',
      recycleAlternative: newMaterialRecycle.trim() || undefined,
      available: true,
      isCustom: true,
    };

    setMaterials((prev) => [...prev, newM]);
    setNewMaterialName('');
    setNewMaterialQty('');
    setNewMaterialDesc('');
    setNewMaterialRecycle('');
    setShowAddMaterial(false);
  };

  // Stats calculation
  const totalTools = tools.length;
  const availableTools = tools.filter((t) => t.available).length;

  const totalMaterials = materials.length;
  const availableMaterials = materials.filter((m) => m.available).length;

  const totalItems = totalTools + totalMaterials;
  const totalAvailable = availableTools + availableMaterials;
  const readinessPercent = totalItems > 0 ? Math.round((totalAvailable / totalItems) * 100) : 0;

  // Metadata from recommendation
  const prototypeTitle =
    recommendation?.prototypeIdea ||
    `Purwarupa Mini Lightbox Studio Foto Produk & Sablon Stensil Kaos Manual`;

  const whyRepresentativeText =
    recommendation?.whyRepresentative ||
    `Merepresentasikan tugas pokok Desainer Grafis & Industri Kreatif: perancangan template stensil pola vector, teknik cetak rintang manual (stencil screen printing), dan pencahayaan studio untuk katalog promosi komersial.`;

  const physicalOutputText =
    recommendation?.physicalOutput ||
    `1 unit mini lightbox fotografi produk berkardus dan 1 sampel sablon stensil pada kain/tote bag.`;

  const competenciesText =
    recommendation?.competencies ||
    `Prinsip komposisi fotografi produk dan refleksi cahaya difusi studio • Teknik stensil pola pisau cutter presisi untuk sablon manual`;

  const difficultyText = recommendation?.difficulty || 'Mudah';
  const durationText = recommendation?.estimatedTime || '2-3 Jam';

  const k3List = recommendation?.k3Protocols && recommendation.k3Protocols.length > 0
    ? recommendation.k3Protocols
    : [
        'Gunakan alas potong (cutting mat atau kardus tebal) agar pisau cutter tidak merusak permukaan meja.',
        'Biarkan cat mengering sempurna sebelum kertas stensil dilepas dari kain.',
      ];

  const handleExecute = () => {
    const selectedTools = tools.filter((t) => t.available);
    const selectedMaterials = materials.filter((m) => m.available);
    onGenerateProject(selectedTools, selectedMaterials, prototypeTitle, `Pendekatan: ${selectedApproach}`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Card: AI Menganalisis Kebutuhan Purwarupa (Image 1) */}
      <div className="rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>LANGKAH 2 DARI 3: REKOMENDASI ALAT &amp; BAHAN PURWARUPA AI</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            AI Menganalisis Kebutuhan Purwarupa untuk:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-300 font-black">
              {profession || 'sablon baju'}
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Siswa tidak perlu lagi bingung menebak-nebak alat atau bahan apa yang dibutuhkan. AI telah merekomendasikan{' '}
            <span className="text-emerald-400 font-bold underline decoration-emerald-500/40 underline-offset-4">
              daftar alat dan bahan baku yang harus ada
            </span>{' '}
            untuk membuat purwarupa representatif, lengkap dengan alternatif murah dan bahan daur ulang di sekitar siswa.
          </p>
        </div>
      </div>

      {/* 2. Pendekatan Purwarupa & Rancang Ulang Bar (Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 sm:p-4 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
            PENDEKATAN PURWARUPA:
          </span>

          {/* Standar Vokasi SMK */}
          <button
            type="button"
            onClick={() => {
              setSelectedApproach('Standar Vokasi SMK');
              if (onRegenerateRecommendation) onRegenerateRecommendation('Standar Vokasi SMK');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedApproach === 'Standar Vokasi SMK'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Standar Vokasi SMK</span>
          </button>

          {/* Bahan Daur Ulang */}
          <button
            type="button"
            onClick={() => {
              setSelectedApproach('Bahan Daur Ulang');
              if (onRegenerateRecommendation) onRegenerateRecommendation('Bahan Daur Ulang');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedApproach === 'Bahan Daur Ulang'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400/40'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bahan Daur Ulang</span>
          </button>

          {/* Sampel Usaha Komersial */}
          <button
            type="button"
            onClick={() => {
              setSelectedApproach('Sampel Usaha Komersial');
              if (onRegenerateRecommendation) onRegenerateRecommendation('Sampel Usaha Komersial');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedApproach === 'Sampel Usaha Komersial'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/40'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-purple-300" />
            <span>Sampel Usaha Komersial</span>
          </button>
        </div>

        {/* Rancang Ulang dengan AI */}
        <button
          type="button"
          disabled={isAnalyzingResources || isGeneratingProject}
          onClick={() => {
            if (onRegenerateRecommendation) onRegenerateRecommendation(selectedApproach);
          }}
          className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          {isAnalyzingResources ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
          ) : (
            <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
          )}
          <span>{isAnalyzingResources ? 'Menganalisis...' : 'Rancang Ulang dengan AI'}</span>
        </button>
      </div>

      {/* 3. Card: Rancangan Purwarupa Terpilih (Image 2) */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 p-6 sm:p-7 shadow-xl space-y-5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
            <span className="text-xs font-extrabold tracking-wider text-emerald-400 uppercase">
              RANCANGAN PURWARUPA TERPILIH
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
              {difficultyText}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{durationText}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
          {prototypeTitle}
        </h3>

        {/* Why Representative Box */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm mb-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mengapa Purwarupa Ini Merepresentasikan Profesi Target:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
            {whyRepresentativeText}
          </p>
        </div>

        {/* 2-Column sub-cards: Output Fisik & Kompetensi yang Dilatih */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90">
            <div className="text-xs font-bold text-slate-400 mb-1">
              Output Fisik Purwarupa:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {physicalOutputText}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90">
            <div className="text-xs font-bold text-slate-400 mb-1">
              Kompetensi yang Dilatih:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {competenciesText}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Card: Kesiapan Alat & Bahan di Sekitar Siswa: 100% (Image 2) */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-teal-400" />
            <h4 className="text-sm sm:text-base font-bold text-white">
              Kesiapan Alat &amp; Bahan di Sekitar Siswa: {readinessPercent}%
            </h4>
          </div>

          <span className="self-start sm:self-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/90 text-slate-300 border border-slate-700/60">
            {totalAvailable} dari {totalItems} Kebutuhan Terpenuhi
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-3">
          Centang item yang sudah Anda miliki di rumah atau sekolah. Gunakan saran alternatif murah dari AI untuk item yang belum ada.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${readinessPercent}%` }}
          />
        </div>
      </div>

      {/* 5. Two-Column Grid: Alat yang Harus Ada & Bahan Baku Purwarupa (Image 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Alat yang Harus Ada */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-800/50 flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Alat yang Harus Ada
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Direkomendasikan AI untuk purwarupa ini
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800/90 text-slate-300 border border-slate-700/80">
                {availableTools} / {totalTools} Ada
              </span>
            </div>

            {/* Tool items list */}
            <div className="space-y-3">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none space-y-2.5 ${
                    tool.available
                      ? 'bg-slate-950/70 border-emerald-500/50 hover:border-emerald-400 shadow-md shadow-emerald-950/20'
                      : 'bg-slate-950/30 border-slate-800/80 opacity-60 hover:opacity-80'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                          tool.available
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'border border-slate-700 bg-slate-900 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>

                      {/* Tool Name */}
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {tool.name}
                      </span>

                      {/* Importance Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                          tool.importance === 'Wajib'
                            ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                            : 'bg-blue-950/70 text-blue-300 border border-blue-800/60'
                        }`}
                      >
                        {tool.importance}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTool(tool.id);
                      }}
                      className="text-slate-600 hover:text-rose-400 transition-colors p-1 cursor-pointer shrink-0"
                      title="Hapus alat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Alternative Box */}
                  {tool.substituteTip && (
                    <div className="ml-7 p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200/90 text-xs flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">Alternatif Sederhana Sekitar: </span>
                        <span>{tool.substituteTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Manual Add Tool Form */}
            {showAddTool && (
              <form onSubmit={handleAddToolSubmit} className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
                <div className="text-xs font-bold text-indigo-300">Tambah Alat Manual:</div>
                <div>
                  <input
                    type="text"
                    value={newToolName}
                    onChange={(e) => setNewToolName(e.target.value)}
                    placeholder="Nama Alat (contoh: Tang Potong, Palu Karet...)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={newToolImportance}
                    onChange={(e) => setNewToolImportance(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="Wajib">Wajib</option>
                    <option value="Pendukung">Pendukung</option>
                  </select>
                  <input
                    type="text"
                    value={newToolDesc}
                    onChange={(e) => setNewToolDesc(e.target.value)}
                    placeholder="Fungsi alat dalam purwarupa..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newToolSub}
                    onChange={(e) => setNewToolSub(e.target.value)}
                    placeholder="Alternatif sederhana sekitar jika ada..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTool(false)}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Simpan Alat
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Bottom Button (Image 4) */}
          <button
            type="button"
            onClick={() => setShowAddTool(!showAddTool)}
            className="w-full py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Punya Alat Lain di Sekitar? Tambah Manual</span>
          </button>
        </div>

        {/* Column 2: Bahan Baku Purwarupa */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Bahan Baku Purwarupa
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Komponen fisik yang dirakit menjadi purwarupa
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800/90 text-slate-300 border border-slate-700/80">
                {availableMaterials} / {totalMaterials} Ada
              </span>
            </div>

            {/* Material items list */}
            <div className="space-y-3">
              {materials.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => toggleMaterial(mat.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none space-y-2.5 ${
                    mat.available
                      ? 'bg-slate-950/70 border-emerald-500/50 hover:border-emerald-400 shadow-md shadow-emerald-950/20'
                      : 'bg-slate-950/30 border-slate-800/80 opacity-60 hover:opacity-80'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                          mat.available
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'border border-slate-700 bg-slate-900 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>

                      {/* Material Name */}
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {mat.name}
                      </span>

                      {/* Takaran / Qty Badge */}
                      {mat.estimatedQty && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0 bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
                          {mat.estimatedQty}
                        </span>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMaterial(mat.id);
                      }}
                      className="text-slate-600 hover:text-rose-400 transition-colors p-1 cursor-pointer shrink-0"
                      title="Hapus bahan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                    {mat.description}
                  </p>

                  {/* Recycle Alternative Box */}
                  {(mat.recycleAlternative || mat.substituteTip) && (
                    <div className="ml-7 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-emerald-200/90 text-xs flex items-start gap-2">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-300">Alternatif Daur Ulang Sekitar: </span>
                        <span>{mat.recycleAlternative || mat.substituteTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Manual Add Material Form */}
            {showAddMaterial && (
              <form onSubmit={handleAddMaterialSubmit} className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-3">
                <div className="text-xs font-bold text-purple-300">Tambah Bahan Baku Manual:</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMaterialName}
                    onChange={(e) => setNewMaterialName(e.target.value)}
                    placeholder="Nama Bahan (contoh: Pipa PVC, Kain Perca...)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={newMaterialQty}
                    onChange={(e) => setNewMaterialQty(e.target.value)}
                    placeholder="Takaran: 1 buah / 2 lembar"
                    className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newMaterialDesc}
                    onChange={(e) => setNewMaterialDesc(e.target.value)}
                    placeholder="Fungsi bahan dalam purwarupa..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newMaterialRecycle}
                    onChange={(e) => setNewMaterialRecycle(e.target.value)}
                    placeholder="Alternatif daur ulang sekitar jika ada..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMaterial(false)}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Simpan Bahan
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Bottom Button (Image 4) */}
          <button
            type="button"
            onClick={() => setShowAddMaterial(!showAddMaterial)}
            className="w-full py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Punya Bahan Baku / Barang Bekas Lain? Tambah Manual</span>
          </button>
        </div>
      </div>

      {/* 6. Protocol Keselamatan Kerja (K3) Purwarupa Card (Image 4) */}
      <div className="rounded-2xl bg-amber-950/20 border border-amber-700/40 p-5 sm:p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-900/40 text-amber-400 flex items-center justify-center shrink-0 border border-amber-700/50 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>

          <div className="space-y-1.5">
            <h5 className="text-xs sm:text-sm font-bold text-amber-300">
              Protokol Keselamatan Kerja (K3) Purwarupa:
            </h5>
            <ul className="text-xs text-amber-200/90 space-y-1 pl-1 leading-relaxed">
              {k3List.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 7. Action Row: Ganti Profesi & Lanjut ke Simulasi & Jobsheet (Image 4) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBackToStep1}
          disabled={isGeneratingProject}
          className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ganti Profesi / Usaha Target</span>
        </button>

        <button
          type="button"
          onClick={handleExecute}
          disabled={isGeneratingProject || totalAvailable === 0}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 cursor-pointer"
        >
          {isGeneratingProject ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Merancang Jobsheet &amp; Langkah Purwarupa...</span>
            </>
          ) : (
            <>
              <span>Lanjut ke Simulasi &amp; Jobsheet Purwarupa</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
