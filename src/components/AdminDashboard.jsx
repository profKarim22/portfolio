import React, { useState, useCallback, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/AdminDashboard.css';

// ============================================================================
// HELPER: Generates a blank project template
// ============================================================================
function emptyProject() {
  return {
    id: '',
    title: '',
    badge: '',
    isFeatured: false,
    domain: '',
    domainColor: '#38bdf8',
    metrics: [{ label: '', value: '' }],
    description: '',
    highlights: [''],
    tech: [],
    github: '',
    liveDemo: '',
    figmaLink: '',
  };
}

// ============================================================================
// SUB-COMPONENT: Project Editor Drawer
// ============================================================================
function ProjectEditor({ project, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    ...emptyProject(),
    ...project,
    liveDemo: project?.liveDemo || '',
    figmaLink: project?.figmaLink || '',
  }));
  const [techInput, setTechInput] = useState('');

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const addMetric = () => {
    setForm((prev) => ({
      ...prev,
      metrics: [...(prev.metrics || []), { label: '', value: '' }],
    }));
  };

  const updateMetric = (index, field, value) => {
    setForm((prev) => {
      const metrics = [...prev.metrics];
      metrics[index] = { ...metrics[index], [field]: value };
      return { ...prev, metrics };
    });
  };

  const removeMetric = (index) => {
    setForm((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  const addHighlight = () => {
    setForm((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }));
  };

  const updateHighlight = (index, value) => {
    setForm((prev) => {
      const highlights = [...prev.highlights];
      highlights[index] = value;
      return { ...prev, highlights };
    });
  };

  const removeHighlight = (index) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const addTech = (e) => {
    e.preventDefault();
    const tag = techInput.trim();
    if (tag && !form.tech.includes(tag)) {
      setForm((prev) => ({ ...prev, tech: [...prev.tech, tag] }));
      setTechInput('');
    }
  };

  const removeTech = (tag) => {
    setForm((prev) => ({ ...prev, tech: prev.tech.filter((t) => t !== tag) }));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({
      ...form,
      liveDemo: form.liveDemo || null,
      figmaLink: form.figmaLink || null,
      highlights: form.highlights.filter((h) => h.trim()),
      metrics: form.metrics.filter((m) => m.label.trim() || m.value.trim()),
    });
  };

  return (
    <div className="admin-editor-drawer">
      <div className="editor-header">
        <h3>{project?.id ? '✏️ Edit Project' : '➕ New Project'}</h3>
        <button className="editor-close" onClick={onCancel}>✕</button>
      </div>

      <div className="editor-body">
        <div className="editor-field">
          <label>Project Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="e.g. Distributed E-Commerce Microservices Engine"
          />
        </div>

        <div className="editor-row">
          <div className="editor-field">
            <label>Badge Label</label>
            <input
              type="text"
              value={form.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              placeholder="e.g. Featured Project"
            />
          </div>
          <div className="editor-field">
            <label>Domain</label>
            <input
              type="text"
              value={form.domain}
              onChange={(e) => updateField('domain', e.target.value)}
              placeholder="e.g. AI & Event Platform"
            />
          </div>
        </div>

        <div className="editor-row">
          <div className="editor-field">
            <label>Domain Color</label>
            <div className="color-input-wrap">
              <input
                type="color"
                value={form.domainColor}
                onChange={(e) => updateField('domainColor', e.target.value)}
              />
              <span className="color-hex">{form.domainColor}</span>
            </div>
          </div>
          <div className="editor-field editor-checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => updateField('isFeatured', e.target.checked)}
              />
              Featured Project ⭐
            </label>
          </div>
        </div>

        <div className="editor-field">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Describe the problem, solution, and architecture..."
            rows={4}
          />
        </div>

        {/* Metrics */}
        <div className="editor-field">
          <label>Performance Metrics</label>
          {form.metrics.map((m, i) => (
            <div className="editor-metric-row" key={i}>
              <input
                type="text"
                placeholder="Label (e.g. Throughput)"
                value={m.label}
                onChange={(e) => updateMetric(i, 'label', e.target.value)}
              />
              <input
                type="text"
                placeholder="Value (e.g. 850+ req/sec)"
                value={m.value}
                onChange={(e) => updateMetric(i, 'value', e.target.value)}
              />
              <button className="btn-remove-item" onClick={() => removeMetric(i)}>✕</button>
            </div>
          ))}
          <button className="btn-add-item" onClick={addMetric}>+ Add Metric</button>
        </div>

        {/* Highlights */}
        <div className="editor-field">
          <label>Key Highlights</label>
          {form.highlights.map((h, i) => (
            <div className="editor-highlight-row" key={i}>
              <input
                type="text"
                placeholder="Highlight feature..."
                value={h}
                onChange={(e) => updateHighlight(i, e.target.value)}
              />
              <button className="btn-remove-item" onClick={() => removeHighlight(i)}>✕</button>
            </div>
          ))}
          <button className="btn-add-item" onClick={addHighlight}>+ Add Highlight</button>
        </div>

        {/* Tech Tags */}
        <div className="editor-field">
          <label>Tech Stack</label>
          <div className="tech-tags-display">
            {form.tech.map((t) => (
              <span className="tech-tag-editor" key={t}>
                {t}
                <button onClick={() => removeTech(t)}>✕</button>
              </span>
            ))}
          </div>
          <form onSubmit={addTech} className="tech-input-row">
            <input
              type="text"
              placeholder="Type a technology & press Enter..."
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
            />
            <button type="submit" className="btn-add-item">Add</button>
          </form>
        </div>

        {/* Links */}
        <div className="editor-field">
          <label>GitHub URL *</label>
          <input
            type="url"
            value={form.github}
            onChange={(e) => updateField('github', e.target.value)}
            placeholder="https://github.com/profKarim22/..."
          />
        </div>

        <div className="editor-row">
          <div className="editor-field">
            <label>Live Demo URL</label>
            <input
              type="url"
              value={form.liveDemo || ''}
              onChange={(e) => updateField('liveDemo', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="editor-field">
            <label>Figma Link</label>
            <input
              type="url"
              value={form.figmaLink || ''}
              onChange={(e) => updateField('figmaLink', e.target.value)}
              placeholder="https://figma.com/..."
            />
          </div>
        </div>
      </div>

      <div className="editor-footer">
        <button className="btn-editor-cancel" onClick={onCancel}>Cancel</button>
        <button
          className="btn-editor-save"
          onClick={handleSave}
          disabled={!form.title.trim()}
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENT: JSON Endpoint Editor
// ============================================================================
function JsonEditor({ endpointKey, data, onSave }) {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(data ?? {}, null, 2));
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setJsonText(JSON.stringify(data ?? {}, null, 2));
    setError(null);
    setSaved(false);
  }, [data, endpointKey]);

  const handleChange = (value) => {
    setJsonText(value);
    setSaved(false);
    try {
      JSON.parse(value);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onSave(endpointKey, parsed);
      setError(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="json-editor-panel">
      <div className="json-editor-header">
        <span className="json-endpoint-label">GET /api/v1/{endpointKey}</span>
        <div className="json-editor-actions">
          {saved && <span className="json-saved-badge">✔ Saved</span>}
          <button
            className="btn-json-save"
            onClick={handleSave}
            disabled={!!error}
          >
            💾 Save
          </button>
        </div>
      </div>
      <textarea
        className={`json-textarea ${error ? 'json-error' : ''}`}
        value={jsonText}
        onChange={(e) => handleChange(e.target.value)}
        spellCheck="false"
      />
      {error && (
        <div className="json-error-msg">
          <span>⚠</span> Invalid JSON: {error}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: Admin Dashboard
// ============================================================================
export default function AdminDashboard() {
  const {
    portfolioData,
    isAdminOpen,
    setIsAdminOpen,
    addProject,
    editProject,
    deleteProject,
    reorderProject,
    updateApiEndpoint,
    updateStatus,
    resetToDefault,
    exportData,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState(null); // null | 'new' | project object
  const [activeEndpoint, setActiveEndpoint] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fallback to first available endpoint if activeEndpoint does not exist in apiEndpoints
  useEffect(() => {
    if (activeEndpoint && portfolioData?.apiEndpoints && !portfolioData.apiEndpoints[activeEndpoint]) {
      const keys = Object.keys(portfolioData.apiEndpoints);
      if (keys.length > 0) {
        setActiveEndpoint(keys[0]);
      }
    }
  }, [activeEndpoint, portfolioData?.apiEndpoints]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isAdminOpen) {
        if (editingProject) {
          setEditingProject(null);
        } else {
          setIsAdminOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isAdminOpen, editingProject, setIsAdminOpen]);

  // Lock body scroll when dashboard is open
  useEffect(() => {
    if (isAdminOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAdminOpen]);

  const handleSaveProject = useCallback(
    (projectData) => {
      if (editingProject === 'new') {
        addProject(projectData);
      } else {
        editProject(editingProject.id, projectData);
      }
      setEditingProject(null);
    },
    [editingProject, addProject, editProject]
  );

  const handleDeleteProject = useCallback(
    (projectId) => {
      deleteProject(projectId);
      setShowDeleteConfirm(null);
    },
    [deleteProject]
  );

  const handleResetAll = useCallback(() => {
    if (window.confirm('Reset all data to defaults? This cannot be undone.')) {
      resetToDefault();
    }
  }, [resetToDefault]);

  const handleLivePreview = useCallback(() => {
    setIsAdminOpen(false);
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [setIsAdminOpen]);

  if (!isAdminOpen) return null;

  const { projects, apiEndpoints, statusConfig } = portfolioData;
  const currentStatus = statusConfig?.modes?.[statusConfig.mode] || statusConfig?.modes?.available;

  const tabs = [
    { key: 'projects', label: 'Projects Manager', icon: '📁' },
    { key: 'api', label: 'API Terminal Data', icon: '⚡' },
    { key: 'status', label: 'System Status', icon: '🔧' },
  ];

  return (
    <div className="admin-dashboard-overlay">
      <div className="admin-dashboard">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <div className="admin-logo">
              <span className="admin-logo-icon">⬡</span>
              <span className="admin-logo-text">ADMIN HUD</span>
              <span className="admin-logo-version">v1.0</span>
            </div>
          </div>
          <div className="admin-topbar-right">
            <span className="admin-session-badge">
              <span className="admin-session-dot" />
              AUTHENTICATED SESSION
            </span>
            <button
              className="admin-close-btn"
              onClick={() => setIsAdminOpen(false)}
              aria-label="Close Dashboard"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="admin-content">
          {/* ── TAB 1: Projects Manager ── */}
          {activeTab === 'projects' && (
            <div className="admin-panel">
              {editingProject ? (
                <ProjectEditor
                  project={editingProject === 'new' ? null : editingProject}
                  onSave={handleSaveProject}
                  onCancel={() => setEditingProject(null)}
                />
              ) : (
                <>
                  <div className="panel-header">
                    <h2>📁 Projects Manager</h2>
                    <button
                      className="btn-add-project"
                      onClick={() => setEditingProject('new')}
                    >
                      + Add New Project
                    </button>
                  </div>
                  <div className="projects-list">
                    {projects.map((project, index) => (
                      <div className="admin-project-card" key={project.id}>
                        <div className="apc-left">
                          <div className="apc-reorder">
                            <button
                              className="btn-reorder"
                              disabled={index === 0}
                              onClick={() => reorderProject(index, -1)}
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              className="btn-reorder"
                              disabled={index === projects.length - 1}
                              onClick={() => reorderProject(index, 1)}
                              title="Move Down"
                            >
                              ▼
                            </button>
                          </div>
                          <div className="apc-info">
                            <h4 className="apc-title">
                              {project.isFeatured && <span className="apc-star">⭐</span>}
                              {project.title}
                            </h4>
                            <div className="apc-meta">
                              <span
                                className="apc-domain-dot"
                                style={{ background: project.domainColor }}
                              />
                              <span className="apc-domain">{project.domain}</span>
                              <span className="apc-badge">{project.badge}</span>
                              {project.metrics?.map((m, i) => (
                                <span className="apc-metric" key={i}>
                                  {m.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="apc-actions">
                          <button
                            className="btn-edit"
                            onClick={() => setEditingProject(project)}
                          >
                            ✏️ Edit
                          </button>
                          {showDeleteConfirm === project.id ? (
                            <div className="delete-confirm">
                              <span>Delete?</span>
                              <button
                                className="btn-confirm-yes"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                Yes
                              </button>
                              <button
                                className="btn-confirm-no"
                                onClick={() => setShowDeleteConfirm(null)}
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn-delete"
                              onClick={() => setShowDeleteConfirm(project.id)}
                            >
                              🗑️ Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <div className="empty-state">
                        <p>No projects yet. Click "Add New Project" to get started.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── TAB 2: API Terminal Data ── */}
          {activeTab === 'api' && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>⚡ REST API Simulator Editor</h2>
              </div>
              <div className="api-editor-layout">
                <div className="api-endpoint-tabs">
                  {Object.keys(apiEndpoints).map((key) => (
                    <button
                      key={key}
                      className={`api-ep-tab ${activeEndpoint === key ? 'active' : ''}`}
                      onClick={() => setActiveEndpoint(key)}
                    >
                      <span className="ep-method">GET</span>
                      <span className="ep-path">/{key}</span>
                    </button>
                  ))}
                </div>
                <JsonEditor
                  endpointKey={activeEndpoint}
                  data={apiEndpoints[activeEndpoint]}
                  onSave={updateApiEndpoint}
                />
              </div>
            </div>
          )}

          {/* ── TAB 3: System Status ── */}
          {activeTab === 'status' && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>🔧 System Status & Availability</h2>
              </div>
              <div className="status-toggles">
                {Object.entries(statusConfig.modes).map(([key, cfg]) => (
                  <button
                    key={key}
                    className={`status-toggle-card ${statusConfig.mode === key ? 'active' : ''}`}
                    onClick={() => updateStatus(key)}
                    style={{
                      '--status-color': cfg.color,
                      '--status-border': cfg.borderColor,
                      '--status-bg': cfg.bgColor,
                    }}
                  >
                    <div className="stc-dot-wrap">
                      <span
                        className="stc-dot"
                        style={{ background: cfg.color }}
                      />
                    </div>
                    <div className="stc-info">
                      <span className="stc-label">{cfg.label}</span>
                      <span className="stc-key">{key.toUpperCase()}</span>
                    </div>
                    {statusConfig.mode === key && (
                      <span className="stc-active-badge">ACTIVE</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="status-preview">
                <p className="status-preview-label">Navbar Preview:</p>
                <div
                  className="status-preview-badge"
                  style={{
                    borderColor: currentStatus?.borderColor,
                    background: currentStatus?.bgColor,
                  }}
                >
                  <span
                    className="status-preview-dot"
                    style={{ background: currentStatus?.color }}
                  />
                  <span
                    className="status-preview-text"
                    style={{ color: currentStatus?.color }}
                  >
                    {currentStatus?.label}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <footer className="admin-action-bar">
          <div className="action-bar-left">
            <button className="btn-action btn-preview" onClick={handleLivePreview}>
              👁️ Live Preview
            </button>
            <button className="btn-action btn-export" onClick={exportData}>
              📥 Export JSON
            </button>
          </div>
          <div className="action-bar-right">
            <button className="btn-action btn-reset" onClick={handleResetAll}>
              🔄 Reset All
            </button>
            <button
              className="btn-action btn-close-dashboard"
              onClick={() => setIsAdminOpen(false)}
            >
              ✕ Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
