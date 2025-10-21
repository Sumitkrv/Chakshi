import React, { useState, useEffect, useMemo } from 'react';
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
  Video,
  Brain,
  GraduationCap,
  Users,
  Bookmark,
  Zap,
  TargetIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getStudentCourses, getCourseCategories, getCurriculumStructure } from '../lib/api';

const Courses = () => {
  const { isAuthenticated, backendToken } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('my-courses');

  const [courses, setCourses] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);
  const [curriculumData, setCurriculumData] = useState({});
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!isAuthenticated() || !backendToken) {
        setLoadingCourses(false);
        return;
      }
      setLoadingCourses(true);
      setError(null);
      try {
        const [coursesResponse, categoriesResponse, curriculumResponse] = await Promise.all([
          getStudentCourses(backendToken),
          getCourseCategories(backendToken),
          getCurriculumStructure(backendToken)
        ]);

        if (coursesResponse.success) {
          setCourses(coursesResponse.data);
        } else {
          setError(coursesResponse.message || 'Failed to fetch courses.');
        }

        if (categoriesResponse.success) {
          // Assuming categoriesResponse.data is an array of { value: '...', label: '...' }
          setCourseCategories([{ value: 'all', label: 'All Courses' }, ...categoriesResponse.data]);
        }

        if (curriculumResponse.success) {
          setCurriculumData(curriculumResponse.data);
        }

      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.message || 'An unexpected error occurred while fetching course data.');
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourseData();
  }, [isAuthenticated, backendToken]);

  const categories = useMemo(() => courseCategories, [courseCategories]);
  const curriculumStructure = useMemo(() => curriculumData, [curriculumData]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-[#10b98120] text-[#10b981] border-[#10b98140]';
      case 'Intermediate': return 'bg-[#f59e0b20] text-[#f59e0b] border-[#f59e0b40]';
      case 'Advanced': return 'bg-[#b69d7420] text-[#b69d74] border-[#b69d7440]';
      default: return 'bg-[#6b728020] text-[#6b7280] border-[#6b728040]';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-[#10b981]';
    if (progress >= 50) return 'bg-[#b69d74]';
    if (progress >= 30) return 'bg-[#f59e0b]';
    return 'bg-[#6b7280]';
  };

  const getYearColor = (year) => {
    const colors = {
      'First Year': 'bg-[#3b82f610] text-[#3b82f6] border-[#3b82f640]',
      'Second Year': 'bg-[#10b98110] text-[#10b981] border-[#10b98140]',
      'Third Year': 'bg-[#f59e0b10] text-[#f59e0b] border-[#f59e0b40]',
      'Fourth Year': 'bg-[#b69d7410] text-[#b69d74] border-[#b69d7440]',
      'Fifth Year': 'bg-[#8b5cf610] text-[#8b5cf6] border-[#8b5cf640]'
    };
    return colors[year] || 'bg-[#6b728020] text-[#6b7280] border-[#6b728040]';
  };

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'all' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { 
      label: 'Total Courses', 
      value: courses.length, 
      icon: BookOpen, 
      description: 'Across all years',
      bgColor: 'bg-[#b69d7410]',
      iconColor: 'text-[#b69d74]',
      borderColor: 'border-[#b69d7420]'
    },
    { 
      label: 'In Progress', 
      value: courses.filter(c => c.progress > 0 && c.progress < 100).length, 
      icon: Clock, 
      description: 'Active learning',
      bgColor: 'bg-[#f59e0b10]',
      iconColor: 'text-[#f59e0b]',
      borderColor: 'border-[#f59e0b20]'
    },
    { 
      label: 'Completed', 
      value: courses.filter(c => c.progress === 100).length, 
      icon: CheckCircle, 
      description: 'Courses finished',
      bgColor: 'bg-[#10b98110]',
      iconColor: 'text-[#10b981]',
      borderColor: 'border-[#10b98120]'
    },
    { 
      label: 'Certificates', 
      value: courses.filter(c => c.certificate && c.progress >= 80).length, 
      icon: Award, 
      description: 'Earned credentials',
      bgColor: 'bg-[#3b82f610]',
      iconColor: 'text-[#3b82f6]',
      borderColor: 'border-[#3b82f620]'
    }
  ];

  if (loadingCourses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5ef]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="ml-4 text-lg text-gray-700">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5ef]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({ stat }) => (
    <div className={`bg-white rounded-lg border ${stat.borderColor} p-6 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm bg-opacity-90`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center border ${stat.borderColor}`}>
          <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
        </div>
        <TrendingUp className="w-5 h-5 text-[#10b981]" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-[#1f2839] mb-1">{stat.value}</h3>
        <p className="text-sm font-medium text-[#1f2839]">{stat.label}</p>
        <p className="text-xs text-[#6b7280] mt-1">{stat.description}</p>
      </div>
    </div>
  );

  const CourseCardGrid = ({ course }) => (
    <div className="bg-white rounded-lg border border-[#b69d7420] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group backdrop-blur-sm bg-opacity-90">
      <div className="relative bg-gradient-to-br from-[#b69d7410] to-[#b69d7405] h-32 flex items-center justify-center p-4">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center border border-[#b69d7420] backdrop-blur-sm">
          <BookOpen className="w-8 h-8 text-[#b69d74]" />
        </div>
        <div className="absolute top-3 right-3 flex flex-col space-y-1">
          <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getYearColor(course.year)}`}>
            {course.year}
          </span>
        </div>
        {course.progress > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="w-full bg-[#b69d7410] rounded-full h-1.5 border border-[#b69d7420]">
              <div 
                className={`h-full rounded-full ${getProgressColor(course.progress)} transition-all duration-500`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-[#1f2839] line-clamp-2 group-hover:text-[#b69d74] transition-colors duration-200">
            {course.title}
          </h3>
          <div className="flex items-center ml-2">
            <Star className="w-4 h-4 text-[#f59e0b] fill-current" />
            <span className="text-sm font-medium text-[#1f2839] ml-1">{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-[#6b7280] mb-2">
          <Brain className="w-3 h-3 mr-1" />
          <span className="text-xs">{course.theory}</span>
        </div>
        
        <p className="text-[#6b7280] text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-sm text-[#6b7280] mb-4">
          <User className="w-4 h-4 mr-1" />
          <span>{course.instructor}</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#1f2839]">Progress</span>
            <span className="text-sm font-semibold text-[#b69d74]">{course.progress}%</span>
          </div>
          <div className="w-full bg-[#b69d7410] rounded-full h-2 border border-[#b69d7420]">
            <div 
              className={`h-full rounded-full ${getProgressColor(course.progress)} transition-all duration-500`}
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-[#6b7280]">
              {course.completedModules}/{course.totalModules} modules
            </span>
            <span className="text-xs text-[#6b7280] flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {course.duration}
            </span>
          </div>
        </div>

        <div className="bg-[#b69d7405] rounded-lg p-3 mb-4 border border-[#b69d7410]">
          <p className="text-xs text-[#6b7280] mb-1">Next Lesson</p>
          <p className="text-sm font-medium text-[#1f2839]">{course.nextLesson}</p>
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-gradient-to-r from-[#b69d74] to-[#b69d74DD] text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-[#b69d74DD] hover:to-[#b69d74BB] transition-all duration-300 flex items-center shadow-lg hover:shadow-xl">
            <Play className="w-4 h-4 mr-2" />
            Continue
          </button>
          <div className="flex space-x-2">
            <button className="text-[#6b7280] hover:text-[#b69d74] p-2 rounded-lg hover:bg-[#b69d7408] transition-all duration-200 border border-transparent hover:border-[#b69d7420]">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="text-[#6b7280] hover:text-[#b69d74] p-2 rounded-lg hover:bg-[#b69d7408] transition-all duration-200 border border-transparent hover:border-[#b69d7420]">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CurriculumOverview = () => (
    <div className="bg-white rounded-lg border border-[#b69d7420] p-6 shadow-sm backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center mb-6">
        <GraduationCap className="w-6 h-6 text-[#b69d74] mr-2" />
        <h2 className="text-xl font-bold text-[#1f2839]">5-Year LLB Curriculum Structure</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(curriculumStructure).map(([year, subjects]) => (
          <div key={year} className="border border-[#b69d7420] rounded-lg p-4 hover:shadow-md transition-all duration-300">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${getYearColor(year)}`}>
              <TargetIcon className="w-3 h-3 mr-1" />
              {year}
            </div>
            <ul className="space-y-2">
              {subjects.map((subject, index) => (
                <li key={index} className="flex items-start text-sm text-[#1f2839]">
                  <div className="w-1.5 h-1.5 bg-[#b69d74] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const LearningFramework = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg border border-[#b69d7420] p-6 shadow-sm backdrop-blur-sm bg-opacity-90">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-[#b69d74] mr-2" />
          <h3 className="text-lg font-bold text-[#1f2839]">Theoretical Foundation</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-[#b69d74] rounded-full mt-2 mr-3 flex-shrink-0" />
            <p className="text-sm text-[#1f2839]"><strong>Constructivist Learning Theory:</strong> Building knowledge through active engagement and real-world legal problems</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-[#b69d74] rounded-full mt-2 mr-3 flex-shrink-0" />
            <p className="text-sm text-[#1f2839]"><strong>Competency-Based Education:</strong> Mastery-focused progression with practical skill development</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-[#b69d74] rounded-full mt-2 mr-3 flex-shrink-0" />
            <p className="text-sm text-[#1f2839]"><strong>Blended Learning:</strong> Structured curricula with self-paced exploration opportunities</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#b69d7420] p-6 shadow-sm backdrop-blur-sm bg-opacity-90">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-[#b69d74] mr-2" />
          <h3 className="text-lg font-bold text-[#1f2839]">Learning Analytics</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-[#b69d7410]">
            <span className="text-sm text-[#1f2839]">Progress Tracking</span>
            <span className="text-sm text-[#b69d74] font-medium">Real-time</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#b69d7410]">
            <span className="text-sm text-[#1f2839]">Adaptive Difficulty</span>
            <span className="text-sm text-[#b69d74] font-medium">AI-Powered</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#b69d7410]">
            <span className="text-sm text-[#1f2839]">Knowledge Gaps</span>
            <span className="text-sm text-[#b69d74] font-medium">Smart Detection</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-[#1f2839]">Peer Comparison</span>
            <span className="text-sm text-[#b69d74] font-medium">Anonymous</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-[#1f2839]">Legal Education Platform</h1>
            <p className="text-[#6b7280] mt-1">Constructivist Learning Theory & Competency-Based Education</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-white border border-[#b69d7440] rounded-lg p-1 backdrop-blur-sm">
              <button 
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-[#b69d7410] text-[#b69d74] border border-[#b69d7420]' 
                    : 'text-[#6b7280] hover:text-[#1f2839] hover:bg-[#b69d7405]'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-[#b69d7410] text-[#b69d74] border border-[#b69d7420]' 
                    : 'text-[#6b7280] hover:text-[#1f2839] hover:bg-[#b69d7405]'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg border border-[#b69d7420] p-1 mb-8 backdrop-blur-sm bg-opacity-90">
          {['my-courses', 'curriculum', 'analytics'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#b69d7410] text-[#b69d74] border border-[#b69d7420]'
                  : 'text-[#6b7280] hover:text-[#1f2839] hover:bg-[#b69d7405]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'my-courses' && 'My Courses'}
              {tab === 'curriculum' && 'Curriculum'}
              {tab === 'analytics' && 'Learning Analytics'}
            </button>
          ))}
        </div>

        {activeTab === 'my-courses' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            {/* Learning Framework */}
            <LearningFramework />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
                <input
                  type="text"
                  placeholder="Search courses, instructors..."
                  className="w-full pl-10 pr-4 py-2 border border-[#b69d7440] rounded-lg focus:ring-2 focus:ring-[#b69d74] focus:border-[#b69d74] outline-none transition-all duration-200 bg-white bg-opacity-90 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="border border-[#b69d7440] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#b69d74] focus:border-[#b69d74] outline-none transition-all duration-200 bg-white bg-opacity-90 backdrop-blur-sm text-[#1f2839]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <button className="flex items-center text-[#6b7280] hover:text-[#1f2839] px-4 py-2 rounded-lg border border-[#b69d7440] hover:border-[#b69d7460] transition-all duration-200 bg-white bg-opacity-90 backdrop-blur-sm hover:bg-[#b69d7405]">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
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
                    <CourseCardGrid key={course.id} course={course} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#b69d7410] rounded-lg flex items-center justify-center mx-auto mb-4 border border-[#b69d7420]">
                  <BookOpen className="w-8 h-8 text-[#b69d74]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1f2839] mb-2">No courses found</h3>
                <p className="text-[#6b7280] mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  className="bg-gradient-to-r from-[#b69d74] to-[#b69d74DD] text-white px-6 py-2 rounded-lg font-medium hover:from-[#b69d74DD] hover:to-[#b69d74BB] transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
                >
                  Browse All Courses
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'curriculum' && <CurriculumOverview />}
        
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-[#b69d74] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#1f2839] mb-2">Learning Analytics Dashboard</h3>
            <p className="text-[#6b7280] mb-6">Advanced analytics and progress tracking coming soon</p>
            <div className="bg-[#b69d7405] border border-[#b69d7420] rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-[#1f2839]">
                Track your progress, identify knowledge gaps, and compare your performance with peers anonymously.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
