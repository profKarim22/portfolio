import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="admin-loading-screen" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#04070f',
        color: '#94a3b8',
        fontFamily: 'monospace',
      }}>
        <div className="admin-spinner" style={{
          width: '42px',
          height: '42px',
          border: '3px solid rgba(56, 189, 248, 0.15)',
          borderTopColor: '#38bdf8',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '1.2rem',
        }} />
        <p style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
          VERIFYING AUTHORIZATION...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
