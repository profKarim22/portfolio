import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import defaultData from '../data/defaultProjects.json';

const PortfolioContext = createContext();

const STORAGE_KEY = 'karim_portfolio_data';
const PROJECTS_KEY = 'portfolio_projects';

const defaultProjects = defaultData.projects || [];

export const loadInitialProjects = () => {
  try {
    const savedProjects = localStorage.getItem(PROJECTS_KEY);
    const savedData = localStorage.getItem(STORAGE_KEY);

    let parsed = null;
    if (savedProjects) {
      parsed = JSON.parse(savedProjects);
    } else if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData?.projects)) {
        parsed = parsedData.projects;
      }
    }

    if (!parsed || !Array.isArray(parsed)) return defaultProjects;

    // Merge strategy: ensure all items from defaultProjects exist in state
    const savedIds = new Set(parsed.map((p) => p.id));
    const missingDefaults = defaultProjects.filter((p) => !savedIds.has(p.id));

    return [...missingDefaults, ...parsed];
  } catch (e) {
    console.warn("Error parsing saved projects, falling back to defaults", e);
    return defaultProjects;
  }
};

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(() => {
    const initialProjects = loadInitialProjects();
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Force profile, skills, projects, and status from defaults to prevent stale localStorage data
        return {
          ...defaultData,
          ...parsed,
          projects: initialProjects,
          apiEndpoints: {
            ...defaultData.apiEndpoints,
            ...(parsed.apiEndpoints || {}),
            profile: defaultData.apiEndpoints.profile,
            skills: defaultData.apiEndpoints.skills,
            projects: defaultData.apiEndpoints.projects,
            status: defaultData.apiEndpoints.status,
          },
          statusConfig: {
            ...defaultData.statusConfig,
            ...(parsed.statusConfig || {}),
            modes: {
              ...defaultData.statusConfig.modes,
              ...(parsed.statusConfig?.modes || {}),
            },
          },
        };
      }
    } catch (e) {
      console.warn('Failed to load saved portfolio data:', e);
    }
    return {
      ...defaultData,
      projects: initialProjects,
    };
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(portfolioData.projects));
    } catch (e) {
      console.warn('Failed to save portfolio data:', e);
    }
  }, [portfolioData]);

  // ── Project CRUD ──
  const updateProjects = useCallback((newProjects) => {
    setPortfolioData((prev) => ({ ...prev, projects: newProjects }));
  }, []);

  const addProject = useCallback((project) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: `project-${Date.now()}` }],
    }));
  }, []);

  const editProject = useCallback((projectId, updatedProject) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId ? { ...p, ...updatedProject } : p
      ),
    }));
  }, []);

  const deleteProject = useCallback((projectId) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId),
    }));
  }, []);

  const reorderProject = useCallback((index, direction) => {
    setPortfolioData((prev) => {
      const projects = [...prev.projects];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= projects.length) return prev;
      [projects[index], projects[newIndex]] = [projects[newIndex], projects[index]];
      return { ...prev, projects };
    });
  }, []);

  // ── API Endpoints ──
  const updateApiEndpoint = useCallback((key, data) => {
    setPortfolioData((prev) => ({
      ...prev,
      apiEndpoints: { ...prev.apiEndpoints, [key]: data },
    }));
  }, []);

  // ── Status ──
  const updateStatus = useCallback((mode) => {
    setPortfolioData((prev) => ({
      ...prev,
      statusConfig: { ...prev.statusConfig, mode },
    }));
  }, []);

  // ── Reset ──
  const resetToDefault = useCallback(() => {
    setPortfolioData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROJECTS_KEY);
  }, []);

  // ── Export ──
  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(portfolioData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [portfolioData]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updateProjects,
        addProject,
        editProject,
        deleteProject,
        reorderProject,
        updateApiEndpoint,
        updateStatus,
        resetToDefault,
        exportData,
        isAuthOpen,
        setIsAuthOpen,
        isAdminOpen,
        setIsAdminOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
