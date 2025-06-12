import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const translations = {
  english: {
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    courseProgress: 'Course Progress',
    percentComplete: '% Complete'
  },
  telugu: {
    completed: 'పూర్తయింది',
    inProgress: 'ప్రగతిలో ఉంది',
    notStarted: 'ప్రారంభించలేదు',
    courseProgress: 'కోర్సు పురోగతి',
    percentComplete: '% పూర్తి'
  }
};

const COLORS = ['#10B981', '#60A5FA', '#9CA3AF'];

const CourseProgressChart = ({ data }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const chartData = [
    { name: t.completed, value: data.completed },
    { name: t.inProgress, value: data.inProgress },
    { name: t.notStarted, value: data.notStarted }
  ];

  const totalCourses = data.completed + data.inProgress + data.notStarted;
  const completionPercentage = Math.round((data.completed / totalCourses) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4">{t.courseProgress}</h3>
      <div className="flex items-center justify-center">
        <div className="relative" style={{ width: '300px', height: '300px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-3xl font-bold text-gray-800">{completionPercentage}%</div>
            <div className="text-sm text-gray-500">{t.percentComplete}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseProgressChart;