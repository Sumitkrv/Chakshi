import React, { useState } from 'react';
import { FiBook, FiPlay, FiDownload } from 'react-icons/fi';

const Courses = () => {
  const [courses] = useState([
    {
      id: 1,
      title: 'Introduction to Legal Studies',
      progress: 75,
      instructor: 'Dr. Sarah Johnson',
      totalModules: 12,
      completedModules: 9,
      nextLesson: 'Legal Research Methods'
    },
    {
      id: 2,
      title: 'Constitutional Law',
      progress: 45,
      instructor: 'Prof. Michael Chen',
      totalModules: 15,
      completedModules: 7,
      nextLesson: 'Fundamental Rights'
    },
    {
      id: 3,
      title: 'Criminal Law',
      progress: 30,
      instructor: 'Dr. Amanda Williams',
      totalModules: 10,
      completedModules: 3,
      nextLesson: 'Elements of Crime'
    }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiBook className="text-blue-600 text-xl" />
              </div>
              <div className="text-sm font-medium text-gray-500">
                {course.completedModules}/{course.totalModules} modules
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-3">Instructor: {course.instructor}</p>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">Next Lesson: {course.nextLesson}</p>
              <div className="flex justify-between">
                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  <FiPlay className="mr-1" />
                  Continue
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-700">
                  <FiDownload className="mr-1" />
                  Materials
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;