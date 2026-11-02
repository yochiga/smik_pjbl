import React, { useState } from 'react';
import { Sparkles, Briefcase, ArrowRight, Lightbulb, Compass, Loader2 } from 'lucide-react';
import { VOCATIONAL_PROGRAMS } from '../data/vocationalCurriculum';

interface Step1ProfessionProps {
  profession: string;
  setProfession: (p: string) => void;
  onSubmit: (professionName: string) => void;
  isLoading: boolean;
}

export const Step1Profession: React.FC<Step1ProfessionProps> = ({
  profession,
  setProfession,
  onSubmit,
  isLoading,
}) => {
  const [inputVal, setInputVal] = useState(profession);
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingStepText, setLoadingStepText] = useState('Menganalisis Kebutuhan...');

  React.useEffect(() => {
    if (!isLoading) return;
    const messages = [
      'Menganalisis profesi kejuruan...',
      'Mengidentifikasi alat esensial...',
      'Menyusun bahan baku & substitusi...',
      'Menyiapkan standar K3 bengkel...',
    ];
    let idx = 0;
    setLoadingStepText(messages[0]);
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setLoadingStepText(messages[idx]);
    }, 1200);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setErrorMsg('Silakan ketik atau pilih profesi / bidang usaha yang ingin dipelajari.');
      return;
    }
    setErrorMsg('');
    onSubmit(inputVal.trim());
  };

  const handleSelectPreset = (presetName: string) => {
    setInputVal(presetName);
    setProfession(presetName);
    setErrorMsg('');
    onSubmit(presetName);
  };

  return (
    <div className="space-y-6">
      {/* Hero Explanatory Card - Exactly as in Screenshot */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-900/90 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>LANGKAH 1 DARI 3: EKSPLORASI CITA-CITA SISWA</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            Profesi atau Bidang Usaha Apa yang Ingin Dipelajari?
          </h2>

          {/* Body */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Pilih jurusan atau bidang kejuruan SMK yang ingin ditekuni siswa, atau masukkan ide usaha bebas. AI Gemini
            akan langsung menganalisis dan <span className="text-indigo-400 font-semibold underline decoration-indigo-500/50 underline-offset-4">merekomendasikan alat serta bahan yang harus ada</span> untuk membuat purwarupa atau simulasi representatif di sekitar siswa.
          </p>
        </div>
      </div>

      {/* Input Card - Exactly as in Screenshot */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Ketik Profesi / Bidang Usaha Pilihan Siswa:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setProfession(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                disabled={isLoading}
                placeholder="Contoh: Teknisi Jaringan Wi-Fi, Servis Busi & Karburator, Bakery Roti Manis, Hidroponik..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:text-indigo-300/40 text-white font-medium px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer shrink-0 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="animate-pulse">{loadingStepText}</span>
                </>
              ) : (
                <>
                  <span>Gunakan Profesi Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
          )}
        </form>

        {/* Quick Suggestion Chips */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Atau Pilih Rekomendasi Cepat Bidang SMK Populer (SMKN 4 Kendari &amp; Umum):</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'sablon baju',
              'Teknisi Jaringan Wi-Fi',
              'Servis Busi & Karburator',
              'Bakery Roti Manis',
              'Hidroponik Sayur Otomatis',
              'Desain Kemasan & Mockup DKV',
              'Aplikasi Kasir Toko RPL',
              'Instalasi Penerangan Rumah',
              'Fabrikasi Rak Besi Las',
              'Jahit Busana & Tote Bag',
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/70 hover:bg-indigo-600/30 hover:border-indigo-500/50 border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>+</span>
                <span>{preset}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Indonesian SMK Vocational Programs */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Eksplorasi Berdasarkan Konsentrasi Kejuruan SMK
            </h3>
          </div>
          <span className="text-xs text-slate-400">Pilih untuk analisis instan</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOCATIONAL_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="group p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {prog.code}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {prog.cluster}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
                  {prog.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {prog.description}
                </p>
                <div className="space-y-1 mb-4">
                  <div className="text-[11px] text-slate-500 font-medium">Contoh Purwarupa:</div>
                  <div className="text-xs text-indigo-300/90 font-medium">
                    • {prog.prototypeExamples[0]}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPreset(prog.title)}
                disabled={isLoading}
                className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 hover:border-indigo-500"
              >
                <span>Analisis Alat &amp; Bahan AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
