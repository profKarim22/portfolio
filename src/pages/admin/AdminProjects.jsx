import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaExternalLinkAlt,
  FaGithub,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaSpinner,
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { useToast } from '../../components/admin/AdminLayout';
import * as api from '../../services/api';

export default function AdminProjects() {
  const { portfolioData, refreshData, deleteProject } = usePortfolio();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, featured, standard
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const projects = portfolioData?.projects || [];

  const filteredProjects = projects.filter((project) => {
    // Search query filter
    const q = searchQuery.toLowerCase();
    const titleMatch = (project.title || '').toLowerCase().includes(q);
    const domainMatch = (project.domain || '').toLowerCase().includes(q);
    const techMatch = (project.tech || []).some((t) => t.toLowerCase().includes(q));
    const matchesSearch = titleMatch || domainMatch || techMatch;

    // Category filter
    const isFeatured = project.featured || project.isFeatured;
    if (activeFilter === 'featured') return matchesSearch && isFeatured;
    if (activeFilter === 'standard') return matchesSearch && !isFeatured;
    return matchesSearch;
  });

  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;
    setIsDeleting(true);
    try {
      const idToDelete = deleteCandidate._id || deleteCandidate.id;
      await deleteProject(idToDelete);
      showToast(`Project "${deleteCandidate.title}" removed permanently.`);
      setDeleteCandidate(null);
      await refreshData();
    } catch (err) {
      showToast(err.message || 'Failed to delete project.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setIsReordering(true);
    try {
      const orderedIds = reordered.map((p) => p.id || p._id);
      await api.reorderProjects(orderedIds);
      await refreshData();
      showToast('Project display order updated.');
    } catch (err) {
      showToast(err.message || 'Failed to reorder projects.', 'error');
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-heading">Projects Inventory</h2>
          <p className="admin-subheading">
            Manage, publish, edit, and reorder public portfolio projects in MongoDB.
          </p>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/projects/new" className="btn-primary-action">
            <FaPlus /> <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="search-input-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, domain, or technology..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 'none', color: 'var(--adm-text-muted)', cursor: 'pointer' }}
              aria-label="Clear Search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="filter-pills-group">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`filter-pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
          >
            All ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('featured')}
            className={`filter-pill-btn ${activeFilter === 'featured' ? 'active' : ''}`}
          >
            Featured ({projects.filter((p) => p.featured || p.isFeatured).length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('standard')}
            className={`filter-pill-btn ${activeFilter === 'standard' ? 'active' : ''}`}
          >
            Standard ({projects.filter((p) => !p.featured && !p.isFeatured).length})
          </button>
        </div>
      </div>

      {/* Projects CMS Table */}
      <div className="admin-card no-padding">
        {filteredProjects.length === 0 ? (
          <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', color: 'var(--adm-text-secondary)' }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>No projects match your current criteria.</p>
            <Link to="/admin/projects/new" className="btn-primary-action">
              <FaPlus /> <span>Create New Project</span>
            </Link>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Order</th>
                  <th>Project Details</th>
                  <th>Domain</th>
                  <th>Stack Preview</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, idx) => {
                  const projectId = project._id || project.id;
                  const isFeatured = project.featured || project.isFeatured;
                  return (
                    <tr key={projectId}>
                      {/* Reorder controls */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, -1)}
                            disabled={idx === 0 || isReordering}
                            className="btn-table-action"
                            title="Move Up"
                            style={{ opacity: idx === 0 ? 0.3 : 1 }}
                          >
                            <FaArrowUp style={{ fontSize: '0.65rem' }} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 1)}
                            disabled={idx === filteredProjects.length - 1 || isReordering}
                            className="btn-table-action"
                            title="Move Down"
                            style={{ opacity: idx === filteredProjects.length - 1 ? 0.3 : 1 }}
                          >
                            <FaArrowDown style={{ fontSize: '0.65rem' }} />
                          </button>
                        </div>
                      </td>

                      {/* Project Title & Badge */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--adm-text-primary)' }}>
                            {project.title}
                          </span>
                          {project.badge && (
                            <span style={{ fontSize: '0.72rem', color: 'var(--adm-text-muted)', fontFamily: 'var(--adm-font-mono)' }}>
                              {project.badge}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Domain Tag */}
                      <td>
                        <span
                          className="domain-pill"
                          style={{
                            borderColor: project.domainColor || 'var(--adm-border-subtle)',
                            color: project.domainColor || 'var(--adm-text-secondary)',
                          }}
                        >
                          {project.domain || 'Engineering'}
                        </span>
                      </td>

                      {/* Tech Chips */}
                      <td>
                        <div style={{ maxWidth: '300px', display: 'flex', flexWrap: 'wrap' }}>
                          {(project.tech || []).slice(0, 3).map((t, tIdx) => (
                            <span key={tIdx} className="tech-tag-chip">
                              {t}
                            </span>
                          ))}
                          {(project.tech || []).length > 3 && (
                            <span className="tech-tag-chip" style={{ color: 'var(--adm-text-dim)' }}>
                              +{(project.tech || []).length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Featured Status */}
                      <td>
                        {isFeatured ? (
                          <span className="badge-featured">
                            <FaCheck style={{ fontSize: '0.6rem' }} /> Featured
                          </span>
                        ) : (
                          <span className="badge-standard">Standard</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-table-action"
                              title="View GitHub Repository"
                            >
                              <FaGithub />
                            </a>
                          )}

                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-table-action"
                              title="View Live Demo"
                            >
                              <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} />
                            </a>
                          )}

                          <Link
                            to={`/admin/projects/${projectId}/edit`}
                            className="btn-table-action"
                            title="Edit Project"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(project)}
                            className="btn-table-action delete"
                            title="Delete Project"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal Dialog */}
      {deleteCandidate && (
        <div className="admin-modal-overlay">
          <div className="admin-confirm-dialog">
            <div className="dialog-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--adm-danger)', marginBottom: '0.5rem' }}>
                <FaExclamationTriangle />
                <span style={{ fontFamily: 'var(--adm-font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>
                  PERMANENT DELETION
                </span>
              </div>
              <h3>Delete Project Document?</h3>
              <p>
                This will permanently delete{' '}
                <strong style={{ color: 'var(--adm-text-primary)' }}>{deleteCandidate.title}</strong> from
                MongoDB. This action cannot be undone.
              </p>
            </div>

            <div className="dialog-actions">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="btn-secondary-action"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="btn-danger-action"
                disabled={isDeleting}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                {isDeleting ? <FaSpinner className="spin-icon" /> : <FaTrash />}
                <span>{isDeleting ? 'Deleting...' : 'Delete Permanently'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
