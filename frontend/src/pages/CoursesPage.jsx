import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { mockCourses } from '../data/mockCourses';
import CourseCard from '../components/CourseCard';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    allCourses: 'All Courses',
    search: 'Search courses...',
    filter: 'Filter',
    level: 'Level',
    allLevels: 'All Levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    clearFilters: 'Clear Filters',
    noResults: 'No courses found matching your criteria.',
  },
  telugu: {
    allCourses: 'అన్ని కోర్సులు',
    search: 'కోర్సులను శోధించండి...',
    filter: 'ఫిల్టర్',
    level: 'స్థాయి',
    allLevels: 'అన్ని స్థాయిలు',
    beginner: 'ప్రారంభకుడు',
    intermediate: 'మధ్యస్థం',
    advanced: 'అధునాతన',
    clearFilters: 'ఫిల్టర్లను క్లియర్ చేయండి',
    noResults: 'మీ ప్రమాణాలకు సరిపోలే కోర్సులు ఏవీ కనుగొనబడలేదు.',
  }
};

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(null);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel === null || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.allCourses}</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder={t.search}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleFilter}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              {t.filter}
            </button>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex md:flex-wrap items-center gap-4">
            <div>
              <span className="text-gray-700 mr-2">{t.level}:</span>
              <select
                value={selectedLevel || ''}
                onChange={(e) => handleLevelChange(e.target.value || null)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t.allLevels}</option>
                <option value="beginner">{t.beginner}</option>
                <option value="intermediate">{t.intermediate}</option>
                <option value="advanced">{t.advanced}</option>
              </select>
            </div>
            
            {(searchQuery || selectedLevel) && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4 mr-1" />
                {t.clearFilters}
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Filters */}
        {isFilterOpen && (
          <div className="md:hidden mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">{t.level}</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${selectedLevel === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleLevelChange(null)}
                >
                  {t.allLevels}
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${selectedLevel === 'beginner' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleLevelChange('beginner')}
                >
                  {t.beginner}
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${selectedLevel === 'intermediate' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleLevelChange('intermediate')}
                >
                  {t.intermediate}
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${selectedLevel === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleLevelChange('advanced')}
                >
                  {t.advanced}
                </button>
              </div>
            </div>
            
            {(searchQuery || selectedLevel) && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4 mr-1" />
                {t.clearFilters}
              </button>
            )}
          </div>
        )}
        
        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;