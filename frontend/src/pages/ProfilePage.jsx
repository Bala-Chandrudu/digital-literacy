import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Book, Clock, Download, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    profile: 'Profile Settings',
    personalInfo: 'Personal Information',
    name: 'Full Name',
    email: 'Email Address',
    role: 'Role',
    student: 'Student',
    volunteer: 'Volunteer',
    preferences: 'Preferences',
    notifications: 'Notifications',
    privacy: 'Privacy',
    learning: 'Learning',
    history: 'History',
    save: 'Save Changes',
    cancel: 'Cancel',
    edit: 'Edit',
    downloadData: 'Download My Data',
    emailNotifications: 'Email Notifications',
    courseUpdates: 'Course Updates',
    newLessons: 'New Lessons',
    reminders: 'Learning Reminders',
    profileVisibility: 'Profile Visibility',
    showProgress: 'Show Learning Progress',
    showCertificates: 'Show Certificates',
    learningGoals: 'Learning Goals',
    dailyGoal: 'Daily Learning Goal',
    preferredTopics: 'Preferred Topics',
    language: 'Language Preference',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    deleteAccount: 'Delete Account',
    deleteWarning: 'This action cannot be undone'
  },
  telugu: {
    profile: 'ప్రొఫైల్ సెట్టింగ్‌లు',
    personalInfo: 'వ్యక్తిగత సమాచారం',
    name: 'పూర్తి పేరు',
    email: 'ఇమెయిల్ చిరునామా',
    role: 'పాత్ర',
    student: 'విద్యార్థి',
    volunteer: 'వాలంటీర్',
    preferences: 'ప్రాధాన్యతలు',
    notifications: 'నోటిఫికేషన్లు',
    privacy: 'గోప్యత',
    learning: 'అభ్యాసం',
    history: 'చరిత్ర',
    save: 'మార్పులను సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',
    edit: 'సవరించండి',
    downloadData: 'నా డేటాను డౌన్‌లోడ్ చేయండి',
    emailNotifications: 'ఇమెయిల్ నోటిఫికేషన్లు',
    courseUpdates: 'కోర్సు అప్‌డేట్‌లు',
    newLessons: 'కొత్త పాఠాలు',
    reminders: 'లెర్నింగ్ రిమైండర్లు',
    profileVisibility: 'ప్రొఫైల్ దృశ్యమానత',
    showProgress: 'లెర్నింగ్ ప్రోగ్రెస్‌ను చూపించు',
    showCertificates: 'సర్టిఫికెట్లను చూపించు',
    learningGoals: 'లెర్నింగ్ లక్ష్యాలు',
    dailyGoal: 'రోజువారీ లెర్నింగ్ లక్ష్యం',
    preferredTopics: 'ఇష్టమైన అంశాలు',
    language: 'భాష ప్రాధాన్యత',
    theme: 'థీమ్',
    light: 'లైట్',
    dark: 'డార్క్',
    system: 'సిస్టమ్',
    deleteAccount: 'ఖాతాను తొలగించండి',
    deleteWarning: 'ఈ చర్యను రద్దు చేయలేము'
  }
};

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    emailNotifications: true,
    courseUpdates: true,
    newLessons: true,
    reminders: true,
    showProgress: true,
    showCertificates: true,
    dailyGoal: '1',
    theme: 'light'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Settings className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">{t.profile}</h1>
              </div>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {t.edit}
                </motion.button>
              ) : (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {t.save}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md"
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t.cancel}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t.personalInfo}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.role}</label>
                <div className="mt-1 block w-full text-gray-700">
                  {currentUser?.role === 'student' ? t.student : t.volunteer}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t.notifications}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{t.emailNotifications}</span>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </motion.div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{t.courseUpdates}</span>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <input
                    type="checkbox"
                    name="courseUpdates"
                    checked={formData.courseUpdates}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t.privacy}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{t.showProgress}</span>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <input
                    type="checkbox"
                    name="showProgress"
                    checked={formData.showProgress}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </motion.div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{t.showCertificates}</span>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <input
                    type="checkbox"
                    name="showCertificates"
                    checked={formData.showCertificates}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Learning */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Book className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t.learning}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.dailyGoal}</label>
                <select
                  name="dailyGoal"
                  value={formData.dailyGoal}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* History */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t.history}</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md"
            >
              <Download className="h-4 w-4 mr-2" />
              {t.downloadData}
            </motion.button>
          </motion.div>

          {/* Delete Account */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4">{t.deleteAccount}</h2>
            <p className="text-gray-600 mb-4">{t.deleteWarning}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {t.deleteAccount}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;