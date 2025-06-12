import React, { useState } from 'react';
import { ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    quizTitle: 'Knowledge Check',
    questionOf: 'Question {{current}} of {{total}}',
    submit: 'Submit Answer',
    next: 'Next Question',
    finish: 'Finish Quiz',
    correct: 'Correct!',
    incorrect: 'Incorrect!',
    yourScore: 'Your Score',
    retry: 'Retry Quiz',
    continue: 'Continue to Next Lesson',
  },
  telugu: {
    quizTitle: 'జ్ఞాన తనిఖీ',
    questionOf: 'ప్రశ్న {{current}} మొత్తం {{total}} లో',
    submit: 'సమాధానాన్ని సమర్పించండి',
    next: 'తదుపరి ప్రశ్న',
    finish: 'క్విజ్ ముగించండి',
    correct: 'సరైనది!',
    incorrect: 'తప్పు!',
    yourScore: 'మీ స్కోరు',
    retry: 'క్విజ్‌ను మళ్లీ ప్రయత్నించండి',
    continue: 'తదుపరి పాఠానికి కొనసాగించండి',
  }
};

const QuizComponent = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const { language } = useLanguage();
  const t = translations[language];

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswerSubmitted(true);
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);

    if (isLastQuestion) {
      setQuizCompleted(true);
      onComplete(Math.round((correctAnswers / totalQuestions) * 100));
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  const questionOfText = t.questionOf
    .replace('{{current}}', (currentQuestionIndex + 1).toString())
    .replace('{{total}}', totalQuestions.toString());

  if (quizCompleted) {
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-8">{quiz.title}</h2>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 mb-4">
            <span className="text-3xl font-bold text-blue-600">{finalScore}%</span>
          </div>
          
          <h3 className="text-xl font-semibold mb-6">{t.yourScore}</h3>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={retryQuiz}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              {t.retry}
            </button>
            <button 
              onClick={() => onComplete(finalScore)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <span>{t.continue}</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
      <p className="text-sm text-gray-600 mb-6">{questionOfText}</p>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswerSubmitted && setSelectedAnswer(index)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-3 rounded-md border ${
                selectedAnswer === index 
                  ? isAnswerSubmitted 
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : isAnswerSubmitted && index === currentQuestion.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <span className="flex-1">{option}</span>
                {isAnswerSubmitted && (
                  <>
                    {index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {isAnswerSubmitted && (
        <div className={`p-3 rounded-md mb-6 ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center">
            {isCorrect 
              ? <CheckCircle className="h-5 w-5 mr-2" /> 
              : <XCircle className="h-5 w-5 mr-2" />
            }
            <span>
              {isCorrect ? t.correct : t.incorrect}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <button 
          onClick={isAnswerSubmitted ? nextQuestion : submitAnswer}
          disabled={selectedAnswer === null && !isAnswerSubmitted}
          className={`px-4 py-2 rounded-md ${
            selectedAnswer === null && !isAnswerSubmitted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } flex items-center`}
        >
          <span>
            {isAnswerSubmitted 
              ? isLastQuestion ? t.finish : t.next
              : t.submit
            }
          </span>
          {isAnswerSubmitted && <ChevronRight className="h-4 w-4 ml-1" />}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;