import './LocationSection.css'

const WHATSAPP_PHONE = '5492616935851'

export function LocationSection() {
  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent('¡Hola Vivero Botánica! 🌿 Quiero hacerles una consulta sobre plantas y horarios.')
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank')
  }

  return (
    <section id="ubicacion" className="location-section">
      <div className="location-container">
        {/* Info Column */}
        <div className="location-info-col">
          <span className="section-eyebrow">Visítanos en el Vivero</span>
          <h2 className="location-title">Un rincón verde para elegir con tranquilidad</h2>
          <p className="location-desc">
            Ven a recorrer nuestros invernaderos, consultar sobre el estado de tus plantas o armar ramos florales de estación a tu gusto.
          </p>

          <div className="info-cards-stack">
            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="info-text">
                <strong>Dirección</strong>
                <span>Av. Emilio Civit 650, Mendoza, Argentina</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="info-text">
                <strong>Horarios de Atención</strong>
                <span>Lunes a Sábado: 09:30 a 19:30 hs</span>
                <span>Domingos: 10:00 a 14:00 hs</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="info-text">
                <strong>Consultas & WhatsApp</strong>
                <span>+54 9 261 693-5851 (Atención directa)</span>
              </div>
            </div>
          </div>

          <div className="location-actions">
            <button
              type="button"
              className="btn-whatsapp-location"
              onClick={handleOpenWhatsApp}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.13.17 1.76 2.69 4.28 3.77.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.59.2-1.09.14-1.19-.06-.1-.23-.17-.48-.29z" />
              </svg>
              <span>Escribir al 2616935851</span>
            </button>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-route-maps"
            >
              Cómo Llegar
            </a>
          </div>
        </div>

        {/* Map Column */}
        <div className="location-map-col">
          <div className="map-frame">
            <iframe
              title="Ubicación Vivero Botánica Mendoza"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13401.834469722425!2d-68.8633852!3d-32.8894587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091a134371cb%3A0x6b40e34c0e64f7b6!2sParque%20General%20San%20Mart%C3%ADn%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="map-live-status-pill">
              <span className="dot-open"></span>
              <span>Abierto • Atención al público</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
