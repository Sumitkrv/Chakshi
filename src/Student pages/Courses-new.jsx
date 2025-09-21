import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Download, 
  Clock, 
  CheckCircle, 
  User, 
  BarChart3,
  Star,
  Calendar,
  Award,
  Target,
  TrendingUp,
  Filter,
  Search,
  Grid,
  List,
  ChevronRight,
  PlayCircle,
  FileText,
  Video
} from 'lucide-react';

const Courses = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [courses] = useState([
    {
      id: 1,
      title: 'Introduction to Legal Studies',
      progress: 75,
      instructor: 'Dr. Sarah Johnson',
      totalModules: 12,
      completedModules: 9,
      nextLesson: 'Legal Research Methods',
      duration: '8 weeks',
      rating: 4.8,
      students: 1243,
      category: 'fundamentals',
      difficulty: 'Beginner',
      image: '/api/placeholder/400/250',
      description: 'Comprehensive introduction to legal principles and practices',
      lastAccessed: '2 hours ago',
      certificate: true,
      deadline: '2024-03-15'
    },
    {
      id: 2,
      title: 'Constitutional Law',
      progress: 45,
      instructor: 'Prof. Michael Chen',
      totalModules: 15,
      completedModules: 7,
      nextLesson: 'Fundamental Rights',
      duration: '12 weeks',
      rating: 4.9,
      students: 987,
      category: 'constitutional',
      difficulty: 'Intermediate',
      image: '/api/placeholder/400/250',
      description: 'Deep dive into constitutional principles and case law',
      lastAccessed: '1 day ago',
      certificate: true,
      deadline: '2024-04-20'
    },
    {
      id: 3,
      title: 'Criminal Law',
      progress: 30,
      instructor: 'Dr. Amanda Williams',
      totalModules: 10,
      completedModules: 3,
      nextLesson: 'Elements of Crime',
      duration: '10 weeks',
      rating: 4.7,
      students: 756,
      category: 'criminal',
      difficulty: 'Intermediate',
      image: '/api/placeholder/400/250',
      description: 'Comprehensive study of criminal law principles and procedures',
      lastAccessed: '3 days ago',
      certificate: true,
      deadline: '2024-05-10'
    },
    {
      id: 4,
      title: 'Contract Law',
      progress: 85,
      instructor: 'Prof. James Miller',
      totalModules: 8,
      completedModules: 7,
      nextLesson: 'Breach of Contract',
      duration: '6 weeks',
      rating: 4.6,
      students: 1156,
      category: 'contracts',
      difficulty: 'Advanced',
      image: '/api/placeholder/400/250',
      description: 'Master the principles of contract formation and enforcement',
      lastAccessed: '5 hours ago',
      certificate: true,
      deadline: '2024-02-28'
    },
    {
      id: 5,
      title: 'Civil Procedure',
      progress: 15,
      instructor: 'Dr. Lisa Rodriguez',
      totalModules: 14,
      completedModules: 2,
      nextLesson: 'Filing a Complaint',
      duration: '11 weeks',
      rating: 4.5,
      students: 654,
      category: 'procedure',
      difficulty: 'Intermediate',
      image: '/api/placeholder/400/250',
      description: 'Navigate the complexities of civil court procedures',
      lastAccessed: '1 week ago',
      certificate: true,
      deadline: '2024-06-30'
    },
    {
      id: 6,
      title: 'Legal Research & Writing',
      progress: 60,
      instructor: 'Prof. David Thompson',
      totalModules: 9,
      completedModules: 5,
      nextLesson: 'Case Analysis Techniques',
      duration: '7 weeks',
      rating: 4.8,
      students: 892,
      category: 'skills',
      difficulty: 'Beginner',
      image: '/api/placeholder/400/250',
      description: 'Develop essential legal research and writing skills',
      lastAccessed: '2 days ago',
      certificate: true,
      deadline: '2024-03-30'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Courses' },
    { value: 'fundamentals', label: 'Fundamentals' },
    { value: 'constitutional', label: 'Constitutional Law' },
    { value: 'criminal', label: 'Criminal Law' },
    { value: 'contracts', label: 'Contract Law' },
    { value: 'procedure', label: 'Civil Procedure' },
    { value: 'skills', label: 'Legal Skills' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-emerald-600';
    if (progress >= 50) return 'from-blue-500 to-indigo-600';
    if (progress >= 30) return 'from-yellow-500 to-orange-600';
    return 'from-gray-400 to-gray-500';
  };

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'all' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'blue' },
    { label: 'In Progress', value: courses.filter(c => c.progress > 0 && c.progress < 100).length, icon: Clock, color: 'orange' },
    { label: 'Completed', value: courses.filter(c => c.progress === 100).length, icon: CheckCircle, color: 'green' },
    { label: 'Certificates', value: courses.filter(c => c.certificate && c.progress >= 80).length, icon: Award, color: 'purple' }
  ];

  return (
    <div className="pro-dashboard-layout">
      <div className="pro-main-content lg:ml-64">
        
        {/* Header */}
        <header className="pro-header">
          <div className="pro-flex-between w-full">
            <div className="pro-flex-col">
              <h1 className="pro-heading-xl text-gray-900">My Courses</h1>
              <p className="pro-text-body text-gray-600">
                Continue your legal education journey
              </p>
            </div>
            
            <div className="pro-flex items-center pro-gap-4">
              <div className="pro-flex items-center pro-gap-2">
                <button 
                  className={`pro-btn pro-btn-sm ${viewMode === 'grid' ? 'pro-btn-primary' : 'pro-btn-ghost'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  className={`pro-btn pro-btn-sm ${viewMode === 'list' ? 'pro-btn-primary' : 'pro-btn-ghost'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="pro-p-6 lg:p-8">
          
          {/* Stats */}
          <div className="pro-grid lg:grid-cols-4 md:grid-cols-2 pro-gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="pro-stat-card group pro-animate-fade-in pro-hover-lift"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <div className="pro-flex-between items-start mb-4">
                  <div className={`w-12 h-12 pro-rounded-xl bg-${stat.color}-100 pro-flex-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="pro-flex-col">
                  <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="pro-text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="pro-flex flex-wrap items-center pro-gap-4 mb-8">
            <div className="pro-flex items-center pro-gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pro-form-input pro-w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="pro-form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <button className="pro-btn pro-btn-ghost">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>

          {/* Courses Grid/List */}
          {viewMode === 'grid' ? (
            <div className="pro-grid lg:grid-cols-3 md:grid-cols-2 pro-gap-8">
              {filteredCourses.map(course => (
                <div 
                  key={course.id} 
                  className="pro-course-card group pro-animate-fade-in pro-hover-lift"
                >
                  {/* Course Image */}
                  <div className="relative overflow-hidden pro-rounded-lg mb-6">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 pro-flex-center">
                      <BookOpen className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="pro-flex items-center pro-gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 pro-rounded-lg">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="pro-text-xs font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="pro-flex-col">
                    <h3 className="pro-heading-md text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {course.title}
                    </h3>
                    <p className="pro-text-sm text-gray-600 mb-3">
                      {course.description}
                    </p>
                    
                    <div className="pro-flex items-center pro-gap-4 mb-4">
                      <div className="pro-flex items-center pro-gap-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="pro-text-xs text-gray-600">{course.instructor}</span>
                      </div>
                      <div className="pro-flex items-center pro-gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="pro-text-xs text-gray-600">{course.duration}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="pro-flex-between items-center mb-2">
                        <span className="pro-text-sm font-medium text-gray-700">Progress</span>
                        <span className="pro-text-sm font-semibold text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 pro-rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full pro-rounded-full bg-gradient-to-r ${getProgressColor(course.progress)} transition-all duration-1000 ease-out`}
                          style={{width: `${course.progress}%`}}
                        ></div>
                      </div>
                      <div className="pro-flex-between items-center mt-1">
                        <span className="pro-text-xs text-gray-500">
                          {course.completedModules}/{course.totalModules} modules
                        </span>
                        <span className="pro-text-xs text-gray-500">
                          Last accessed: {course.lastAccessed}
                        </span>
                      </div>
                    </div>

                    {/* Next Lesson */}
                    <div className="bg-gray-50 pro-p-3 pro-rounded-lg mb-4">
                      <p className="pro-text-xs text-gray-600 mb-1">Next Lesson:</p>
                      <p className="pro-text-sm font-medium text-gray-900">{course.nextLesson}</p>
                    </div>

                    {/* Actions */}
                    <div className="pro-flex items-center justify-between">
                      <button className="pro-btn pro-btn-primary pro-btn-sm">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </button>
                      <div className="pro-flex items-center pro-gap-2">
                        <button className="pro-btn pro-btn-ghost pro-btn-sm">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="pro-btn pro-btn-ghost pro-btn-sm">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredCourses.map(course => (
                <div 
                  key={course.id}
                  className="pro-dashboard-card pro-hover-lift"
                >
                  <div className="pro-flex items-center pro-gap-6">
                    {/* Course Image */}
                    <div className="w-24 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 pro-rounded-lg pro-flex-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                      <div className="pro-flex items-start justify-between mb-2">
                        <div>
                          <h3 className="pro-heading-md text-gray-900 mb-1">{course.title}</h3>
                          <p className="pro-text-sm text-gray-600">{course.instructor}</p>
                        </div>
                        <div className="pro-flex items-center pro-gap-2">
                          <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty}
                          </span>
                          <div className="pro-flex items-center pro-gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="pro-text-xs font-medium">{course.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pro-flex items-center pro-gap-6 mb-3">
                        <div className="pro-flex items-center pro-gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="pro-text-xs text-gray-600">{course.duration}</span>
                        </div>
                        <div className="pro-flex items-center pro-gap-1">
                          <Target className="w-4 h-4 text-gray-400" />
                          <span className="pro-text-xs text-gray-600">{course.completedModules}/{course.totalModules} modules</span>
                        </div>
                        <div className="pro-flex items-center pro-gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="pro-text-xs text-gray-600">Due: {course.deadline}</span>
                        </div>
                      </div>

                      <div className="pro-flex items-center justify-between">
                        <div className="pro-flex items-center pro-gap-4">
                          <div className="pro-flex items-center pro-gap-2">
                            <div className="w-24 bg-gray-200 pro-rounded-full h-2">
                              <div 
                                className={`h-full pro-rounded-full bg-gradient-to-r ${getProgressColor(course.progress)}`}
                                style={{width: `${course.progress}%`}}
                              ></div>
                            </div>
                            <span className="pro-text-sm font-medium text-gray-900">{course.progress}%</span>
                          </div>
                          <span className="pro-text-sm text-gray-600">Next: {course.nextLesson}</span>
                        </div>

                        <div className="pro-flex items-center pro-gap-2">
                          <button className="pro-btn pro-btn-ghost pro-btn-sm">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="pro-btn pro-btn-primary pro-btn-sm">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="pro-empty-state">
              <div className="w-16 h-16 bg-gray-100 pro-rounded-xl pro-flex-center mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="pro-heading-md text-gray-900 mb-2">No courses found</h3>
              <p className="pro-text-body text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button className="pro-btn pro-btn-primary">
                Browse All Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;