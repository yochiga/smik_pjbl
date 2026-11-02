import React, { useState } from 'react';
import {
  X,
  Printer,
  Award,
  CheckCircle2,
  Clock,
  Gauge,
  User,
  School,
  FileCheck,
  Calendar,
  AlertTriangle,
  FileText,
  Sliders,
  Check,
} from 'lucide-react';
import { ProjectSimulation, ProjectStep } from '../types';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectSimulation;
  profession: string;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  project,
  profession,
}) => {
  // Student & Assessment Metadata
  const [studentName, setStudentName] = useState('Ahmad Fauzi & Tim Praktik');
  const [studentId, setStudentId] = useState('NISN: 0083920194 / No. Presensi: 04');
  const [studentClass, setStudentClass] = useState('XII DKV 1 / Desain Komunikasi Visual');
  const [examDate, setExamDate] = useState(() => {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });
  const [examinerName, setExaminerName] = useState('Drs. H. Mulyadi, S.Pd., M.T.');
  const [examinerNip, setExaminerNip] = useState('NIP. 19780512 200501 1 008');
  const [headmasterName, setHeadmasterName] = useState('Kepala Program Keahlian SMKN 4 Kendari');

  // Completed steps calculation
  const totalSteps = project.steps.length;
  const completedSteps = project.steps.filter((s) => s.completed).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  // Rubric Scores State (pre-populated with realistic values based on completion)
  const defaultBaseScore = progressPercent >= 100 ? 92 : progressPercent >= 70 ? 85 : 75;

  const [scores, setScores] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    (project.assessmentRubric || []).forEach((_, idx) => {
      initial[idx] = Math.min(100, Math.max(70, defaultBaseScore + (idx % 2 === 0 ? 2 : -1)));
    });
    return initial;
  });

  const [instructorFeedback, setInstructorFeedback] = useState(
    progressPercent === 100
      ? 'Siswa telah menyelesaikan seluruh tahapan instruksi kerja purwarupa sesuai SOP K3. Hasil cetak stensil tajam dan presisi, miniatur studio berfungsi dengan pencahayaan difusi yang merata.'
      : 'Siswa telah melaksanakan sebagian besar tahapan pengerjaan dengan baik. Diperlukan penguatan pada ketelitian perakitan dan pencatatan parameter hasil pengujian.'
  );

  if (!isOpen) return null;

  // Calculate weighted final score
  const rubricList = project.assessmentRubric || [
    { criteria: 'Kepatuhan K3 & Penggunaan APD', weight: '25%', indicator: 'Menerapkan SOP keselamatan kerja secara konsisten' },
    { criteria: 'Kualitas Teknis & Presisi Purwarupa', weight: '45%', indicator: 'Purwarupa terakit kokoh dan sesuai spesifikasi' },
    { criteria: 'Fungsionalitas & Dokumentasi Jobsheet', weight: '30%', indicator: 'Purwarupa teruji dan catatan hasil terisi lengkap' },
  ];

  let totalWeightedScore = 0;
  rubricList.forEach((r, idx) => {
    const weightNum = parseInt(r.weight.replace('%', ''), 10) || (100 / rubricList.length);
    const scoreVal = scores[idx] !== undefined ? scores[idx] : defaultBaseScore;
    totalWeightedScore += (scoreVal * weightNum) / 100;
  });

  const finalScoreRounded = Math.round(totalWeightedScore);
  const gradeLetter =
    finalScoreRounded >= 90 ? 'A (Sangat Baik / Kompeten Unggul)' :
    finalScoreRounded >= 80 ? 'B (Baik / Kompeten)' :
    finalScoreRounded >= 75 ? 'C (Cukup / Cukup Kompeten)' : 'D (Belum Kompeten)';

  const competencyStatus = finalScoreRounded >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN';

  const handlePrintAction = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Cetak Hasil Langkah Pengerjaan, Progres &amp; Nilai Siswa
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  SMKN 4 Kendari
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Format resmi lembar penilaian unjuk kerja dan jobsheet praktik kejuruan siswa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintAction}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang (Print / PDF)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Tutup dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Scrollable */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Quick Adjustment Controls (Interactive Inputs for Teacher/Student) */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Data Identitas Siswa &amp; Penilaian Guru (Dapat Diedit Sebelum Dicetak):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Nama Siswa / Tim:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  NISN / No. Presensi:
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Kelas / Jurusan:
                </label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Tanggal Pengujian:
                </label>
                <input
                  type="text"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Nama Guru Penguji / Pembimbing:
                </label>
                <input
                  type="text"
                  value={examinerName}
                  onChange={(e) => setExaminerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  NIP Guru Penguji:
                </label>
                <input
                  type="text"
                  value={examinerNip}
                  onChange={(e) => setExaminerNip(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Live Scoring Inputs */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-[11px] font-bold text-slate-300 mb-2">
                Input Nilai Komponen Rubrik (Skala 0 - 100):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {rubricList.map((rubric, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                      <span className="font-semibold truncate max-w-[150px]">{rubric.criteria}</span>
                      <span className="text-indigo-400 font-bold">{rubric.weight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={scores[idx] !== undefined ? scores[idx] : defaultBaseScore}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setScores((prev) => ({ ...prev, [idx]: val }));
                        }}
                        className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-bold text-center focus:outline-none focus:border-indigo-500"
                      />
                      <span className="text-[11px] text-slate-400">/ 100 poin</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LIVE PREVIEW OF THE OFFICIAL PRINTABLE REPORT (White Paper Theme for realism) */}
          <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-10 shadow-2xl border border-slate-200 space-y-6 font-sans">
            {/* Kop Surat SMKN 4 Kendari */}
            <div className="border-b-2 border-slate-900 pb-4 text-center relative">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-700">
                Pemerintah Daerah Provinsi Sulawesi Tenggara
              </div>
              <div className="text-base sm:text-lg font-black uppercase tracking-wide text-slate-950">
                Dinas Pendidikan dan Kebudayaan • SMK Negeri 4 Kendari
              </div>
              <div className="text-[10px] text-slate-600">
                Jl. Wulele No. 04 Kendari, Sulawesi Tenggara • Email: info@smkn4kendari.sch.id
              </div>
              <div className="mt-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-900 bg-indigo-50 py-1.5 px-4 rounded border border-indigo-200 inline-block">
                LEMBAR LAPORAN HASIL PENGERJAAN &amp; PENILAIAN PROGRES SISWA
              </div>
            </div>

            {/* Identitas Siswa & Identitas Proyek */}
            <div className="grid grid-cols-2 gap-4 text-xs border border-slate-200 rounded-xl p-3 bg-slate-50">
              <div className="space-y-1">
                <div><span className="font-semibold text-slate-500">Nama Siswa / Tim:</span> <span className="font-bold text-slate-900">{studentName}</span></div>
                <div><span className="font-semibold text-slate-500">NISN / Presensi:</span> <span className="font-medium text-slate-800">{studentId}</span></div>
                <div><span className="font-semibold text-slate-500">Kelas / Kejuruan:</span> <span className="font-medium text-slate-800">{studentClass}</span></div>
                <div><span className="font-semibold text-slate-500">Tanggal Praktikum:</span> <span className="font-medium text-slate-800">{examDate}</span></div>
              </div>
              <div className="space-y-1">
                <div><span className="font-semibold text-slate-500">Profesi Target:</span> <span className="font-bold text-indigo-800 uppercase">{profession || project.profession}</span></div>
                <div><span className="font-semibold text-slate-500">Judul Purwarupa:</span> <span className="font-bold text-slate-900">{project.title}</span></div>
                <div><span className="font-semibold text-slate-500">Tingkat Kesulitan:</span> <span className="font-medium text-slate-800">{project.difficulty} • {project.estimatedTime}</span></div>
                <div>
                  <span className="font-semibold text-slate-500">Status Progres:</span>{' '}
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {completedSteps} dari {totalSteps} Langkah Tuntas ({progressPercent}%)
                  </span>
                </div>
              </div>
            </div>

            {/* TABEL HASIL LANGKAH-LANGKAH PENGERJAAN */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>A. Rincian Pelaksanaan Langkah Kerja Siswa:</span>
                <span className="text-[11px] font-normal text-slate-600">
                  Daftar Periksa &amp; Catatan Teknis Jobsheet
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-300 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold text-[11px]">
                      <th className="py-2 px-2.5 w-10 text-center">No</th>
                      <th className="py-2 px-3">Langkah Kerja &amp; Instruksi Teknis</th>
                      <th className="py-2 px-3 w-28 text-center">Status</th>
                      <th className="py-2 px-3">Catatan Hasil Siswa / Evaluasi K3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800 text-[11px]">
                    {project.steps.map((step) => (
                      <tr key={step.id} className="hover:bg-slate-50">
                        <td className="py-2 px-2.5 text-center font-bold text-slate-600 align-top">
                          {step.stepNumber}
                        </td>
                        <td className="py-2 px-3 align-top space-y-0.5">
                          <div className="font-bold text-slate-950">{step.title}</div>
                          <div className="text-slate-600 leading-relaxed text-[10.5px]">
                            {step.description}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-center align-top">
                          {step.completed ? (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Selesai</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                              <span>Dalam Proses</span>
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 align-top space-y-1">
                          {step.notes ? (
                            <div className="text-[10.5px] text-slate-900 bg-slate-100 p-1.5 rounded border border-slate-200">
                              <span className="font-semibold text-slate-700">Hasil Siswa: </span>
                              <span>{step.notes}</span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-400 italic">
                              Terlaksana sesuai SOP tanpa catatan khusus.
                            </div>
                          )}
                          {step.safetyNote && (
                            <div className="text-[10px] text-amber-900 bg-amber-50 p-1 rounded border border-amber-200 flex items-start gap-1">
                              <span className="font-bold">K3:</span>
                              <span>{step.safetyNote}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL PENILAIAN RUBRIK & NILAI AKHIR */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                B. Penilaian Unjuk Kerja &amp; Capaian Kompetensi:
              </div>

              <div className="overflow-x-auto border border-slate-300 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold text-[11px]">
                      <th className="py-2 px-2.5 w-10 text-center">No</th>
                      <th className="py-2 px-3">Kriteria Penilaian</th>
                      <th className="py-2 px-3 w-20 text-center">Bobot</th>
                      <th className="py-2 px-3 w-24 text-center">Skor (0-100)</th>
                      <th className="py-2 px-3">Indikator Keberhasilan Siswa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800 text-[11px]">
                    {rubricList.map((rubric, idx) => {
                      const itemScore = scores[idx] !== undefined ? scores[idx] : defaultBaseScore;
                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-2.5 text-center font-bold text-slate-600">
                            {idx + 1}
                          </td>
                          <td className="py-2 px-3 font-bold text-slate-950">
                            {rubric.criteria}
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-indigo-800">
                            {rubric.weight}
                          </td>
                          <td className="py-2 px-3 text-center font-extrabold text-slate-900 bg-slate-50">
                            {itemScore}
                          </td>
                          <td className="py-2 px-3 text-slate-600 text-[10.5px]">
                            {rubric.indicator}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* HASIL AKHIR & PREDIKAT */}
            <div className="p-4 rounded-xl border border-slate-300 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900 mb-0.5">
                  Catatan Evaluasi / Saran Instruktur Kejuruan:
                </div>
                <p className="text-[11px] text-slate-700 italic max-w-xl">
                  "{instructorFeedback}"
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Nilai Akhir Praktik</div>
                  <div className="text-2xl font-black text-indigo-900 leading-none">
                    {finalScoreRounded}
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 mt-0.5">{gradeLetter}</div>
                </div>

                <div className="h-10 w-[1px] bg-slate-200" />

                <div className="text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Status</div>
                  <div className="px-2.5 py-1 rounded text-xs font-black tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 mt-0.5">
                    {competencyStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM TANDA TANGAN FORMAL */}
            <div className="pt-6 grid grid-cols-3 gap-4 text-center text-xs text-slate-800">
              <div>
                <div className="text-slate-600">Siswa Praktikan,</div>
                <div className="h-16" />
                <div className="font-bold underline text-slate-900">{studentName}</div>
                <div className="text-[10px] text-slate-500">{studentId}</div>
              </div>

              <div>
                <div className="text-slate-600">Mengetahui,<br />Kepala Program Keahlian,</div>
                <div className="h-12" />
                <div className="font-bold underline text-slate-900">{headmasterName}</div>
                <div className="text-[10px] text-slate-500">SMKN 4 Kendari</div>
              </div>

              <div>
                <div className="text-slate-600">Kendari, {examDate}<br />Guru Penguji / Pembimbing,</div>
                <div className="h-12" />
                <div className="font-bold underline text-slate-900">{examinerName}</div>
                <div className="text-[10px] text-slate-500">{examinerNip}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400">
            © 2026 SMKN 4 Kendari • Lembar Penilaian Vokasi Resmi
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Tutup
            </button>

            <button
              type="button"
              onClick={handlePrintAction}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil Pengerjaan &amp; Nilai Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
