import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  english: {
    about: 'About',
    aboutContent: 'The Digital Literacy Portal aims to provide quality digital education to rural students, bridging the gap in technological knowledge and skills.',
    quickLinks: 'Quick Links',
    home: 'Home',
    courses: 'Courses',
    contact: 'Contact',
    faq: 'FAQ',
    connect: 'Connect With Us',
    address: 'Hyderabad, Telangana, India',
    rights: 'All rights reserved',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  telugu: {
    about: 'గురించి',
    aboutContent: 'డిజిటల్ లిటరసీ పోర్టల్ గ్రామీణ విద్యార్థులకు నాణ్యమైన డిజిటల్ విద్యను అందించడానికి, సాంకేతిక జ్ఞానం మరియు నైపుణ్యాల్లో ఉన్న అంతరాన్ని పూరించడానికి లక్ష్యంగా పెట్టుకుంది.',
    quickLinks: 'త్వరిత లింక్‌లు',
    home: 'హోమ్',
    courses: 'కోర్సులు',
    contact: 'సంప్రదించండి',
    faq: 'తరచుగా అడిగే ప్రశ్నలు',
    connect: 'మాతో కలవండి',
    address: 'హైదరాబాద్, తెలంగాణ, భారతదేశం',
    rights: 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి',
    privacy: 'గోప్యతా విధానం',
    terms: 'సేవా నిబంధనలు',
  }
};

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-lg font-bold">Digital Literacy Portal</span>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {t.aboutContent}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white text-sm">
                  {t.home}
                </a>
              </li>
              <li>
                <a href="/courses" className="text-gray-300 hover:text-white text-sm">
                  {t.courses}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white text-sm">
                  {t.contact}
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-300 hover:text-white text-sm">
                  {t.faq}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{t.connect}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300 text-sm">contact@digitalliteracy.org</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300 text-sm">+91 9876543210</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-300 text-sm">{t.address}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Digital Literacy Portal. {t.rights}.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
              {t.privacy}
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;