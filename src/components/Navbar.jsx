import { useState, useEffect } from 'react'
import './Navbar.css'

export function Navbar({
  cartCount = 0,
  onOpenCart,
  onOpenOwnerAuth,
  isOwnerAuthenticated,
  onLogoutOwner,
  onOpenAdmin
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Colección', href: '#catalogo' },
    { name: 'Noticias & Consejos', href: '#noticias' },
    { name: 'El Vivero', href: '#galeria' },
    { name: 'Opiniones', href: '#resenas' },
    { name: 'Ubicación', href: '#ubicacion' }
  ]

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`vivero-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* Top Banner if Owner is Logged In */}
      {isOwnerAuthenticated && (
        <div className="owner-top-banner">
          <span>Modo Administrador Activo (Dueño)</span>
          <div className="owner-top-actions">
            <button type="button" className="owner-top-btn" onClick={onOpenAdmin}>
              + Gestionar Catálogo
            </button>
            <button type="button" className="owner-logout-btn" onClick={onLogoutOwner}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-brand">
          <span className="brand-leaf-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
          </span>
          <div className="brand-titles">
            <span className="brand-name">VIVERO BOTÁNICA</span>
            <span className="brand-location">Mendoza • Cultivo de Autor</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Subtle Owner Key Icon */}
          <button
            type="button"
            className={`owner-access-btn ${isOwnerAuthenticated ? 'logged' : ''}`}
            onClick={isOwnerAuthenticated ? onOpenAdmin : onOpenOwnerAuth}
            title={isOwnerAuthenticated ? "Administrar catálogo" : "Acceso Dueño (PIN)"}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span className="owner-btn-label">{isOwnerAuthenticated ? 'Admin' : 'Dueño'}</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            type="button"
            className="cart-trigger-btn"
            onClick={onOpenCart}
            aria-label="Abrir bolsa de pedidos"
            title="Bolsa de pedidos"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge-pill">{cartCount}</span>}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú móvil"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}

          <div className="mobile-actions-wrapper">
            <button
              type="button"
              className="mobile-cart-action-btn"
              onClick={() => {
                setIsMobileMenuOpen(false)
                onOpenCart()
              }}
            >
              🛍️ Ver Bolsa de Pedidos ({cartCount})
            </button>

            <button
              type="button"
              className="mobile-owner-action-btn"
              onClick={() => {
                setIsMobileMenuOpen(false)
                if (isOwnerAuthenticated) {
                  onOpenAdmin()
                } else {
                  onOpenOwnerAuth()
                }
              }}
            >
              🔒 {isOwnerAuthenticated ? 'Panel Administrador (Dueño)' : 'Acceso Dueño con PIN'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
