import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as api from "../services/api";
import defaultData from "../data/defaultProjects.json";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState({
    profile: null,
    projects: [],
    skills: null,
    statusConfig: { mode: "online" },
    apiEndpoints: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Fetch initial data from backend
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [profileData, projectsData, skillsData, statusData] =
        await Promise.all([
          api.getProfile().catch(() => defaultData.apiEndpoints.profile),
          api.getProjects().catch(() => defaultData.projects),
          api.getSkills().catch(() => defaultData.apiEndpoints.skills),
          api.getStatus().catch(() => defaultData.statusConfig),
        ]);

      setPortfolioData({
        profile: profileData?.data || profileData || null,
        projects: projectsData?.data || projectsData || [],
        skills: skillsData?.data || skillsData || null,
        statusConfig: statusData?.data || statusData || { mode: "online" },
        apiEndpoints: {}, // Will be fetched on demand by ApiTerminal
      });
      setError(null);
    } catch (err) {
      console.error("Failed to load portfolio data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ── Project Actions (Optimistic UI + API call) ──
  const updateProjects = useCallback((newProjects) => {
    setPortfolioData((prev) => ({ ...prev, projects: newProjects }));
  }, []);

  const addProject = useCallback(async (project) => {
    try {
      const result = await api.createProject(project);
      const newProject = result.data || result;
      setPortfolioData((prev) => ({
        ...prev,
        projects: [...prev.projects, newProject],
      }));
    } catch (err) {
      console.error("Failed to add project:", err);
      throw err;
    }
  }, []);

  const editProject = useCallback(async (projectId, updatedProject) => {
    try {
      const result = await api.updateProject(projectId, updatedProject);
      const savedProject = result.data || result;
      setPortfolioData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p._id === projectId || p.id === projectId ? savedProject : p,
        ),
      }));
    } catch (err) {
      console.error("Failed to update project:", err);
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (projectId) => {
    try {
      await api.deleteProject(projectId);
      setPortfolioData((prev) => ({
        ...prev,
        projects: prev.projects.filter(
          (p) => p._id !== projectId && p.id !== projectId,
        ),
      }));
    } catch (err) {
      console.error("Failed to delete project:", err);
      throw err;
    }
  }, []);

  const reorderProject = useCallback(async (index, direction) => {
    setPortfolioData((prev) => {
      const projects = [...prev.projects];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= projects.length) return prev;
      [projects[index], projects[newIndex]] = [
        projects[newIndex],
        projects[index],
      ];

      // Sync reorder to backend
      api
        .reorderProjects(projects.map((p) => p._id || p.id))
        .catch((err) => console.error("Failed to sync reorder", err));

      return { ...prev, projects };
    });
  }, []);

  // ── API Endpoints (Admin specific) ──
  const updateApiEndpoint = useCallback(async (key, data) => {
    try {
      await api.updateApiEndpoint(key, data);
      setPortfolioData((prev) => ({
        ...prev,
        apiEndpoints: { ...prev.apiEndpoints, [key]: data },
      }));
    } catch (err) {
      console.error("Failed to update api endpoint:", err);
      throw err;
    }
  }, []);

  // ── Status ──
  const updateStatus = useCallback(async (statusData) => {
    try {
      const result = await api.updateStatus(statusData);
      setPortfolioData((prev) => ({
        ...prev,
        statusConfig: result.data || result,
      }));
    } catch (err) {
      console.error("Failed to update status:", err);
      throw err;
    }
  }, []);

  // ── Reset/Export (Admin features) ──
  const resetToDefault = useCallback(() => {
    // With a real backend, reset might mean re-seeding the DB.
    // For now, just refetch from backend.
    fetchAllData();
  }, [fetchAllData]);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(portfolioData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [portfolioData]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        loading,
        error,
        refreshData: fetchAllData,
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
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
