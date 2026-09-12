const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || 'API Error');
  }
  return response.json();
};

// Public Routes
export const getProjects = () => fetch(`${API_BASE_URL}/projects`).then(handleResponse);
export const getProjectById = (id) => fetch(`${API_BASE_URL}/projects/${id}`).then(handleResponse);
export const getProfile = () => fetch(`${API_BASE_URL}/profile`).then(handleResponse);
export const getSkills = () => fetch(`${API_BASE_URL}/skills`).then(handleResponse);
export const getStatus = () => fetch(`${API_BASE_URL}/status`).then(handleResponse);
export const getApiEndpoint = (key) => fetch(`${API_BASE_URL}/api-endpoints/${key}`).then(handleResponse);

// Auth Routes
export const loginAdmin = async (email, password) => {
  const result = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
  
  if (result?.data?.token) {
    localStorage.setItem('token', result.data.token);
  }
  return result;
};

export const logoutAdmin = () => {
  localStorage.removeItem('token');
};

export const getMe = () => fetch(`${API_BASE_URL}/auth/me`, {
  headers: { 'Authorization': `Bearer ${getAuthToken()}` },
}).then(handleResponse);

// Admin Routes
export const createProject = (data) => fetch(`${API_BASE_URL}/admin/projects`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);

export const updateProject = (id, data) => fetch(`${API_BASE_URL}/admin/projects/${id}`, {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);

export const deleteProject = (id) => fetch(`${API_BASE_URL}/admin/projects/${id}`, {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${getAuthToken()}` },
}).then(handleResponse);

export const reorderProjects = (orderedIds) => fetch(`${API_BASE_URL}/admin/projects/reorder`, {
  method: 'PATCH',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify({ projectIds: orderedIds }),
}).then(handleResponse);

export const updateApiEndpoint = (key, data) => fetch(`${API_BASE_URL}/admin/api-endpoints/${key}`, {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);

export const updateStatus = (data) => fetch(`${API_BASE_URL}/admin/status`, {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
  body: JSON.stringify(data),
}).then(handleResponse);
