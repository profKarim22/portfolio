import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaPlus, FaTrash, FaCheck, FaSpinner } from 'react-icons/fa';

export default function ProjectForm({ initialData, onSubmit, isLoading }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    title: '',
    badge: '',
    domain: '',
    domainColor: '#38bdf8',
    description: '',
    featured: false,
    isFeatured: false,
    github: '',
    liveDemo: '',
    figmaLink: '',
    metrics: [{ label: '', value: '' }],
    highlights: [''],
    tech: [],
  });

  const [techInput, setTechInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id || '',
        title: initialData.title || '',
        badge: initialData.badge || '',
        domain: initialData.domain || '',
        domainColor: initialData.domainColor || '#38bdf8',
        description: initialData.description || '',
        featured: Boolean(initialData.featured || initialData.isFeatured),
        isFeatured: Boolean(initialData.featured || initialData.isFeatured),
        github: initialData.github || initialData.githubUrl || '',
        liveDemo: initialData.liveDemo || initialData.liveUrl || '',
        figmaLink: initialData.figmaLink || initialData.figmaUrl || '',
        metrics:
          Array.isArray(initialData.metrics) && initialData.metrics.length > 0
            ? initialData.metrics.map((m) => ({ label: m.label || '', value: m.value || '' }))
            : [{ label: '', value: '' }],
        highlights:
          Array.isArray(initialData.highlights) && initialData.highlights.length > 0
            ? initialData.highlights
            : [''],
        tech: Array.isArray(initialData.tech)
          ? initialData.tech
          : Array.isArray(initialData.techStack)
          ? initialData.techStack
          : [],
      });
    }
  }, [initialData]);

  const updateField = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'featured') updated.isFeatured = value;
      if (field === 'isFeatured') updated.featured = value;
      return updated;
    });
  };

  // Metrics handlers
  const addMetric = () => {
    setForm((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '' }],
    }));
  };

  const updateMetric = (idx, field, val) => {
    setForm((prev) => {
      const metrics = [...prev.metrics];
      metrics[idx] = { ...metrics[idx], [field]: val };
      return { ...prev, metrics };
    });
  };

  const removeMetric = (idx) => {
    setForm((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== idx),
    }));
  };

  // Highlights handlers
  const addHighlight = () => {
    setForm((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }));
  };

  const updateHighlight = (idx, val) => {
    setForm((prev) => {
      const highlights = [...prev.highlights];
      highlights[idx] = val;
      return { ...prev, highlights };
    });
  };

  const removeHighlight = (idx) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx),
    }));
  };

  // Tech tags handlers
  const handleAddTech = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }

    const payload = {
      ...form,
      title: form.title.trim(),
      id:
        form.id.trim() ||
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      github: form.github.trim() || null,
      githubUrl: form.github.trim() || null,
      liveDemo: form.liveDemo.trim() || null,
      liveUrl: form.liveDemo.trim() || null,
      figmaLink: form.figmaLink.trim() || null,
      figmaUrl: form.figmaLink.trim() || null,
      metrics: form.metrics.filter((m) => m.label.trim() && m.value.trim()),
      highlights: form.highlights.filter((h) => h.trim()),
      tech: form.tech,
      techStack: form.tech,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {error && (
        <div className="login-error-banner" role="alert">
          {error}
        </div>
      )}

      {/* Section 1: Core Information */}
      <div className="admin-form-section">
        <div className="form-section-header">
          <h3>Core Identity & Presentation</h3>
          <p>Title, classification domain, and presentation labels</p>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label>Project Title *</label>
            <input
              type="text"
              className="form-input"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. Distributed Task Queue & Worker System"
              required
            />
          </div>

          <div className="form-group">
            <label>Custom Slug (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={form.id}
              onChange={(e) => updateField('id', e.target.value)}
              placeholder="e.g. distributed-task-queue"
            />
          </div>

          <div className="form-group">
            <label>Domain Area</label>
            <input
              type="text"
              className="form-input"
              value={form.domain}
              onChange={(e) => updateField('domain', e.target.value)}
              placeholder="e.g. Distributed Systems & Microservices"
            />
          </div>

          <div className="form-group">
            <label>Badge Label</label>
            <input
              type="text"
              className="form-input"
              value={form.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              placeholder="e.g. Production Architecture"
            />
          </div>

          <div className="form-group">
            <label>Domain Accent Color</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <input
                type="color"
                value={form.domainColor}
                onChange={(e) => updateField('domainColor', e.target.value)}
                style={{
                  width: '36px',
                  height: '36px',
                  border: 'none',
                  borderRadius: 'var(--adm-radius-sm)',
                  cursor: 'pointer',
                  background: 'transparent',
                }}
              />
              <input
                type="text"
                className="form-input"
                value={form.domainColor}
                onChange={(e) => updateField('domainColor', e.target.value)}
                placeholder="#38bdf8"
                style={{ flex: 1, fontFamily: 'var(--adm-font-mono)' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ justifyContent: 'center' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                marginTop: '1rem',
                color: 'var(--adm-text-primary)',
              }}
            >
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField('featured', e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--adm-accent)' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Feature on Public Homepage</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Project Description *</label>
          <textarea
            className="form-textarea"
            rows="4"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Comprehensive description of the architectural design, features, and engineering accomplishments..."
            required
          />
        </div>
      </div>

      {/* Section 2: External Links */}
      <div className="admin-form-section">
        <div className="form-section-header">
          <h3>External Links & Repositories</h3>
          <p>Repository and live deployment addresses for public viewers</p>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label>GitHub Repository URL</label>
            <input
              type="url"
              className="form-input"
              value={form.github}
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="form-group">
            <label>Live Demo URL</label>
            <input
              type="url"
              className="form-input"
              value={form.liveDemo}
              onChange={(e) => updateField('liveDemo', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Section 3: Performance Metrics */}
      <div className="admin-form-section">
        <div className="form-section-header">
          <h3>Key Quantitative Metrics</h3>
          <p>Engineering throughput, latency, or scale indicators</p>
        </div>

        <div className="form-metrics-container">
          {form.metrics.map((metric, idx) => (
            <div key={idx} className="metric-row-item">
              <input
                type="text"
                className="form-input metric-label-input"
                value={metric.label}
                onChange={(e) => updateMetric(idx, 'label', e.target.value)}
                placeholder="Metric Label (e.g. Throughput)"
              />
              <input
                type="text"
                className="form-input metric-value-input"
                style={{ fontFamily: 'var(--adm-font-mono)' }}
                value={metric.value}
                onChange={(e) => updateMetric(idx, 'value', e.target.value)}
                placeholder="Value (e.g. 5,000 Req/s)"
              />
              <button
                type="button"
                onClick={() => removeMetric(idx)}
                className="btn-table-action delete btn-metric-delete"
                title="Remove metric"
                aria-label="Remove metric"
                disabled={form.metrics.length <= 1}
                style={{ opacity: form.metrics.length <= 1 ? 0.3 : 1 }}
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addMetric}
            className="btn-secondary-action btn-add-field"
          >
            <FaPlus /> <span>Add Metric Field</span>
          </button>
        </div>
      </div>

      {/* Section 4: Highlights & Tech Stack */}
      <div className="admin-form-section">
        <div className="form-section-header">
          <h3>Technical Architecture & Highlights</h3>
          <p>Key architectural decisions, bullet highlights, and technology tags</p>
        </div>

        <div className="form-group">
          <label>Highlights List</label>
          <div className="form-highlights-container">
            {form.highlights.map((highlight, idx) => (
              <div key={idx} className="highlight-row-item">
                <input
                  type="text"
                  className="form-input highlight-input"
                  value={highlight}
                  onChange={(e) => updateHighlight(idx, e.target.value)}
                  placeholder="e.g. Real-time digital canvas rendering at locked 60 FPS"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(idx)}
                  className="btn-table-action delete btn-highlight-delete"
                  title="Remove highlight"
                  aria-label="Remove highlight"
                  disabled={form.highlights.length <= 1}
                  style={{ opacity: form.highlights.length <= 1 ? 0.3 : 1 }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="btn-secondary-action btn-add-field"
            >
              <FaPlus /> <span>Add Highlight</span>
            </button>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '0.75rem' }}>
          <label>Technologies Used</label>
          <div className="tech-input-group">
            <input
              type="text"
              className="form-input tech-text-input"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Type technology (e.g. TypeScript) and press Add"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTech(e);
                }
              }}
            />
            <button type="button" onClick={handleAddTech} className="btn-secondary-action btn-add-tag">
              <FaPlus /> <span>Add Tag</span>
            </button>
          </div>

          <div className="tech-tags-list">
            {form.tech.map((tag) => (
              <span key={tag} className="tech-tag-badge">
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTech(tag)}
                  className="btn-remove-tag"
                  aria-label={`Remove ${tag}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form Action Controls */}
      <div className="form-actions-bar">
        <button
          type="button"
          onClick={() => navigate('/admin/projects')}
          className="btn-secondary-action"
          disabled={isLoading}
        >
          <FaTimes /> <span>Cancel</span>
        </button>

        <button
          type="submit"
          className="btn-primary-action"
          disabled={isLoading}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {isLoading ? <FaSpinner className="spin-icon" /> : <FaSave />}
          <span>{isLoading ? 'Persisting to Database...' : 'Save Project Document'}</span>
        </button>
      </div>
    </form>
  );
}
