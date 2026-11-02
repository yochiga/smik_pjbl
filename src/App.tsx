import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { Step1Profession } from './components/Step1Profession';
import { Step2Resources } from './components/Step2Resources';
import { Step3ProjectJobsheet } from './components/Step3ProjectJobsheet';
import { SavedProjectsTab } from './components/SavedProjectsTab';
import { CurriculumBankTab } from './components/CurriculumBankTab';
import { AiConsultantModal } from './components/AiConsultantModal';
import { Footer } from './components/Footer';
import {
  StepNumber,
  NavigationTab,
  ResourceRecommendation,
  ToolItem,
  MaterialItem,
  ProjectSimulation,
  PrototypeApproach,
} from './types';
import {
  INITIAL_SAVED_PROJECTS,
  SABLON_BAJU_PROJECT,
  getDefaultProjectForProfession,
} from './data/vocationalCurriculum';
import { SimulationFocus } from './components/AiProjectStudioModal';

const STORAGE_KEY = 'simulasivokasi_saved_projects_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('recommendation');
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<StepNumber>(1);

  // Form & Wizard state
  const [profession, setProfession] = useState<string>('sablon baju');
  const [recommendation, setRecommendation] = useState<ResourceRecommendation | null>(null);
  const [isAnalyzingResources, setIsAnalyzingResources] = useState<boolean>(false);

  // Project state
  const [currentProject, setCurrentProject] = useState<ProjectSimulation | null>(() =>
    getDefaultProjectForProfession('sablon baju')
  );
  const [isGeneratingProject, setIsGeneratingProject] = useState<boolean>(false);
  const [openStudioModalOnStep3, setOpenStudioModalOnStep3] = useState<boolean>(true);

  // Saved projects state (pre-populate with 3 projects to match screenshot)
  const [savedProjects, setSavedProjects] = useState<ProjectSimulation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored projects:', e);
    }
    return INITIAL_SAVED_PROJECTS;
  });

  // Save to localStorage whenever savedProjects changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProjects));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [savedProjects]);

  // AI Consultant Modal
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState(false);

  // Gemini API Key detection on deployed host (Vercel)
  const [geminiStatus, setGeminiStatus] = useState<{ configured: boolean; checked: boolean }>({
    configured: true,
    checked: false,
  });
  const [showConfigNotice, setShowConfigNotice] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setGeminiStatus({
          configured: Boolean(data.geminiConfigured),
          checked: true,
        });
      })
      .catch(() => {
        setGeminiStatus({ configured: false, checked: true });
      });
  }, []);

  // Reset to Step 1
  const handleReset = () => {
    setCurrentTab('recommendation');
    setCurrentStep(1);
    setMaxAccessibleStep(1);
    setProfession('');
    setRecommendation(null);
    setCurrentProject(null);
  };

  // Step 1: Submit Profession -> Call AI API to recommend tools and materials
  const handleProfessionSubmit = async (
    selectedProfession: string,
    approach?: PrototypeApproach
  ) => {
    setProfession(selectedProfession);
    setIsAnalyzingResources(true);

    try {
      const response = await fetch('/api/recommend-resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profession: selectedProfession,
          approach: approach || 'Standar Vokasi SMK',
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menganalisis profesi');
      }

      const data: ResourceRecommendation = await response.json();
      setRecommendation(data);
      setCurrentStep(2);
      setMaxAccessibleStep((prev) => (prev < 2 ? 2 : prev));
      setCurrentTab('recommendation');
    } catch (error) {
      console.error('Error recommending resources:', error);
      // Fallback state
      setRecommendation({
        profession: selectedProfession,
        approach: approach || 'Standar Vokasi SMK',
        summary: `Simulasi terapan untuk profesi ${selectedProfession} di lingkungan SMKN 4 Kendari.`,
        prototypeIdea: `Purwarupa Simulasi Kejuruan: ${selectedProfession}`,
        recommendedTools: [
          { id: 't1', name: 'Perkakas Tangan Utama', category: 'Perkakas', importance: 'Wajib', description: 'Alat perakitan dasar', available: true },
          { id: 't2', name: 'Alat Ukur / Multi-tester', category: 'Alat Ukur', importance: 'Wajib', description: 'Pengukuran nilai parameter', available: true },
        ],
        recommendedMaterials: [
          { id: 'm1', name: 'Bahan Baku Simulasi', category: 'Bahan Utama', importance: 'Wajib', description: 'Material fisik purwarupa', available: true, estimatedQty: '1 paket' },
        ],
        safetyItems: [{ name: 'APD Standar K3', reason: 'Perlindungan diri saat bekerja' }],
      });
      setCurrentStep(2);
      setMaxAccessibleStep((prev) => (prev < 2 ? 2 : prev));
    } finally {
      setIsAnalyzingResources(false);
    }
  };

  // Step 2: Proceed to Step 3 and trigger AI Project Studio popup modal
  const handleGenerateProject = async (
    selectedTools: ToolItem[],
    selectedMaterials: MaterialItem[],
    prototypeIdea: string,
    notes: string
  ) => {
    // Advance to Step 3 and open the Studio Perancang Proyek Vokasi AI popup modal
    setCurrentStep(3);
    setMaxAccessibleStep(3);
    setOpenStudioModalOnStep3(true);
    setCurrentTab('recommendation');

    // Ensure initial fallback project exists so the background of Step 3 renders immediately
    if (!currentProject) {
      setCurrentProject(getDefaultProjectForProfession(profession || 'sablon baju'));
    }

    setIsGeneratingProject(true);

    try {
      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profession: profession || recommendation?.profession || 'sablon baju',
          availableTools: selectedTools,
          availableMaterials: selectedMaterials,
          prototypeIdea,
          customNotes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal merancang proyek');
      }

      const projectData: ProjectSimulation = await response.json();
      setCurrentProject(projectData);
    } catch (error) {
      console.error('Error generating project:', error);
      if (!currentProject) {
        setCurrentProject(getDefaultProjectForProfession(profession || 'sablon baju'));
      }
    } finally {
      setIsGeneratingProject(false);
    }
  };

  // Execute custom project generation from the Studio Perancang Proyek Vokasi AI Modal
  const handleExecuteCustomProject = async (config: {
    profession: string;
    toolsStr: string;
    materialsStr: string;
    focus: SimulationFocus;
    difficulty: string;
    notes: string;
  }) => {
    setIsGeneratingProject(true);
    try {
      const toolsArr = config.toolsStr.split(',').map((s) => s.trim()).filter(Boolean);
      const matsArr = config.materialsStr.split(',').map((s) => s.trim()).filter(Boolean);

      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profession: config.profession,
          availableTools: toolsArr,
          availableMaterials: matsArr,
          prototypeIdea: `Pendekatan: ${config.focus}`,
          scope: config.focus,
          difficulty: config.difficulty,
          customNotes: config.notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal merancang proyek');
      }

      const projectData: ProjectSimulation = await response.json();
      setCurrentProject(projectData);
      setProfession(config.profession);
      setOpenStudioModalOnStep3(false);
    } catch (error) {
      console.error('Error generating custom project:', error);
      const fallback = getDefaultProjectForProfession(config.profession);
      setCurrentProject({
        ...fallback,
        profession: config.profession,
        difficulty: config.difficulty,
      });
      setOpenStudioModalOnStep3(false);
    } finally {
      setIsGeneratingProject(false);
    }
  };

  // Save Project to List
  const handleSaveProject = (projectToSave: ProjectSimulation) => {
    setSavedProjects((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === projectToSave.id);
      if (existsIndex >= 0) {
        const copy = [...prev];
        copy[existsIndex] = { ...projectToSave, lastEditedAt: new Date().toISOString() };
        return copy;
      }
      return [
        {
          ...projectToSave,
          savedAt: new Date().toLocaleString('id-ID', {
            dateStyle: 'short',
            timeStyle: 'short',
          }),
        },
        ...prev,
      ];
    });
  };

  // Delete project from saved list
  const handleDeleteProject = (projectId: string) => {
    setSavedProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  // Open saved project in Step 3
  const handleOpenProject = (project: ProjectSimulation) => {
    setCurrentProject(project);
    setProfession(project.profession);
    setCurrentStep(3);
    setMaxAccessibleStep(3);
    setCurrentTab('recommendation');
  };

  // From Curriculum Bank: select profession and start
  const handleSelectFromCurriculum = (professionName: string) => {
    setProfession(professionName);
    setCurrentTab('recommendation');
    setCurrentStep(1);
    handleProfessionSubmit(professionName);
  };

  const isCurrentProjectSaved = Boolean(
    currentProject && savedProjects.some((p) => p.id === currentProject.id)
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Header matching mockup */}
      <div className="print:hidden">
        <Header
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          savedCount={savedProjects.length}
          onReset={handleReset}
          isAiProcessing={isAnalyzingResources || isGeneratingProject}
        />
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {currentTab === 'recommendation' && (
          <>
            {/* Stepper Progress Bar */}
            {/* Status notice if GEMINI_API_KEY is not set on Vercel deployment */}
            {geminiStatus.checked && !geminiStatus.configured && showConfigNotice && (
              <div className="mb-4 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200 flex items-start sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
                  <div>
                    <span className="font-bold text-amber-300">Tips Integrasi Vercel:</span> AI saat ini menggunakan bank kurikulum internal. Untuk mengaktifkan generative AI Gemini live di Vercel, buka <strong>Vercel Dashboard &gt; Project &gt; Settings &gt; Environment Variables</strong>, tambahkan <code>GEMINI_API_KEY</code>, lalu klik <strong>Redeploy</strong>.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfigNotice(false)}
                  className="text-amber-400 hover:text-white px-2 py-1 text-xs font-bold rounded bg-amber-500/20 hover:bg-amber-500/30 cursor-pointer shrink-0"
                >
                  Tutup
                </button>
              </div>
            )}

            {/* Stepper Progress */}
            <div className="print:hidden">
              <Stepper
                currentStep={currentStep}
                maxAccessibleStep={maxAccessibleStep}
                onSelectStep={(step) => {
                  if (step <= maxAccessibleStep) {
                    setCurrentStep(step);
                  }
                }}
              />
            </div>

            {/* Step 1: Profession Exploration */}
            {currentStep === 1 && (
              <Step1Profession
                profession={profession}
                setProfession={setProfession}
                onSubmit={handleProfessionSubmit}
                isLoading={isAnalyzingResources}
              />
            )}

            {/* Step 2: Tools & Materials AI Recommendation & Verification */}
            {currentStep === 2 && (
              <Step2Resources
                profession={profession}
                recommendation={recommendation}
                onBackToStep1={() => setCurrentStep(1)}
                onGenerateProject={handleGenerateProject}
                isGeneratingProject={isGeneratingProject}
                isAnalyzingResources={isAnalyzingResources}
                onRegenerateRecommendation={(approach) => {
                  handleProfessionSubmit(profession || 'sablon baju', approach);
                }}
              />
            )}

            {/* Step 3: Project Simulation & Jobsheet with Step Description Editing & Saving */}
            {currentStep === 3 && (
              <Step3ProjectJobsheet
                project={currentProject || getDefaultProjectForProfession(profession || 'sablon baju')}
                profession={profession || recommendation?.profession || 'sablon baju'}
                tools={recommendation?.recommendedTools || []}
                materials={recommendation?.recommendedMaterials || []}
                onUpdateProject={setCurrentProject}
                onSaveProject={handleSaveProject}
                isSaved={isCurrentProjectSaved}
                onGoToStep1={() => setCurrentStep(1)}
                onGoToStep2={() => setCurrentStep(2)}
                onExecuteCustomProject={handleExecuteCustomProject}
                isGeneratingProject={isGeneratingProject}
                onOpenAiConsultant={() => setIsAiConsultantOpen(true)}
                initialOpenStudioModal={openStudioModalOnStep3}
              />
            )}
          </>
        )}

        {/* Tab 2: Saved Projects / Jobsheets */}
        {currentTab === 'saved' && (
          <SavedProjectsTab
            savedProjects={savedProjects}
            onOpenProject={handleOpenProject}
            onDeleteProject={handleDeleteProject}
            onStartNewProject={handleReset}
          />
        )}

        {/* Tab 3: Curriculum Bank */}
        {currentTab === 'curriculum' && (
          <CurriculumBankTab onSelectProfession={handleSelectFromCurriculum} />
        )}
      </main>

      {/* AI Mentor / Consultant Modal */}
      <AiConsultantModal
        isOpen={isAiConsultantOpen}
        onClose={() => setIsAiConsultantOpen(false)}
        projectContext={currentProject}
      />

      {/* Footer - Strictly displaying "SMKN 4 Kendari copyright" per prompt instruction */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
