import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual backend API base URL

// Helper function to create authenticated axios instances
const createAuthInstance = (token) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: API_BASE_URL,
    headers: headers,
  });
};

export const loginUser = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { token });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const exchangeSupabaseTokenForBackendToken = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { token });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCurrentUserProfile = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/auth/me`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Template and Category API functions
export const getTemplateCategories = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/templates/categories`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTemplates = async (token, params = {}) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/templates`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTemplateById = async (token, id) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/templates/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUserWithBackend = async (token, role, name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { token, role, name });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getStudentDashboardData = async (token, dateFrom = null, dateTo = null) => {
  try {
    const authAxios = createAuthInstance(token);
    const params = {};
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;

    const response = await authAxios.get(`/dashboard/student/dashboard-data`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching student dashboard data:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Profile API functions
// Reusing getCurrentUserProfile for GET /api/student/profile as per feedback
export const updateStudentProfile = async (token, profileData) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.put(`/student/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating student profile:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Notifications API functions
export const getStudentNotifications = async (token, params = {}) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/student/notifications`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching student notifications:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Courses API functions
export const getStudentCourses = async (token, params = {}) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/student/courses`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching student courses:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getCourseCategories = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/courses/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course categories:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getCurriculumStructure = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/curriculum`);
    return response.data;
  } catch (error) {
    console.error('Error fetching curriculum structure:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Calendar API functions
export const getStudentCalendarEvents = async (token, params = {}) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/student/calendar/events`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching student calendar events:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const addStudentCalendarEvent = async (token, eventData) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.post(`/student/calendar/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error adding student calendar event:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const updateStudentCalendarEvent = async (token, id, eventData) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.put(`/student/calendar/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error(`Error updating student calendar event ${id}:`, error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const deleteStudentCalendarEvent = async (token, id) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.delete(`/student/calendar/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student calendar event ${id}:`, error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Assignments API functions
export const getStudentAssignments = async (token, params = {}) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/student/assignments`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching student assignments:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getStudentAssignmentById = async (token, id) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/student/assignments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student assignment ${id}:`, error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getStudentAIFeatures = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/student/ai-features`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student AI features:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getCoursesForFilters = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/courses`); // Assuming this returns dynamic course names for filters
    return response.data;
  } catch (error) {
    console.error('Error fetching courses for filters:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getAssignmentTypes = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/assignment-types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assignment types:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getBloomLevels = async (token) => {
  try {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get(`/bloom-levels`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Bloom levels:', error.response?.data || error.message);
    throw error.response?.data || { success: false, message: error.message };
  }
};
