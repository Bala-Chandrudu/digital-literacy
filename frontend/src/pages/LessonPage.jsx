import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Video, File } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';
import QuizComponent from '../components/QuizComponent';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    backToCourse: 'Back to Course',
    resources: 'Resources',
    nextLesson: 'Next Lesson',
    previousLesson: 'Previous Lesson',
    completedQuiz: 'You completed this quiz with a score of',
    notFound: 'Lesson not found',
  },
  telugu: {
    backToCourse: 'కోర్సుకు తిరిగి వెళ్ళండి',
    resources: 'వనరులు',
    nextLesson: 'తదుపరి పాఠం',
    previousLesson: 'మునుపటి పాఠం',
    completedQuiz: 'మీరు ఈ క్విజ్‌ను స్కోరుతో పూర్తి చేసారు',
    notFound: 'పాఠం కనుగొనబడలేదు',
  }
};

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  
  useEffect(() => {
    if (courseId) {
      const foundCourse = mockCourses.find(c => c.id === courseId);
      setCourse(foundCourse || null);
    }
  }, [courseId]);
  
  useEffect(() => {
    if (course && lessonId) {
      let foundLesson = null;
      let foundModule = null;
      
      for (const module of course.modules) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          foundLesson = lesson;
          foundModule = module;
          break;
        }
      }
      
      setCurrentLesson(foundLesson);
      setCurrentModule(foundModule);
    }
  }, [course, lessonId]);
  
  useEffect(() => {
    if (currentUser?.progress && course && currentLesson) {
      const courseProgress = currentUser.progress[course.id];
      if (courseProgress?.quizScores && courseProgress.quizScores[currentLesson.id]) {
        setQuizCompleted(true);
        setQuizScore(courseProgress.quizScores[currentLesson.id]);
      } else {
        setQuizCompleted(false);
        setQuizScore(0);
      }
    }
  }, [currentUser, course, currentLesson]);
  
  const handleQuizComplete = (score) => {
    setQuizCompleted(true);
    setQuizScore(score);
    // In a real app, this would update to a database
    console.log(`Quiz completed with score: ${score}`);
  };
  
  const findAdjacentLessons = () => {
    if (!course || !currentLesson) return { prev: null, next: null };
    
    let allLessons = [];
    
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        allLessons.push({ id: lesson.id, moduleId: module.id });
      });
    });
    
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    
    return {
      prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
      next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
    };
  };
  
  const { prev, next } = findAdjacentLessons();
  
  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.notFound}</h1>
          <a 
            href="/courses" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.backToCourse}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a 
            href={`/courses/${courseId}`} 
            className="inline-flex items-center text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.backToCourse}
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h1>
            {currentModule && (
              <p className="text-gray-600 mb-6">{currentModule.title}</p>
            )}
            
            {currentLesson.videoUrl && (
              <div className="aspect-w-16 aspect-h-9 mb-8">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-96 mb-6"
                ></iframe>
              </div>
            )}
            
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
            </div>
            
            {currentLesson.resources && currentLesson.resources.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">{t.resources}</h3>
                <ul className="space-y-2">
                  {currentLesson.resources.map(resource => (
                    <li key={resource.id}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        {resource.type === 'pdf' ? (
                          <File className="h-4 w-4 mr-2" />
                        ) : (
                          <Video className="h-4 w-4 mr-2" />
                        )}
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {currentLesson.quiz && (
          <div className="mb-8">
            {quizCompleted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-800 font-medium">
                  {t.completedQuiz} {quizScore}%
                </p>
              </div>
            ) : (
              <QuizComponent 
                quiz={currentLesson.quiz} 
                onComplete={handleQuizComplete} 
              />
            )}
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          {prev ? (
            <a 
              href={`/courses/${courseId}/lessons/${prev.id}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.previousLesson}
            </a>
          ) : (
            <div></div>
          )}
          
          {next && (
            <a 
              href={`/courses/${courseId}/lessons/${next.id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {t.nextLesson}
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;