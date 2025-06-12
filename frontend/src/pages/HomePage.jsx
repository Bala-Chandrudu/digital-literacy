import React, { useEffect, useState } from 'react';
import { ArrowRight, Laptop, Shield, FileCheck, Smartphone } from 'lucide-react';
import { mockCourses } from '../data/mockCourses';
import CourseCard from '../components/CourseCard';
import { useLanguage } from '../context/LanguageContext';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const translations = {
  english: {
    heroTitle: 'Digital Education for Everyone',
    heroSubtitle: 'Learn essential digital skills to thrive in today\'s world',
    exploreCourses: 'Explore Courses',
    browseAll: 'Browse All Courses',
    featuredCourses: 'Featured Courses',
    features: {
      title: 'Build Your Digital Skills',
      subtitle: 'Our platform offers various courses to help you master the digital world',
      computerBasics: {
        title: 'Computer Basics',
        description: 'Learn how to use computers, navigate operating systems, and perform essential tasks.'
      },
      internetSafety: {
        title: 'Internet Safety',
        description: 'Understand how to browse the internet safely and protect your personal information.'
      },
      officeSuite: {
        title: 'Office Applications',
        description: 'Master essential productivity tools like Word, Excel, and PowerPoint.'
      },
      mobileApps: {
        title: 'Mobile Applications',
        description: 'Learn to use essential mobile apps for communication, payments, and more.'
      }
    },
    stats: {
      title: 'Empowering Rural Students',
      courses: 'Courses',
      students: 'Students',
      volunteers: 'Volunteers',
      villages: 'Villages Reached'
    },
    cta: {
      title: 'Ready to start learning?',
      subtitle: 'Join our platform today and gain essential digital skills',
      button: 'Get Started'
    }
  },
  telugu: {
    heroTitle: 'అందరికీ డిజిటల్ విద్య',
    heroSubtitle: 'నేటి ప్రపంచంలో వర్ధిల్లడానికి అవసరమైన డిజిటల్ నైపుణ్యాలను నేర్చుకోండి',
    exploreCourses: 'కోర్సులను అన్వేషించండి',
    browseAll: 'అన్ని కోర్సులను బ్రౌజ్ చేయండి',
    featuredCourses: 'ఫీచర్డ్ కోర్సులు',
    features: {
      title: 'మీ డిజిటల్ నైపుణ్యాలను నిర్మించండి',
      subtitle: 'మా ప్లాట్‌ఫారమ్ డిజిటల్ ప్రపంచాన్ని మాస్టర్ చేయడానికి మీకు సహాయపడే వివిధ కోర్సులను అందిస్తుంది',
      computerBasics: {
        title: 'కంప్యూటర్ మూలాలు',
        description: 'కంప్యూటర్‌లను ఎలా ఉపయోగించాలో, ఆపరేటింగ్ సిస్టమ్‌లలో ఎలా నావిగేట్ చేయాలో మరియు అవసరమైన పనులను ఎలా నిర్వహించాలో నేర్చుకోండి.'
      },
      internetSafety: {
        title: 'ఇంటర్నెట్ భద్రత',
        description: 'ఇంటర్నెట్‌ను సురక్షితంగా బ్రౌజ్ చేయడం మరియు మీ వ్యక్తిగత సమాచారాన్ని ఎలా రక్షించాలో అర్థం చేసుకోండి.'
      },
      officeSuite: {
        title: 'ఆఫీస్ అప్లికేషన్లు',
        description: 'వర్డ్, ఎక్సెల్ మరియు పవర్‌పాయింట్ వంటి అవసరమైన ఉత్పాదకత సాధనాలను మాస్టర్ చేయండి.'
      },
      mobileApps: {
        title: 'మొబైల్ అనువర్తనాలు',
        description: 'కమ్యూనికేషన్, చెల్లింపులు మరియు మరిన్ని కోసం అవసరమైన మొబైల్ యాప్‌లను ఉపయోగించడం నేర్చుకోండి.'
      }
    },
    stats: {
      title: 'గ్రామీణ విద్యార్థులకు అధికారం ఇవ్వడం',
      courses: 'కోర్సులు',
      students: 'విద్యార్థులు',
      volunteers: 'స్వచ్ఛంద సేవకులు',
      villages: 'చేరుకున్న గ్రామాలు'
    },
    cta: {
      title: 'నేర్చుకోవడం ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?',
      subtitle: 'నేడు మా ప్లాట్‌ఫారమ్‌లో చేరి అవసరమైన డిజిటల్ నైపుణ్యాలను పొందండి',
      button: 'ప్రారంభించండి'
    }
  }
};

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const HomePage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.heroTitle}</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">{t.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <a 
                href="/courses" 
                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md text-lg font-medium inline-flex items-center"
              >
                {t.exploreCourses}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Courses */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">{t.featuredCourses}</h2>
            <a 
              href="/courses" 
              className="text-blue-600 hover:text-blue-800 inline-flex items-center"
            >
              {t.browseAll}
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.features.title}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{t.features.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 text-blue-700 p-3 inline-flex rounded-lg mb-4">
                <Laptop className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.computerBasics.title}</h3>
              <p className="text-gray-600">{t.features.computerBasics.description}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 text-green-700 p-3 inline-flex rounded-lg mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.internetSafety.title}</h3>
              <p className="text-gray-600">{t.features.internetSafety.description}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 text-purple-700 p-3 inline-flex rounded-lg mb-4">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.officeSuite.title}</h3>
              <p className="text-gray-600">{t.features.officeSuite.description}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-orange-100 text-orange-700 p-3 inline-flex rounded-lg mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.mobileApps.title}</h3>
              <p className="text-gray-600">{t.features.mobileApps.description}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12"
          >
            {t.stats.title}
          </motion.h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp end={20} />+
              </div>
              <div className="text-gray-300">{t.stats.courses}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp end={5000} />+
              </div>
              <div className="text-gray-300">{t.stats.students}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp end={100} />+
              </div>
              <div className="text-gray-300">{t.stats.volunteers}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp end={250} />+
              </div>
              <div className="text-gray-300">{t.stats.villages}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-20 bg-blue-600 text-white text-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
          <a 
            href="/register" 
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-md text-lg font-medium inline-flex items-center"
          >
            {t.cta.button}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;