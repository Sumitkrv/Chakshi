import React, { useState } from 'react';
import { FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Assignments = () => {
  const [assignments] = useState([
    {
      id: 1,
      title: 'Legal Case Analysis',
      course: 'Constitutional Law',
      dueDate: '2025-09-25',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Research Paper',
      course: 'Legal Research Methods',
      dueDate: '2025-09-30',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Mock Trial Preparation',
      course: 'Trial Advocacy',
      dueDate: '2025-10-05',
      status: 'completed',
      priority: 'high'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <FiAlertCircle className="text-red-500" />;
      case 'medium':
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiCheckCircle className="text-green-500" />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Assignments</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-gray-700 border-b">
          <div className="col-span-2">Assignment</div>
          <div>Course</div>
          <div>Due Date</div>
          <div>Status</div>
          <div>Priority</div>
        </div>

        {assignments.map(assignment => (
          <div key={assignment.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
            <div className="col-span-2">
              <p className="font-medium text-gray-800">{assignment.title}</p>
            </div>
            <div className="text-gray-600">{assignment.course}</div>
            <div className="text-gray-600">{assignment.dueDate}</div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                {assignment.status}
              </span>
            </div>
            <div className="flex items-center">
              {getPriorityIcon(assignment.priority)}
              <span className="ml-2 text-gray-600 text-sm capitalize">{assignment.priority}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;