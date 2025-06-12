import React, { useState } from 'react';

const ModuleAccordion = ({ module, isOpen, progress, courseId }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="mb-4 border rounded">
      <button
        className="w-full text-left px-4 py-2 bg-gray-100 font-semibold"
        onClick={() => setOpen(!open)}
      >
        {module.title}
      </button>
      {open && (
        <div className="p-4 bg-white">
          <ul>
            {module.lessons.map(lesson => (
              <li key={lesson.id} className="py-1">
                {lesson.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModuleAccordion;