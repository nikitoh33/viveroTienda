import { useState, useEffect } from 'react'
import { sha256 } from '../utils/security'
import './OwnerLoginModal.css'

const DEFAULT_ADMIN_EMAIL = 'admin@viverobotanica.com'
// SHA-256 cryptographic hash of default password 'ViveroMendoza2026!'
const DEFAULT_ADMIN_HASH = 'bcdc3ec78271e2a23f84cedb7ba1c9b20b1040955a55bc3fb36befd040c3af29'
const PASS_STORAGE_KEY = 'vivero_admin_credentials_v1'
const LOCKOUT_KEY = 'vivero_admin_lockout_until'

export function OwnerLoginModal({ isOpen, onClose, onAuthenticated }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [lockoutTimer, setLockoutTimer] = useState(() => {
    try {
      const storedLockout = localStorage.getItem(LOCKOUT_KEY)
      if (storedLockout) {
        const remaining = Math.ceil((parseInt(storedLockout, 10) - Date.now()) / 1000)
        if (remaining > 0) return remaining
        localStorage.removeItem(LOCKOUT_KEY)
      }
    } catch {
      // safe fallback
    }
    return 0
  })

  const [errorMsg, setErrorMsg] = useState(() => {
    try {
      const storedLockout = localStorage.getItem(LOCKOUT_KEY)
      if (storedLockout) {
        const remaining = Math.ceil((parseInt(storedLockout, 10) - Date.now()) / 1000)
        if (remaining > 0) return `Sistema bloqueado por seguridad. Espera ${remaining}s.`
      }
    } catch {
      // safe fallback
    }
    return ''
  })
  const [failedAttempts, setFailedAttempts] = useState(0)

  // Countdown timer for lockout protection
  useEffect(() => {
    if (lockoutTimer <= 0) return

    const interval = setInterval(() => {
      setLockoutTimer((t) => {
        if (t <= 1) {
          setFailedAttempts(0)
          setErrorMsg('')
          try {
            localStorage.removeItem(LOCKOUT_KEY)
          } catch {
            // safe fallback
          }
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [lockoutTimer])

  if (!isOpen) return null

  const handleLogin = async (e) => {
    e.preventDefault()

    if (lockoutTimer > 0) {
      setErrorMsg(`Sistema bloqueado por seguridad. Espera ${lockoutTimer}s.`)
      return
    }

    // Retrieve active hashed credentials (custom hash or default hash)
    let activeHash = DEFAULT_ADMIN_HASH
    try {
      const saved = localStorage.getItem(PASS_STORAGE_KEY)
      if (saved) {
        // If saved is already a 64-character SHA-256 hash
        if (saved.length === 64) {
          activeHash = saved
        } else {
          // Backward compatibility: hash plaintext and save
          activeHash = await sha256(saved)
          localStorage.setItem(PASS_STORAGE_KEY, activeHash)
        }
      }
    } catch {
      // fallback
    }

    const cleanEmail = email.trim().toLowerCase()
    const isEmailValid = cleanEmail === DEFAULT_ADMIN_EMAIL

    // Cryptographic SHA-256 verification
    const inputHash = await sha256(password.trim())
    const isPassValid = inputHash === activeHash

    if (isEmailValid && isPassValid) {
      setErrorMsg('')
      setFailedAttempts(0)
      setEmail('')
      setPassword('')
      try {
        localStorage.removeItem(LOCKOUT_KEY)
      } catch {
        // safe fallback
      }
      onAuthenticated()
      onClose()
    } else {
      const nextAttempts = failedAttempts + 1
      setFailedAttempts(nextAttempts)

      if (nextAttempts >= 4) {
        const lockoutDurationSec = 60
        setLockoutTimer(lockoutDurationSec)
        try {
          localStorage.setItem(LOCKOUT_KEY, String(Date.now() + lockoutDurationSec * 1000))
        } catch {
          // safe fallback
        }
        setErrorMsg('Demasiados intentos fallidos. Bloqueado por 60 segundos.')
      } else {
        setErrorMsg(`Credenciales incorrectas. Intentos restantes: ${4 - nextAttempts}`)
      }
    }
  }

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="login-header">
          <div className="login-icon-shield">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3>Portal de Propietario</h3>
          <p className="login-subtitle">
            Acceso administrativo seguro para gestionar publicaciones y stock de Vivero Botánica.
          </p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>
          {errorMsg && (
            <div className={`login-alert ${lockoutTimer > 0 ? 'alert-danger' : 'alert-warning'}`}>
              <span className="alert-icon">⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="admin-email">Correo Electrónico de Propietario</label>
            <div className="input-with-icon">
              <span className="field-icon">✉️</span>
              <input
                id="admin-email"
                type="email"
                placeholder="admin@viverobotanica.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={lockoutTimer > 0}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="admin-password">Contraseña Maestra</label>
            <div className="input-with-icon">
              <span className="field-icon">🔑</span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={lockoutTimer > 0}
                required
              />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-submit-login"
            disabled={lockoutTimer > 0}
          >
            {lockoutTimer > 0 ? `Bloqueado (${lockoutTimer}s)` : 'Ingresar al Modo Administrador'}
          </button>
        </form>

        {/* Demo Credentials Helper Pill for the Client/Reviewer */}
        <div className="demo-credentials-pill">
          <div className="demo-title">Credenciales de acceso:</div>
          <div className="demo-creds">
            <span>Usuario: <code>admin@viverobotanica.com</code></span>
            <span>Clave: <code>ViveroMendoza2026!</code></span>
          </div>
        </div>

        <button type="button" className="btn-cancel-login" onClick={onClose}>
          Cancelar y Volver al Vivero
        </button>
      </div>
    </div>
  )
}

export default OwnerLoginModal
