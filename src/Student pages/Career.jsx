import React, { useState } from 'react';

export default function Career() {
  const [activeTab, setActiveTab] = useState('internships');
  
  // Sample data for demonstration
  const internships = [
    {
      id: 1,
      title: "Legal Intern at Sharma & Associates",
      type: "Corporate Law",
      duration: "3 months",
      deadline: "2023-11-15",
      status: "Open",
      featured: true
    },
    {
      id: 2,
      title: "Judicial Clerkship with Hon. Justice Verma",
      type: "Litigation",
      duration: "6 months",
      deadline: "2023-12-01",
      status: "Open",
      featured: true
    },
    {
      id: 3,
      title: "Legal Researcher at Indian Law Institute",
      type: "Research",
      duration: "4 months",
      deadline: "2023-11-20",
      status: "Open",
      featured: false
    },
    {
      id: 4,
      title: "Corporate Counsel Intern at TechCorp",
      type: "Corporate Law",
      duration: "3 months",
      deadline: "2023-11-30",
      status: "Open",
      featured: false
    },
    {
      id: 5,
      title: "Human Rights Fellow at Justice Initiative",
      type: "Public Interest",
      duration: "12 months",
      deadline: "2023-12-15",
      status: "Open",
      featured: true
    },
    {
      id: 6,
      title: "Legal Aid Volunteer at District Court",
      type: "Litigation",
      duration: "2 months",
      deadline: "2023-11-10",
      status: "Closing soon",
      featured: false
    }
  ];

  const roadmaps = {
    litigation: [
      "Master Civil & Criminal Procedure Codes",
      "Develop Courtroom Communication Skills",
      "Build Network with Senior Advocates",
      "Join Bar Council of India",
      "Start with Junior Advocate Position"
    ],
    corporate: [
      "Specialize in Company Law",
      "Develop Contract Drafting Skills",
      "Learn Compliance Regulations",
      "Network with Corporate Law Firms",
      "Pursue Company Secretary Course"
    ],
    academia: [
      "Excel in Academic Performance",
      "Publish Research Papers",
      "Attend Academic Conferences",
      "Pursue LL.M. and Ph.D.",
      "Apply for Teaching Positions"
    ]
  };

  const resources = {
    courses: [
      {
        title: "Advanced Contract Drafting",
        provider: "LawSikho",
        duration: "12 hours",
        level: "Intermediate",
        rating: 4.8
      },
      {
        title: "Criminal Trial Advocacy",
        provider: "NLUD",
        duration: "8 hours",
        level: "Advanced",
        rating: 4.7
      },
      {
        title: "IPR Law Specialization",
        provider: "NALSAR",
        duration: "20 hours",
        level: "Intermediate",
        rating: 4.9
      },
      {
        title: "Corporate Compliance Masterclass",
        provider: "ICSI",
        duration: "15 hours",
        level: "Advanced",
        rating: 4.6
      }
    ],
    webinars: [
      {
        title: "Judiciary Preparation Strategy",
        date: "Tomorrow • 5:00 PM IST",
        speaker: "Hon. Justice A. Kumar (Retd.)",
        attendees: 250
      },
      {
        title: "Career in International Law",
        date: "Nov 20 • 6:30 PM IST",
        speaker: "Prof. S. Mehta, Geneva Institute",
        attendees: 180
      },
      {
        title: "AI and Legal Practice",
        date: "Nov 25 • 4:00 PM IST",
        speaker: "Dr. R. Sharma, LegalTech Expert",
        attendees: 320
      },
      {
        title: "Women in Law Leadership",
        date: "Dec 2 • 3:00 PM IST",
        speaker: "Adv. P. Desai, Senior Partner",
        attendees: 195
      }
    ],
    books: [
      {
        title: "The Practice of Law",
        author: "N.R. Madhava Menon",
        edition: "4th Edition",
        category: "Professional Practice"
      },
      {
        title: "Contract Law in India",
        author: "Avtar Singh",
        edition: "3rd Edition",
        category: "Corporate Law"
      },
      {
        title: "Criminal Major Acts",
        author: "Universal's",
        edition: "2023 Edition",
        category: "Criminal Law"
      },
      {
        title: "Constitutional Law of India",
        author: "J.N. Pandey",
        edition: "58th Edition",
        category: "Constitutional Law"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with welcome message */}
        <div className="bg-[#0A2342] text-white p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold">Career Center</h1>
          <p className="mt-2 opacity-90">Welcome back, Chakshi! Here are curated opportunities for your legal career.</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <button 
              className={`flex-1 py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === 'internships' 
                  ? 'bg-[#1E3A8A] text-white' 
                  : 'text-[#333333] hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('internships')}
            >
              <i className="fas fa-briefcase"></i> Internships & Jobs
            </button>
            <button 
              className={`flex-1 py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === 'roadmap' 
                  ? 'bg-[#1E3A8A] text-white' 
                  : 'text-[#333333] hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('roadmap')}
            >
              <i className="fas fa-map-signs"></i> Career Roadmap
            </button>
            <button 
              className={`flex-1 py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === 'resources' 
                  ? 'bg-[#1E3A8A] text-white' 
                  : 'text-[#333333] hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('resources')}
            >
              <i className="fas fa-book"></i> Learning Resources
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'internships' && (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-[#0A2342]">Recommended Opportunities</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#444444]">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                  <option>Deadline</option>
                  <option>Recently Added</option>
                  <option>Relevance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship) => (
                <div key={internship.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  {internship.featured && (
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 flex items-center">
                      <i className="fas fa-star mr-1"></i> Featured
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-[#0A2342]">{internship.title}</h3>
                    <div className="flex flex-wrap items-center text-sm text-[#444444] mb-3 gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded-md">{internship.type}</span>
                      <span className="flex items-center">
                        <i className="far fa-clock mr-1"></i>{internship.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-xs font-medium text-[#444444]">Apply before:</span>
                        <p className="text-sm font-semibold text-red-600">{internship.deadline}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        internship.status === 'Open' ? 'bg-green-100 text-green-800' : 
                        internship.status === 'Closing soon' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {internship.status}
                      </span>
                    </div>
                    <button className="mt-4 w-full bg-[#1E3A8A] hover:bg-[#0A2342] text-white py-2 rounded-md text-sm font-medium transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <i className="fas fa-gavel text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-lg text-[#0A2342]">Litigation Pathway</h3>
              </div>
              <p className="text-sm text-[#444444] mb-6">Build a successful career in courtroom practice and advocacy</p>
              
              <div className="space-y-4">
                {roadmaps.litigation.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <p className="text-[#333333] pt-1">{step}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-md text-sm font-medium transition-colors">
                Explore Litigation Resources
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <i className="fas fa-building text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-lg text-[#0A2342]">Corporate Law Pathway</h3>
              </div>
              <p className="text-sm text-[#444444] mb-6">Excel in business law, compliance, and corporate legal practice</p>
              
              <div className="space-y-4">
                {roadmaps.corporate.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <p className="text-[#333333] pt-1">{step}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 rounded-md text-sm font-medium transition-colors">
                Explore Corporate Law Resources
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <i className="fas fa-graduation-cap text-green-600"></i>
                </div>
                <h3 className="font-semibold text-lg text-[#0A2342]">Academic Pathway</h3>
              </div>
              <p className="text-sm text-[#444444] mb-6">Pursue a career in legal education and research</p>
              
              <div className="space-y-4">
                {roadmaps.academia.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <p className="text-[#333333] pt-1">{step}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-md text-sm font-medium transition-colors">
                Explore Academic Resources
              </button>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4 text-[#0A2342]">Recommended Courses</h3>
              <ul className="space-y-3">
                {resources.courses.map((course, index) => (
                  <li key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                    <i className="fas fa-play-circle text-blue-500 text-xl mr-3 mt-1"></i>
                    <div>
                      <p className="font-medium text-[#0A2342]">{course.title}</p>
                      <div className="flex flex-wrap items-center text-sm text-[#444444] gap-2 mt-1">
                        <span>By {course.provider}</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-xs">
                          {course.level}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <i className="fas fa-star text-yellow-500 mr-1"></i>
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-md text-sm font-medium transition-colors">
                View All Courses
              </button>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4 text-[#0A2342]">Upcoming Webinars</h3>
              <ul className="space-y-3">
                {resources.webinars.map((webinar, index) => (
                  <li key={index} className="p-3 bg-orange-50 rounded-lg">
                    <p className="font-medium text-[#0A2342]">{webinar.title}</p>
                    <p className="text-sm text-[#444444] mt-1">{webinar.date}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-[#444444]">
                      <span>By {webinar.speaker}</span>
                      <span className="flex items-center">
                        <i className="fas fa-users mr-1"></i>
                        {webinar.attendees} attending
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-white border border-orange-600 text-orange-600 hover:bg-orange-50 py-2 rounded-md text-sm font-medium transition-colors">
                View All Webinars
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4 text-[#0A2342]">Recommended Reading</h3>
              <ul className="space-y-3">
                {resources.books.map((book, index) => (
                  <li key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                    <i className="fas fa-book text-green-500 text-xl mr-3 mt-1"></i>
                    <div>
                      <p className="font-medium text-[#0A2342]">{book.title}</p>
                      <div className="text-sm text-[#444444] mt-1">
                        <p>By {book.author}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-xs">
                            {book.edition}
                          </span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs">
                            {book.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-md text-sm font-medium transition-colors">
                View All Books
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}