// User object structure
const User = {
  id: '',
  name: '',
  email: '',
  role: 'student', // or 'volunteer'
  progress: {} // Optional, can be an object with course progress
};

// CourseProgress object structure
const CourseProgress = {
  completed: [], // Array of completed course IDs
  quizScores: {}, // Object with quiz scores
  lastAccessed: '' // Date string of last accessed
};

// Course object structure
const Course = {
  id: '',
  title: '',
  description: '',
  thumbnail: '',
  modules: [], // Array of Module objects
  level: 'beginner', // or 'intermediate' or 'advanced'
  language: 'english', // or 'telugu'
  author: '',
  createdAt: '' // Date string of creation
};

// Module object structure
const Module = {
  id: '',
  title: '',
  description: '',
  lessons: [] // Array of Lesson objects
};

// Lesson object structure
const Lesson = {
  id: '',
  title: '',
  content: '',
  videoUrl: '', // Optional
  resources: [], // Array of Resource objects
  quiz: {} // Optional, Quiz object
};

// Resource object structure
const Resource = {
  id: '',
  title: '',
  type: 'pdf', // or 'link' or 'image'
  url: ''
};

// Quiz object structure
const Quiz = {
  id: '',
  title: '',
  questions: [] // Array of Question objects
};

// Question object structure
const Question = {
  id: '',
  text: '',
  options: [], // Array of option strings
  correctAnswer: 0 // Index of the correct answer
};
