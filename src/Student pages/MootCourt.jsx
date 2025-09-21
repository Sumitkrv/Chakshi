import React, { useState } from 'react';
import { FiCalendar, FiUsers, FiAward, FiClock } from 'react-icons/fi';

const MootCourt = () => {
  const [competitions] = useState([
    {
      id: 1,
      title: 'International Law Moot Court Competition',
      date: '2025-10-15',
      status: 'Upcoming',
      participants: 24,
      type: 'International',
      registrationDeadline: '2025-10-01'
    },
    {
      id: 2,
      title: 'Constitutional Law Moot',
      date: '2025-11-05',
      status: 'Registration Open',
      participants: 16,
      type: 'National',
      registrationDeadline: '2025-10-20'
    },
    {
      id: 3,
      title: 'Criminal Law Mock Trial',
      date: '2025-12-01',
      status: 'Registration Open',
      participants: 12,
      type: 'University',
      registrationDeadline: '2025-11-15'
    }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Moot Court Competitions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map(competition => (
          <div key={competition.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiAward className="text-purple-600 text-xl" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium 
                ${competition.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'}`}>
                {competition.status}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{competition.title}</h3>
            <p className="text-purple-600 font-medium text-sm mb-4">{competition.type}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2" />
                <span>Competition Date: {competition.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiClock className="mr-2" />
                <span>Registration Deadline: {competition.registrationDeadline}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiUsers className="mr-2" />
                <span>{competition.participants} Teams Participating</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View Details
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-purple-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Moot Court Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium mb-2">Preparation Guidelines</h3>
            <p className="text-sm text-gray-600">Learn how to prepare for moot court competitions</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium mb-2">Past Problems</h3>
            <p className="text-sm text-gray-600">Access previous moot court problems and solutions</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium mb-2">Video Resources</h3>
            <p className="text-sm text-gray-600">Watch recordings of past moot court sessions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MootCourt;