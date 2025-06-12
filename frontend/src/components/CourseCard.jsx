import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    viewCourse: 'View Course',
  },
  telugu: {
    beginner: 'ప్రారంభకుడు',
    intermediate: 'మధ్యస్థం',
    advanced: 'అధునాతన',
    viewCourse: 'కోర్సును వీక్షించండి',
  }
};

const CourseCard = ({ course }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const levelColorMap = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${levelColorMap[course.level]}`}>
            {t[course.level]}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{course.modules.length} {language === 'english' ? 'Modules' : 'మాడ్యూల్స్'}</span>
        </div>
        <a 
          href={`/courses/${course.id}`} 
          className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <span>{t.viewCourse}</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default CourseCard;