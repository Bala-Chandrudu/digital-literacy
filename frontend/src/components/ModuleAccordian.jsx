import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Video, FileText, Check, Circle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    lessons: 'Lessons',
    completed: 'Completed',
    continue: 'Continue',
    start: 'Start',
  },
  telugu: {
    lessons: 'పాఠాలు',
    completed: 'పూర్తయింది',
    continue: 'కొనసాగించు',
    start: 'ప్రారంభించు',
  }
};

const ModuleAccordion = ({
  module,
  isOpen: initialIsOpen = false,
  progress,
  courseId,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const { language } = useLanguage();
  const t = translations[language];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const getCompletedLessons = () => {
    if (!progress?.completed) return 0;
    return module.lessons.filter(lesson =>
      progress.completed.includes(lesson.id)
    ).length;
  };

  const isLessonCompleted = (lessonId) => {
    return progress?.completed?.includes(lessonId) || false;
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <div
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{module.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <span>{t.lessons}: {module.lessons.length}</span>
            {progress && (
              <span className="ml-4">
                {t.completed}: {getCompletedLessons()}/{module.lessons.length}
              </span>
            )}
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-800 ml-4">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200">
          <ul className="space-y-2">
            {module.lessons.map((lesson) => (
              <li key={lesson.id} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                <a
                  href={`/courses/${courseId}/lessons/${lesson.id}`}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    {isLessonCompleted(lesson.id) ? (
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300 mr-3" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        {lesson.videoUrl && (
                          <span className="flex items-center mr-3">
                            <Video className="h-3 w-3 mr-1" />
                            {language === 'english' ? 'Video' : 'వీడియో'}
                          </span>
                        )}
                        {lesson.quiz && (
                          <span className="flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {language === 'english' ? 'Quiz' : 'క్విజ్'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    isLessonCompleted(lesson.id)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isLessonCompleted(lesson.id) ? t.completed :
                      (progress?.completed?.length ? t.continue : t.start)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModuleAccordion;