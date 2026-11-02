import React from 'react';
import { StepNumber } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface StepperProps {
  currentStep: StepNumber;
  maxAccessibleStep: StepNumber;
  onSelectStep: (step: StepNumber) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  maxAccessibleStep,
  onSelectStep,
}) => {
  const steps: { number: StepNumber; label: string; sublabel: string }[] = [
    { number: 1, label: 'LANGKAH 1', sublabel: 'Profesi Siswa' },
    { number: 2, label: 'LANGKAH 2', sublabel: 'Rekomendasi Alat & Bahan AI' },
    { number: 3, label: 'LANGKAH 3', sublabel: 'Purwarupa & Jobsheet' },
  ];

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isAccessible = step.number <= maxAccessibleStep;

          return (
            <React.Fragment key={step.number}>
              <button
                type="button"
                disabled={!isAccessible}
                onClick={() => onSelectStep(step.number)}
                className={`flex-1 w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-xl shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                    : isCompleted
                    ? 'bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer'
                    : isAccessible
                    ? 'bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 cursor-pointer text-slate-400'
                    : 'bg-slate-950/40 border border-slate-900 opacity-40 cursor-not-allowed text-slate-500'
                }`}
              >
                {/* Step indicator */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all ${
                    isActive
                      ? 'bg-slate-950/70 text-white border border-white/20'
                      : isCompleted
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step text */}
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${
                      isActive
                        ? 'text-indigo-200'
                        : isCompleted
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-bold truncate ${
                      isActive
                        ? 'text-white'
                        : isCompleted
                        ? 'text-emerald-400 font-semibold'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.sublabel}
                  </div>
                </div>
              </button>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div
                  className={`hidden md:block w-8 sm:w-12 h-[2px] rounded-full transition-colors ${
                    currentStep > idx + 1 ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
