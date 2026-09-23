import React, { useState } from 'react';
import { Course } from '../types';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Award, 
  Layers, 
  Brain,
  ChevronRight
} from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ courses }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsLearned.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || c.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Course Catalogue
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore AI Curriculum & Prerequisite Graph
          </h1>
          <p className="text-slate-600 text-sm">
            Browse our structured catalog of beginner to advanced courses with explicit prerequisite mapping.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title, skill, or topic (e.g. Python, SQL, Neural Networks)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
              />
            </div>

            {/* Category Select */}
            <div className="w-full md:w-56">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>Category: {cat}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Select */}
            <div className="w-full md:w-44">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 cursor-pointer"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>Difficulty: {diff}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>Showing <strong>{filteredCourses.length}</strong> of {courses.length} courses</span>
            {(searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All") && (
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedDifficulty("All"); }}
                className="text-indigo-600 hover:underline font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              onClick={() => setActiveCourseModal(course)}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200">
                    {course.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    course.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' : course.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' : 'bg-purple-50 text-purple-700'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Prerequisites Badge */}
                <div className="pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Prerequisites</span>
                  {course.prerequisites.length === 0 ? (
                    <span className="text-[11px] text-emerald-600 font-semibold">None (Beginner Friendly)</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {course.prerequisites.map(p => (
                        <span key={p} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-600" />
                  {course.duration}
                </span>

                <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Detailed Course Modal */}
        {activeCourseModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveCourseModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200">
                    {activeCourseModal.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 font-bold text-xs border border-cyan-200">
                    {activeCourseModal.duration}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">{activeCourseModal.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{activeCourseModal.description}</p>
              </div>

              {/* Prerequisites Breakdown */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Prerequisite Dependencies</h4>
                {activeCourseModal.prerequisites.length === 0 ? (
                  <p className="text-xs text-emerald-600 font-semibold">No prerequisites required! Suitable for absolute beginners.</p>
                ) : (
                  <ul className="space-y-1">
                    {activeCourseModal.prerequisites.map(pr => (
                      <li key={pr} className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Key Topics */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Curriculum Topics Covered</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeCourseModal.keyTopics.map(topic => (
                    <div key={topic} className="p-2.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                      • {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Learned */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Skills & Competencies Acquired</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeCourseModal.skillsLearned.map(sk => (
                    <span key={sk} className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-semibold text-xs shadow-xs">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
