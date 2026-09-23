import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  RecommendationResult, 
  SampleProfile, 
  Course,
  StudentProfile 
} from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { StudentProfileWizard } from './components/StudentProfileWizard';
import { RecommendationDashboard } from './components/RecommendationDashboard';
import { CourseCatalog } from './components/CourseCatalog';
import { SampleProfiles } from './components/SampleProfiles';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

import { 
  getCoursesList, 
  getProfilesList, 
  processRecommendation 
} from './lib/recommendationEngine';

// Fallback sample profiles if API loading
const DEFAULT_SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: "profile-1",
    name: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    background: "Computer Science Student",
    skills: ["Python", "HTML", "CSS"],
    goal: "AI Engineer",
    experienceLevel: "Beginner",
    weeklyHours: 10,
    learningStyle: "Hands-on Projects",
    description: "CS student with foundational Python skills aiming to build Generative AI models.",
    badge: "Profile 1 - CS Major",
    sampleRoadmapPreview: ["Statistics & Probability", "NumPy & Pandas", "Machine Learning", "Deep Learning & PyTorch", "Generative AI Agents"]
  },
  {
    id: "profile-2",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    background: "Commerce & Business Graduate",
    skills: ["Excel", "Basic Math"],
    goal: "Data Analyst",
    experienceLevel: "Beginner",
    weeklyHours: 12,
    learningStyle: "Visual & Interactive",
    description: "Business graduate transitioning into data analytics and SQL querying.",
    badge: "Profile 2 - Commerce",
    sampleRoadmapPreview: ["Advanced Excel", "SQL & Relational DBs", "Python Basics", "Pandas Data Analysis", "Power BI Dashboards"]
  },
  {
    id: "profile-3",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    background: "Mechanical Engineering Student",
    skills: ["C Programming", "Matlab"],
    goal: "Software Developer",
    experienceLevel: "Beginner",
    weeklyHours: 15,
    learningStyle: "Structured & Theoretical",
    description: "Mechanical engineer switching into software dev with logic-building C background.",
    badge: "Profile 3 - Engineering Switcher",
    sampleRoadmapPreview: ["Python Basics", "Git & GitHub", "Object-Oriented Programming", "Data Structures & Algorithms", "FastAPI Backend"]
  },
  {
    id: "profile-4",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    background: "Arts & Design Graduate",
    skills: ["Graphic Design", "Figma"],
    goal: "Frontend Developer",
    experienceLevel: "Beginner",
    weeklyHours: 8,
    learningStyle: "Visual & Interactive",
    description: "UI designer building web apps with HTML, CSS, JS, React, and TypeScript.",
    badge: "Profile 4 - Non-Tech Switcher",
    sampleRoadmapPreview: ["HTML5 & CSS3 Web Fundamentals", "JavaScript ES6+", "React 19 & Web Apps", "TypeScript", "Capstone Portfolio"]
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('landing');
  const [sampleProfiles, setSampleProfiles] = useState<SampleProfile[]>(DEFAULT_SAMPLE_PROFILES);
  const [courses, setCourses] = useState<Course[]>(getCoursesList());
  const [recommendationResult, setRecommendationResult] = useState<RecommendationResult | null>(null);

  // Load datasets on mount
  useEffect(() => {
    fetch("/api/profiles")
      .then(res => res.json())
      .then(data => { 
        if (Array.isArray(data) && data.length > 0) setSampleProfiles(data); 
      })
      .catch(() => {
        setSampleProfiles(getProfilesList());
      });

    fetch("/api/courses")
      .then(res => res.json())
      .then(data => { 
        if (Array.isArray(data) && data.length > 0) setCourses(data); 
      })
      .catch(() => {
        setCourses(getCoursesList());
      });

    // Auto-generate default initial recommendation for Alex Rivera
    handleGenerateRecommendation({
      name: "Alex Rivera",
      background: "Computer Science Student",
      skills: ["Python", "HTML", "CSS"],
      goal: "AI Engineer",
      experienceLevel: "Beginner",
      weeklyHours: 10,
      learningStyle: "Hands-on Projects"
    }, false);
  }, []);

  const handleNavigate = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateRecommendation = async (profile: StudentProfile, navigateToDash: boolean = true) => {
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        const result: RecommendationResult = await response.json();
        setRecommendationResult(result);
      } else {
        throw new Error("API not ok, falling back to local calculation");
      }
    } catch (err) {
      // Local client fallback for static deployment on Netlify
      const result = await processRecommendation(profile);
      setRecommendationResult(result);
    } finally {
      if (navigateToDash) {
        handleNavigate('dashboard');
      }
    }
  };


  const handleSelectSample = (sample: SampleProfile) => {
    handleGenerateRecommendation({
      name: sample.name,
      background: sample.background,
      skills: sample.skills,
      goal: sample.goal,
      experienceLevel: sample.experienceLevel,
      weeklyHours: sample.weeklyHours,
      learningStyle: sample.learningStyle
    }, true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main View Container */}
      <main className="flex-1 pb-20 md:pb-0">
        {currentTab === 'landing' && (
          <LandingPage 
            onNavigate={handleNavigate} 
            onSelectSampleProfile={handleSelectSample}
            sampleProfiles={sampleProfiles}
          />
        )}

        {currentTab === 'wizard' && (
          <StudentProfileWizard 
            sampleProfiles={sampleProfiles}
            onGenerateSuccess={(res) => {
              setRecommendationResult(res);
              handleNavigate('dashboard');
            }}
          />
        )}

        {currentTab === 'dashboard' && (
          recommendationResult ? (
            <RecommendationDashboard 
              result={recommendationResult}
              onRecalculate={() => handleNavigate('wizard')}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <h3 className="text-xl font-bold">No Active Roadmap Generated Yet</h3>
              <button 
                onClick={() => handleNavigate('wizard')}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Create Student Profile
              </button>
            </div>
          )
        )}

        {currentTab === 'catalog' && (
          <CourseCatalog courses={courses} />
        )}

        {currentTab === 'profiles' && (
          <SampleProfiles 
            sampleProfiles={sampleProfiles}
            onSelectSample={handleSelectSample}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav currentTab={currentTab} onNavigate={handleNavigate} />

    </div>
  );
}
