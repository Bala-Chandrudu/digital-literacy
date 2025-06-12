import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Calendar, Clock, Award } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';
import ModuleAccordion from '../components/ModuleAccordion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    backToCourses: 'Back to Courses',
    overview: 'Overview',
    modules: 'Modules',
    courseDetails: 'Course Details',
    level: 'Level',
    created: 'Created',
    author: 'Author',
    notFound: 'Course not found',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    lessonCount: 'Lessons',
    startCourse: 'Start Course',
    continueCourse: 'Continue Learning',
    loginToTrack: 'Login to track progress'
  },
  telugu: {
    backToCourses: 'కోర్సులకు తిరిగి వెళ్ళండి',
    overview: 'అవలోకనం',
    modules: 'మాడ్యూల్స్',
    courseDetails: 'కోర్సు వివరాలు',
    level: 'స్థాయి',
    created: 'సృష్టించబడింది',
    author: 'రచయిత',
    notFound: 'కోర్సు కనుగొనబడలేదు',
    beginner: 'ప్రారంభకుడు',
    intermediate: 'మధ్యస్థం',
    advanced: 'అధునాతన',
    lessonCount: 'పాఠాలు',
    startCourse: 'కోర్సు ప్రారంభించండి',
    continueCourse: 'నేర్చుకోవడం కొనసాగించండి',
    loginToTrack: 'ప్రోగ్రెస్‌ను ట్రాక్ చేయడానికి లాగిన్ చేయండి'
  }
};

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [progress, setProgress] = useState(undefined);
  
  useEffect(() => {
    if (courseId) {
      const foundCourse = mockCourses.find(c => c.id === courseId);
      setCourse(foundCourse || null);
    }
  }, [courseId]);
  
  useEffect(() => {
    if (currentUser?.progress && course) {
      setProgress(currentUser.progress[course.id]);
    }
  }, [currentUser, course]);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.notFound}</h1>
          <a 
            href="/courses" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.backToCourses}
          </a>
        </div>
      </div>
    );
  }
  
  const totalLessons = course.modules.reduce(
    (count, module) => count + module.lessons.length, 
    0
  );
  
  const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id;
  const continueUrl = progress?.completed?.length && firstLessonId
    ? `/courses/${course.id}/lessons/${progress.completed[progress.completed.length - 1]}`
    : firstLessonId
      ? `/courses/${course.id}/lessons/${firstLessonId}`
      : '/courses';

  const startUrl = firstLessonId
    ? `/courses/${course.id}/lessons/${firstLessonId}`
    : '/courses';
  
  const levelMap = {
    beginner: t.beginner,
    intermediate: t.intermediate,
    advanced: t.advanced
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a 
            href="/courses" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.backToCourses}
          </a>
        </div>
        
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 h-60 md:h-auto md:w-1/3">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">{levelMap[course.level]}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">{totalLessons} {t.lessonCount}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">{new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">{course.author}</span>
                </div>
              </div>
              
              {currentUser ? (
                <a 
                  href={progress?.completed?.length ? continueUrl : startUrl} 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {progress?.completed?.length ? t.continueCourse : t.startCourse}
                </a>
              ) : (
                <a 
                  href="/login" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t.loginToTrack}
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">{t.modules}</h2>
            
            {course.modules.map((module, index) => (
              <ModuleAccordion 
                key={module.id} 
                module={module} 
                isOpen={index === 0} 
                progress={progress}
                courseId={course.id}
              />
            ))}
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">{t.courseDetails}</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">{t.level}</p>
                  <p className="font-medium">{levelMap[course.level]}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">{t.created}</p>
                  <p className="font-medium">{new Date(course.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">{t.author}</p>
                  <p className="font-medium">{course.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;