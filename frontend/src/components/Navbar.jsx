import React, { useState } from 'react';
import { Menu, X, BookOpen, Globe, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const translations = {
  english: {
    home: 'Home',
    courses: 'Courses',
    profile: 'Profile',
    contribute: 'Contribute',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
  },
  telugu: {
    home: 'హోమ్',
    courses: 'కోర్సులు',
    profile: 'ప్రొఫైల్',
    contribute: 'సహకరించండి',
    login: 'లాగిన్',
    register: 'నమోదు',
    logout: 'లాగ్అవుట్',
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { language, setLanguage } = useLanguage();

  const t = translations[language];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'telugu' : 'english');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">Digital Literacy Portal</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.a 
              href="/" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t.home}
            </motion.a>
            <motion.a 
              href="/courses"
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t.courses}
            </motion.a>
            
            {isAuthenticated && (
              <>
                <motion.a 
                  href="/profile"
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t.profile}
                </motion.a>
                {currentUser?.role === 'volunteer' && (
                  <motion.a 
                    href="/contribute"
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t.contribute}
                  </motion.a>
                )}
              </>
            )}
            
            <motion.button 
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              className="ml-4 flex items-center text-gray-700 hover:text-blue-600"
            >
              <Globe className="h-5 w-5 mr-1" />
              <span>{language === 'english' ? 'EN' : 'TE'}</span>
            </motion.button>
            
            {!isAuthenticated ? (
              <div className="flex items-center ml-4">
                <motion.a 
                  href="/login" 
                  whileHover={{ scale: 1.05 }}
                  className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium inline-flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {t.login}
                </motion.a>
                <motion.a 
                  href="/register" 
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium ml-2"
                >
                  {t.register}
                </motion.a>
              </div>
            ) : (
              <motion.button 
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium ml-4 inline-flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.logout}
              </motion.button>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <motion.button 
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <Globe className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        className="md:hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t.home}
          </motion.a>
          <motion.a
            href="/courses"
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t.courses}
          </motion.a>
          
          {isAuthenticated && (
            <>
              <motion.a
                href="/profile"
                whileHover={{ scale: 1.05 }}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {t.profile}
              </motion.a>
              {currentUser?.role === 'volunteer' && (
                <motion.a
                  href="/contribute"
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {t.contribute}
                </motion.a>
              )}
            </>
          )}
          
          {!isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                className="text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium inline-flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t.login}
              </motion.a>
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium mt-2"
              >
                {t.register}
              </motion.a>
            </div>
          ) : (
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              className="text-red-600 hover:bg-red-50 block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2 inline-flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t.logout}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;