import './Hero.css'

export function Hero({ onExploreClick }) {
  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('¡Hola Vivero Botánica! 🌿 Quiero consultarles sobre disponibilidad de plantas y asesoramiento.')
    window.open(`https://wa.me/5492616935851?text=${text}`, '_blank')
  }

  return (
    <section className="hero-section">
      {/* Background Visual Backdrop with Dark Botanical Contrast Overlay */}
      <div className="hero-bg-backdrop">
        <img
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=85"
          alt="Invernadero Vivero Botánica"
          className="hero-bg-img"
          loading="eager"
        />
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="hero-content">
        {/* Entrance Stage 1: Pill Badge */}
        <div className="hero-pill-badge anim-fade-up" style={{ '--delay': '80ms' }}>
          <span className="pill-dot"></span>
          <span>Vivero & Floristería de Autor • Mendoza</span>
        </div>

        {/* Entrance Stage 2: Main Headline */}
        <h1 className="hero-headline anim-fade-up" style={{ '--delay': '180ms' }}>
          Plantas con vida, flores de estación
          <span className="hero-gradient-text">y asesoramiento real para tu hogar.</span>
        </h1>

        {/* Entrance Stage 3: Subtitle */}
        <p className="hero-description anim-fade-up" style={{ '--delay': '280ms' }}>
          Seleccionamos y aclimatamos cada ejemplar para que crezca fuerte y sano.
          Te guiamos en luz, riego y sustrato para que tus plantas prosperen sin misterios.
        </p>

        {/* Entrance Stage 4: CTAs */}
        <div className="hero-ctas anim-fade-up" style={{ '--delay': '380ms' }}>
          <button
            type="button"
            className="btn-primary-botanical"
            onClick={onExploreClick}
          >
            Ver Catálogo Botánico
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <button
            type="button"
            className="btn-whatsapp-hero"
            onClick={handleWhatsAppDirect}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.13.17 1.76 2.69 4.28 3.77.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.59.2-1.09.14-1.19-.06-.1-.23-.17-.48-.29z" />
            </svg>
            <span>Consultar por WhatsApp</span>
          </button>
        </div>

        {/* Entrance Stage 5: Responsive Metrics Bar (neat single horizontal row) */}
        <div className="hero-metrics-row anim-fade-up" style={{ '--delay': '460ms' }}>
          <div className="hero-metric-item">
            <span className="metric-number">10+</span>
            <span className="metric-text">Especies<br className="mobile-break" /> Aclimatadas</span>
          </div>
          <div className="hero-metric-divider"></div>
          <div className="hero-metric-item">
            <span className="metric-number">100%</span>
            <span className="metric-text">Asesoramiento<br className="mobile-break" /> Personalizado</span>
          </div>
          <div className="hero-metric-divider"></div>
          <div className="hero-metric-item">
            <span className="metric-number">Directo</span>
            <span className="metric-text">Envíos en<br className="mobile-break" /> Gran Mendoza</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
