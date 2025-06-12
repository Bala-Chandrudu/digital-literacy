import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    register: 'Register',
    registerSubtitle: 'Create an account to start your learning journey',
    name: 'Full Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    role: 'I want to register as a',
    student: 'Student',
    volunteer: 'Volunteer',
    registerButton: 'Create Account',
    haveAccount: 'Already have an account?',
    login: 'Login',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    passwordMismatch: 'Passwords do not match',
    invalidEmail: 'Invalid email format',
    passwordLength: 'Password must be at least 6 characters'
  },
  telugu: {
    register: 'నమోదు',
    registerSubtitle: 'మీ అభ్యాస ప్రయాణాన్ని ప్రారంభించడానికి ఖాతాను సృష్టించండి',
    name: 'పూర్తి పేరు',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    confirmPassword: 'పాస్‌వర్డ్‌ని నిర్ధారించండి',
    role: 'నేను ఇలా నమోదు చేయాలనుకుంటున్నాను',
    student: 'విద్యార్థి',
    volunteer: 'స్వచ్ఛంద సేవకుడు',
    registerButton: 'ఖాతాను సృష్టించండి',
    haveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    login: 'లాగిన్',
    nameRequired: 'పేరు అవసరం',
    emailRequired: 'ఇమెయిల్ అవసరం',
    passwordRequired: 'పాస్‌వర్డ్ అవసరం',
    passwordMismatch: 'పాస్‌వర్డ్‌లు సరిపోలలేదు',
    invalidEmail: 'చెల్లని ఇమెయిల్ ఫార్మాట్',
    passwordLength: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి'
  }
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = t.nameRequired;
    }

    if (!email) {
      newErrors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!password) {
      newErrors.password = t.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = t.passwordLength;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <UserCheck className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t.register}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t.registerSubtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t.name}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.email}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.password}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t.confirmPassword}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.role}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setRole('student')}
                  className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${
                    role === 'student' 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <User className={`h-6 w-6 ${role === 'student' ? 'text-blue-500' : 'text-gray-500'}`} />
                  <span className={`mt-2 ${role === 'student' ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                    {t.student}
                  </span>
                </div>
                <div
                  onClick={() => setRole('volunteer')}
                  className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${
                    role === 'volunteer' 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <UserCheck className={`h-6 w-6 ${role === 'volunteer' ? 'text-blue-500' : 'text-gray-500'}`} />
                  <span className={`mt-2 ${role === 'volunteer' ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                    {t.volunteer}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {t.registerButton}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t.haveAccount}{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                {t.login}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;