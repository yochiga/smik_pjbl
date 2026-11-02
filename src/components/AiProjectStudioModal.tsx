import React, { useState, useEffect } from 'react';
import { Sparkles, X, Wrench, Package, ArrowRight, Loader2 } from 'lucide-react';
import { ToolItem, MaterialItem } from '../types';

export type SimulationFocus =
  | 'Standar Praktik & Industri'
  | 'Kreatif Daur Ulang & Zero Waste'
  | 'Rumahan & Ramah Pemula'
  | 'Standar Uji Kompetensi Keahlian (UKK)';

interface AiProjectStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  profession: string;
  tools: ToolItem[];
  materials: ToolItem[] | MaterialItem[];
  difficulty: string;
  onExecuteGenerate: (config: {
    profession: string;
    toolsStr: string;
    materialsStr: string;
    focus: SimulationFocus;
    difficulty: string;
    notes: string;
  }) => void;
  isLoading: boolean;
}

export const AiProjectStudioModal: React.FC<AiProjectStudioModalProps> = ({
  isOpen,
  onClose,
  profession,
  tools,
  materials,
  difficulty,
  onExecuteGenerate,
  isLoading,
}) => {
  const [inputProfession, setInputProfession] = useState(profession);
  const [toolsText, setToolsText] = useState('');
  const [materialsText, setMaterialsText] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<SimulationFocus>('Standar Praktik & Industri');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Mudah');
  const [customNotes, setCustomNotes] = useState('');

  // Sync state whenever modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setInputProfession(profession || 'sablon baju');

      const toolsList = tools.filter((t) => t.available !== false).map((t) => t.name);
      setToolsText(
        toolsList.length > 0
          ? toolsList.join(', ')
          : 'Cutter Presisi (Pen Cutter / Cutter Tajam), Gunting & Penggaris Besi, Spons Cuci Piring / Kuas Busa / Rakel Miniatur, Kamera Smartphone & Lampu Meja Belajar'
      );

      const matsList = materials.filter((m) => m.available !== false).map((m) => {
        const qty = 'estimatedQty' in m && m.estimatedQty ? ` [${m.estimatedQty}]` : '';
        return `${m.name}${qty}`;
      });
      setMaterialsText(
        matsList.length > 0
          ? matsList.join(', ')
          : 'Kardus Bekas Ukuran Sedang (Kotak Sepatu / Mie Instan), Kertas HVS Putih atau Kertas Kalkir/Mika Tipis, Cat Akrilik / Cat Tekstil Sablon, Kain Perca Katun / Tote Bag Polos / Kaos Bekas, Lakban Kertas (Masking Tape) / Selotip'
      );

      setSelectedDifficulty(difficulty === 'Semua' ? 'Mudah' : difficulty || 'Mudah');
    }
  }, [isOpen, profession, tools, materials, difficulty]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteGenerate({
      profession: inputProfession.trim() || profession || 'sablon baju',
      toolsStr: toolsText.trim(),
      materialsStr: materialsText.trim(),
      focus: selectedFocus,
      difficulty: selectedDifficulty,
      notes: customNotes.trim(),
    });
  };

  const focusOptions: {
    id: SimulationFocus;
    icon: string;
    title: string;
    desc: string;
  }[] = [
    {
      id: 'Standar Praktik & Industri',
      icon: '🏭',
      title: 'Standar Praktik & Industri',
      desc: 'Mensimulasikan SOP bengkel/lab industri nyata',
    },
    {
      id: 'Kreatif Daur Ulang & Zero Waste',
      icon: '♻️',
      title: 'Kreatif Daur Ulang & Zero Waste',
      desc: 'Memaksimalkan limbah barang bekas sekitar',
    },
    {
      id: 'Rumahan & Ramah Pemula',
      icon: '🏠',
      title: 'Rumahan & Ramah Pemula',
      desc: 'Aman dikerjakan mandiri tanpa risiko listrik tinggi',
    },
    {
      id: 'Standar Uji Kompetensi Keahlian (UKK)',
      icon: '🏆',
      title: 'Standar Uji Kompetensi Keahlian (UKK)',
      desc: 'Fokus pada capaian portofolio nilai SMK',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-auto">
        {/* Header (Exact replica of image_fabcb95c.png) */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-600/30 ring-1 ring-white/20 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div className="flex items-center gap-2.5">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Studio Perancang Proyek Vokasi AI
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GEMINI 3.8 FLASH</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body (Exact replica of image_fabcb95c.png) */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
          {/* 1. Profesi atau Bidang Usaha yang Ingin Disimulasikan */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              1. Profesi atau Bidang Usaha yang Ingin Disimulasikan:
            </label>
            <input
              type="text"
              value={inputProfession}
              onChange={(e) => setInputProfession(e.target.value)}
              placeholder="Contoh: sablon baju, teknisi wifi, bakery..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm sm:text-base font-semibold text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
          </div>

          {/* 2 & 3. Dua Kolom: Alat & Bahan Baku */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2. Alat yang Ada di Sekitar Siswa */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <span>🔑</span>
                <span>2. Alat yang Ada di Sekitar Siswa:</span>
              </label>
              <textarea
                value={toolsText}
                onChange={(e) => setToolsText(e.target.value)}
                rows={3}
                placeholder="Daftar alat yang tersedia..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none shadow-inner"
              />
            </div>

            {/* 3. Bahan Baku yang Ada di Sekitar Siswa */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <span>📦</span>
                <span>3. Bahan Baku yang Ada di Sekitar Siswa:</span>
              </label>
              <textarea
                value={materialsText}
                onChange={(e) => setMaterialsText(e.target.value)}
                rows={3}
                placeholder="Daftar bahan baku yang tersedia..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none shadow-inner"
              />
            </div>
          </div>

          {/* 4. Pilih Pendekatan & Fokus Simulasi AI */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2.5">
              4. Pilih Pendekatan &amp; Fokus Simulasi AI:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {focusOptions.map((opt) => {
                const isSelected = selectedFocus === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedFocus(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950/90 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md shadow-indigo-950/30'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/70'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{opt.icon}</span>
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {opt.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tingkat Kesulitan & Catatan Tambahan (Bawah) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Tingkat Kesulitan */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Tingkat Kesulitan:
              </label>
              <div className="flex gap-1.5">
                {['Mudah', 'Sedang', 'Menantang'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Catatan Tambahan (Opsional):
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Contoh: Tanpa menggunakan kompor api besar..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner"
              />
            </div>
          </div>

          {/* Action Button: Rancang Proyek Baru dengan AI Gemini */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI Gemini Merancang Proyek...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Rancang Proyek Baru dengan AI Gemini</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
