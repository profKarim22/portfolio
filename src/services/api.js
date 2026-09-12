import axios from 'axios';

// Determine base URL from environment or default to local backend
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for cookies/session if used by backend, but the backend expects credentials for auth
});

// Request Interceptor (Optional: Add token if we decide to use localStorage for tokens, 
// but backend seems to use cookies or headers. Let's support Bearer token if it's returned by login).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Public Endpoints ---
export const getProfile = () => api.get('/profile').then(res => res.data);
export const getProjects = () => api.get('/projects').then(res => res.data);
export const getProjectById = (id) => api.get(`/projects/${id}`).then(res => res.data);
export const getSkills = () => api.get('/skills').then(res => res.data);
export const getStatus = () => api.get('/status').then(res => res.data);
export const getApiEndpoint = (key) => api.get(`/api-endpoints/${key}`).then(res => res.data);

// --- Auth Endpoints ---
export const loginAdmin = (email, password) => api.post('/auth/login', { email, password }).then(res => res.data);
export const logoutAdmin = () => api.post('/auth/logout').then(res => res.data);
export const getMe = () => api.get('/auth/me').then(res => res.data);

// --- Admin Endpoints (Protected) ---
export const createProject = (projectData) => api.post('/admin/projects', projectData).then(res => res.data);
export const updateProject = (id, projectData) => api.put(`/admin/projects/${id}`, projectData).then(res => res.data);
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`).then(res => res.data);
export const reorderProjects = (projects) => api.patch('/admin/projects/reorder', { projects }).then(res => res.data);

export const updateStatus = (statusData) => api.put('/admin/status', statusData).then(res => res.data);
export const updateApiEndpoint = (key, endpointData) => api.put(`/admin/api-endpoints/${key}`, endpointData).then(res => res.data);

export default api;
