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
      description: 'Master the principles of contract formation and enforcement',
      lastAccessed: '5 hours ago',
      certificate: true,
      deadline: '2024-02-28'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Courses' },
    { value: 'fundamentals', label: 'Fundamentals' },
    { value: 'constitutional', label: 'Constitutional Law' },
    { value: 'criminal', label: 'Criminal Law' },
    { value: 'contracts', label: 'Contract Law' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-gray-400';
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

  const StatCard = ({ stat, index }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
          <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
        </div>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
      </div>
    </div>
  );

  const CourseCardGrid = ({ course }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 h-32 flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(course.difficulty)}`}>
          {course.difficulty}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
          <div className="flex items-center ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User className="w-4 h-4 mr-1" />
          <span>{course.instructor}</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-semibold text-gray-900">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-full rounded-full ${getProgressColor(course.progress)} transition-all duration-300`}
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {course.completedModules}/{course.totalModules} modules
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 mb-1">Next Lesson</p>
          <p className="text-sm font-medium text-gray-900">{course.nextLesson}</p>
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Continue
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const CourseCardList = ({ course }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
              <p className="text-gray-600 text-sm">{course.instructor}</p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 mb-3">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Target className="w-4 h-4 mr-1" />
              <span>{course.completedModules}/{course.totalModules} modules</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(course.progress)}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
              </div>
              <span className="text-sm text-gray-600">Next: {course.nextLesson}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Download className="w-4 h-4" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-1">Continue your legal education journey</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-white border border-gray-300 rounded-lg p-1">
              <button 
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <button className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Courses */}
        {filteredCourses.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCardGrid key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map(course => (
                <CourseCardList key={course.id} course={course} />
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
              }}
            >
              Browse All Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;