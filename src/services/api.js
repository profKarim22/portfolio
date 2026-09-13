/**
 * Centralized API Client & Service Layer
 * Supports base URL configuration, credentials, bearer tokens, 401 refresh, and error mapping.
 */

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const RAW_API_BASE =
  env.VITE_API_BASE_URL ||
  (env.VITE_API_URL ? `${env.VITE_API_URL}/api/v1` : 'https://portfolio-backend-ashen-eta.vercel.app/api/v1');

// Clean base URLs
export const API_V1_URL = RAW_API_BASE.replace(/\/+$/, '');
export const BASE_URL = API_V1_URL.replace(/\/api\/v1\/?$/, '');

// ── In-Memory & Session Token Handling (No long-lived secrets in localStorage) ──
let memoryToken = null;

export const setAuthToken = (token) => {
  memoryToken = token || null;
  if (token) {
    try {
      sessionStorage.setItem('adm_token', token);
    } catch {
      // Ignore storage restrictions
    }
  } else {
    try {
      sessionStorage.removeItem('adm_token');
    } catch {
      // Ignore
    }
  }
};

export const getAuthToken = () => {
  if (memoryToken) return memoryToken;
  try {
    const stored = sessionStorage.getItem('adm_token');
    if (stored) {
      memoryToken = stored;
      return stored;
    }
  } catch {
    // Ignore
  }
  return null;
};

export const clearAuthToken = () => {
  setAuthToken(null);
};

// ── Request Dispatcher with Single 401 Refresh Handling ──
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message =
      errorBody?.error?.message ||
      errorBody?.message ||
      `HTTP ${response.status}: ${response.statusText}`;
    const err = new Error(message);
    err.status = response.status;
    err.code = errorBody?.error?.code || errorBody?.code;
    err.data = errorBody;
    throw err;
  }
  return response.json();
};

export const request = async (endpoint, options = {}, isRetry = false) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_V1_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // Support HttpOnly secure cookies if configured by backend
  };

  try {
    const res = await fetch(url, config);

    // 401 Unauthorized handling (excluding login/refresh endpoints)
    if (res.status === 401 && !isRetry && !url.includes('/auth/login') && !url.includes('/auth/refresh')) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(`${API_V1_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            const newToken = refreshData?.data?.token || refreshData?.token;
            if (newToken) {
              setAuthToken(newToken);
              isRefreshing = false;
              onRefreshed(newToken);
              return request(endpoint, options, true);
            }
          }
          // Refresh failed
          clearAuthToken();
          isRefreshing = false;
          window.dispatchEvent(new CustomEvent('auth:expired'));
        } catch {
          clearAuthToken();
          isRefreshing = false;
          window.dispatchEvent(new CustomEvent('auth:expired'));
        }
      } else {
        // Wait for active refresh
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((newToken) => {
            if (newToken) {
              resolve(request(endpoint, options, true));
            } else {
              reject(new Error('Session expired. Please log in again.'));
            }
          });
        });
      }
    }

    return handleResponse(res);
  } catch (err) {
    throw err;
  }
};

// ── Health & Diagnostics ──
export const getHealth = () =>
  fetch(`${BASE_URL}/api/health`, { credentials: 'include' }).then(handleResponse);

// ── Public Endpoints ──
export const getProjects = () => request('/projects');
export const getProjectById = (id) => request(`/projects/${id}`);
export const getProfile = () => request('/profile');
export const getSkills = () => request('/skills');
export const getStatus = () => request('/status');
export const getApiEndpoint = (key) => request(`/api-endpoints/${key}`);

// ── Authentication Endpoints ──
export const loginAdmin = async (email, password) => {
  const result = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const token = result?.data?.token || result?.token;
  if (token) {
    setAuthToken(token);
  }
  return result;
};

export const logoutAdmin = async () => {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch (err) {
    console.warn('Backend logout notice:', err.message);
  } finally {
    clearAuthToken();
  }
};

export const getMe = () => request('/auth/me');

export const refreshToken = () => request('/auth/refresh', { method: 'POST' });

// ── Admin Protected Endpoints ──
export const createProject = (data) =>
  request('/admin/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateProject = (id, data) =>
  request(`/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteProject = (id) =>
  request(`/admin/projects/${id}`, {
    method: 'DELETE',
  });

export const reorderProjects = (orderedIds) =>
  request('/admin/projects/reorder', {
    method: 'PATCH',
    body: JSON.stringify({ orderedIds, projectIds: orderedIds }),
  });

export const updateApiEndpoint = (key, data) =>
  request(`/admin/api-endpoints/${key}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const updateStatus = (data) => {
  const payload = typeof data === 'string' ? { mode: data } : data;
  return request('/admin/status', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const updateAdminProfile = (data) =>
  request('/admin/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const changePassword = (currentPassword, newPassword) =>
  request('/admin/profile/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
