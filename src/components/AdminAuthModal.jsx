import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import * as api from '../services/api';


export default function AdminAuthModal() {
  const { isAuthOpen, setIsAuthOpen, setIsAdminOpen } = usePortfolio();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | denied | granted | locked
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockTimer, setLockTimer] = useState(0);
  const inputRef = useRef(null);
  const lockIntervalRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isAuthOpen && inputRef.current && status !== 'locked') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAuthOpen, status]);

  // Lockout timer
  useEffect(() => {
    if (status === 'locked' && lockTimer > 0) {
      lockIntervalRef.current = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(lockIntervalRef.current);
            setStatus('idle');
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(lockIntervalRef.current);
    }
  }, [status, lockTimer]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isAuthOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isAuthOpen]);

  const handleClose = () => {
    setIsAuthOpen(false);
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'locked' || status === 'checking' || !email.trim() || !password.trim()) return;

    setStatus('checking');
    setErrorMessage('');

    try {
      await api.loginAdmin(email.trim(), password);
      
      setStatus('granted');
      setTimeout(() => {
        setIsAuthOpen(false);
        setIsAdminOpen(true);
        setPassword('');
        setErrorMessage('');
        setStatus('idle');
        setAttempts(0);
      }, 1500);
    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setErrorMessage(err.message || '401 UNAUTHORIZED');
      setStatus('denied');
      setPassword('');

      if (newAttempts >= 3) {
        setTimeout(() => {
          setStatus('locked');
          setLockTimer(10);
        }, 1200);
      } else {
        setTimeout(() => {
          setStatus('idle');
          inputRef.current?.focus();
        }, 1500);
      }
    }
  };

  if (!isAuthOpen) return null;

  return (
    <div className="admin-auth-overlay" onClick={handleClose}>
      <div
        className={`admin-auth-modal ${status === 'denied' ? 'shake' : ''} ${status === 'granted' ? 'success-flash' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal window header */}
        <div className="auth-terminal-header">
          <div className="auth-dots">
            <span className="auth-dot auth-dot-red" />
            <span className="auth-dot auth-dot-yellow" />
            <span className="auth-dot auth-dot-green" />
          </div>
          <span className="auth-header-title">root@karim-server ~ clearance</span>
          <button className="auth-close-btn" onClick={handleClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Terminal body */}
        <div className="auth-terminal-body">
          <div className="auth-ascii-header">
            <pre className="auth-ascii">{`╔══════════════════════════════════════════╗
║   // ROOT CLEARANCE VERIFICATION        ║
║   // ENCRYPTED CHANNEL ACTIVE           ║
╚══════════════════════════════════════════╝`}</pre>
          </div>

          <div className="auth-log-lines">
            <p className="auth-log"><span className="log-bracket">[SYS]</span> Secure channel established...</p>
            <p className="auth-log"><span className="log-bracket">[CRYPTO]</span> SHA-256 verification enabled</p>
            <p className="auth-log"><span className="log-bracket">[AUTH]</span> Awaiting administrator credentials</p>
          </div>

          {status === 'locked' ? (
            <div className="auth-lockout">
              <div className="lockout-icon">🔒</div>
              <p className="lockout-title">SECURITY LOCKOUT ACTIVE</p>
              <p className="lockout-msg">
                Too many failed attempts. System locked for{' '}
                <span className="lockout-timer">{lockTimer}s</span>
              </p>
              <div className="lockout-bar">
                <div
                  className="lockout-bar-fill"
                  style={{ width: `${(lockTimer / 10) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-label">
                <span className="auth-prompt">root@karim:~$ </span>
                admin_identity
              </label>
              <div className="auth-input-wrap mb-2">
                <span className="auth-input-prefix">@</span>
                <input
                  type="email"
                  className="auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin_email"
                  disabled={status === 'checking' || status === 'granted'}
                  autoComplete="email"
                  spellCheck="false"
                  required
                />
              </div>

              <label className="auth-label">
                <span className="auth-prompt">root@karim:~$ </span>
                enter_passkey
              </label>
              <div className="auth-input-wrap">
                <span className="auth-input-prefix">▶</span>
                <input
                  ref={inputRef}
                  type="password"
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={status === 'checking' || status === 'granted'}
                  autoComplete="current-password"
                  spellCheck="false"
                  required
                />
              </div>
              <button
                type="submit"
                className={`auth-submit ${status === 'checking' ? 'loading' : ''}`}
                disabled={status === 'checking' || status === 'granted' || !email.trim() || !password.trim()}
              >
                {status === 'checking' ? (
                  <><span className="auth-spinner" /> VERIFYING HASH...</>
                ) : (
                  '[ AUTHENTICATE ]'
                )}
              </button>
            </form>
          )}

          {/* Status messages */}
          {status === 'denied' && (
            <div className="auth-status auth-status-denied">
              <span className="status-icon">✖</span>
              ACCESS DENIED // {errorMessage || '401 UNAUTHORIZED'}
              <span className="attempt-count">Attempt {attempts}/3</span>
            </div>
          )}

          {status === 'granted' && (
            <div className="auth-status auth-status-granted">
              <span className="status-icon">✔</span>
              ACCESS GRANTED // WELCOME ARCHITECT ELASHIRY
            </div>
          )}

          <div className="auth-footer">
            <span className="auth-footer-text">
              🔐 SHA-256 Encrypted • {attempts > 0 ? `${3 - attempts} attempts remaining` : 'Secure Session'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
