export type NavigationTab = 'landing' | 'wizard' | 'dashboard' | 'catalog' | 'profiles' | 'about';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type LearningStyle = 
  | 'Visual & Interactive' 
  | 'Hands-on Projects' 
  | 'Structured & Theoretical' 
  | 'Fast-paced Sprint';

export interface StudentProfile {
  name?: string;
  background: string;
  skills: string[];
  goal: string;
  experienceLevel: ExperienceLevel;
  weeklyHours: number;
  learningStyle: LearningStyle;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  prerequisites: string[];
  description: string;
  skillsLearned: string[];
  keyTopics: string[];
  iconName?: string;
  popularForGoals?: string[];
}

export interface RoadmapStep {
  stepNumber: number;
  courseTitle: string;
  courseId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  prerequisites: string[];
  reason: string;
  benefits: string[];
  estimatedHours: number;
  skillsLearned: string[];
  keyTopics: string[];
  isPrerequisiteResolved: boolean;
}

export interface SkillGapItem {
  skill: string;
  category: string;
  status: 'acquired' | 'missing' | 'in-progress';
  importance: 'Critical' | 'Recommended' | 'Optional';
}

export interface RecommendationResult {
  studentProfile: StudentProfile;
  goal: string;
  targetRoleOverview: string;
  currentLevel: ExperienceLevel;
  estimatedTotalMonths: string;
  totalCoursesCount: number;
  totalProjectsCount: number;
  readinessScore: number; // 0 to 100
  skillGapAnalysis: {
    acquiredSkills: string[];
    missingSkills: string[];
    skillDetails: SkillGapItem[];
  };
  learningPath: RoadmapStep[];
  aiSummary: string;
  careerOutcome: string;
  generatedAt: string;
}

export interface SampleProfile {
  id: string;
  name: string;
  avatar: string;
  background: string;
  skills: string[];
  goal: string;
  experienceLevel: ExperienceLevel;
  weeklyHours: number;
  learningStyle: LearningStyle;
  description: string;
  badge: string;
  sampleRoadmapPreview: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
