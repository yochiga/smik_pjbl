export type StepNumber = 1 | 2 | 3;

export type NavigationTab = 'recommendation' | 'saved' | 'curriculum';

export type PrototypeApproach = 'Standar Vokasi SMK' | 'Bahan Daur Ulang' | 'Sampel Usaha Komersial';

export interface ToolItem {
  id: string;
  name: string;
  category?: string;
  importance: 'Wajib' | 'Pendukung' | 'Opsional';
  description: string;
  available: boolean;
  substituteTip?: string;
  isCustom?: boolean;
}

export interface MaterialItem {
  id: string;
  name: string;
  category?: string;
  importance?: 'Wajib' | 'Pendukung' | 'Opsional';
  description: string;
  estimatedQty?: string;
  available: boolean;
  substituteTip?: string;
  recycleAlternative?: string;
  isCustom?: boolean;
}

export interface SafetyItem {
  name: string;
  reason: string;
}

export interface ResourceRecommendation {
  profession: string;
  summary?: string;
  prototypeIdea: string;
  approach?: PrototypeApproach;
  difficulty?: string;
  estimatedTime?: string;
  whyRepresentative?: string;
  physicalOutput?: string;
  competencies?: string;
  recommendedTools: ToolItem[];
  recommendedMaterials: MaterialItem[];
  safetyItems?: SafetyItem[];
  k3Protocols?: string[];
  tipsSekolah?: string;
  _notice?: string;
}

export interface ProjectStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  safetyNote?: string;
  expectedResult?: string;
  completed: boolean;
  notes?: string;
}

export interface AssessmentCriterion {
  criteria: string;
  weight: string;
  indicator: string;
}

export interface ProjectSimulation {
  id: string;
  title: string;
  profession: string;
  tagline: string;
  overview: string;
  learningObjectives: string[];
  difficulty: 'Pemula' | 'Mudah' | 'Sedang' | 'Menengah' | 'Menantang' | 'Mahir' | string;
  estimatedTime: string;
  prototypeOutput: string;
  entrepreneurshipOpportunity: string;
  toolsUsed: string[];
  materialsUsed: string[];
  steps: ProjectStep[];
  assessmentRubric: AssessmentCriterion[];
  reflectionQuestions?: string[];
  savedAt?: string;
  lastEditedAt?: string;
  studentName?: string;
  schoolClass?: string;
}

export interface VocationalProgram {
  id: string;
  code: string;
  title: string;
  cluster: string;
  description: string;
  prototypeExamples: string[];
  essentialTools: string[];
  icon: string;
  color: string;
}
