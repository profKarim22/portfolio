const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Strip trailing slashes and /api/v1 if present to construct clean base URLs
const BASE_URL = RAW_API_URL.replace(/\/api\/v1\/?$/, '').replace(/\/+$/, '');
const API_V1_URL = `${BASE_URL}/api/v1`;

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error?.message || errorBody?.message || `HTTP ${response.status}: ${response.statusText}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = errorBody;
    throw err;
  }
  return response.json();
};

// Health Route
export const getHealth = () => fetch(`${BASE_URL}/api/health`).then(handleResponse);

// Public Routes
export const getProjects = () => fetch(`${API_V1_URL}/projects`).then(handleResponse);
export const getProjectById = (id) => fetch(`${API_V1_URL}/projects/${id}`).then(handleResponse);
export const getProfile = () => fetch(`${API_V1_URL}/profile`).then(handleResponse);
export const getSkills = () => fetch(`${API_V1_URL}/skills`).then(handleResponse);
export const getStatus = () => fetch(`${API_V1_URL}/status`).then(handleResponse);
export const getApiEndpoint = (key) => fetch(`${API_V1_URL}/api-endpoints/${key}`).then(handleResponse);

// Auth Routes
export const loginAdmin = async (email, password) => {
  const result = await fetch(`${API_V1_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
  
  const token = result?.data?.token || result?.token;
  if (token) {
    localStorage.setItem('token', token);
  }
  return result;
};

export const logoutAdmin = () => {
  localStorage.removeItem('token');
};

export const getMe = () => fetch(`${API_V1_URL}/auth/me`, {
  headers: { 'Authorization': `Bearer ${getAuthToken()}` },
}).then(handleResponse);

// Admin Routes
export const createProject = (data) => fetch(`${API_V1_URL}/admin/projects`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);

export const updateProject = (id, data) => fetch(`${API_V1_URL}/admin/projects/${id}`, {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);

export const deleteProject = (id) => fetch(`${API_V1_URL}/admin/projects/${id}`, {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${getAuthToken()}` },
}).then(handleResponse);

export const reorderProjects = (orderedIds) => fetch(`${API_V1_URL}/admin/projects/reorder`, {
  method: 'PATCH',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify({ projectIds: orderedIds }),
}).then(handleResponse);

export const updateApiEndpoint = (key, data) => fetch(`${API_V1_URL}/admin/api-endpoints/${key}`, {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);

export const updateStatus = (data) => fetch(`${API_V1_URL}/admin/status`, {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);

