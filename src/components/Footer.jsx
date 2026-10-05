import './Footer.css'

export function Footer({ onOpenOwnerAuth, isOwnerAuthenticated, onOpenAdmin }) {
  return (
    <footer className="vivero-footer">
      <div className="footer-container">
        {/* Footnote */}
        <div className="footer-disclaimer">
          <p>
            * Vivero Botánica Mendoza. Cultivo y aclimatación de plantas de interior, aromáticas, árboles y floristería de corte fresco. Consultas y pedidos directos al WhatsApp 2616935851.
          </p>
        </div>

        <div className="footer-divider"></div>

        {/* Columns */}
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Colección</h4>
            <ul>
              <li><a href="#catalogo">Plantas de Interior</a></li>
              <li><a href="#catalogo">Flores & Ramos Frescos</a></li>
              <li><a href="#catalogo">Árboles & Exterior</a></li>
              <li><a href="#catalogo">Macetas & Cerámica</a></li>
              <li><a href="#catalogo">Sustratos Especiales</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Guía & Noticias</h4>
            <ul>
              <li><a href="#noticias">Consejos de Temporada</a></li>
              <li><a href="#noticias">Plantas Pet-Friendly</a></li>
              <li><a href="#noticias">Riego en Clima Árido</a></li>
              <li><a href="#noticias">Propagación en Agua</a></li>
              <li><a href="#noticias">Cuidados de Orquídeas</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>El Vivero</h4>
            <ul>
              <li><a href="#galeria">Nuestros Invernaderos</a></li>
              <li><a href="#resenas">Opiniones de Clientes</a></li>
              <li><a href="#ubicacion">Horarios y Ubicación</a></li>
              <li><a href="https://wa.me/5492616935851" target="_blank" rel="noopener noreferrer">WhatsApp: 2616935851</a></li>
            </ul>
          </div>

          <div className="footer-col owner-col">
            <h4>Administración</h4>
            <p>Acceso seguro para el propietario del vivero para agregar o eliminar publicaciones del catálogo.</p>
            <button
              type="button"
              className="btn-footer-owner"
              onClick={isOwnerAuthenticated ? onOpenAdmin : onOpenOwnerAuth}
            >
              🔒 {isOwnerAuthenticated ? 'Abrir Panel de Control' : 'Acceso Propietario'}
            </button>

          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Vivero Botánica • Mendoza, Argentina. Todos los derechos reservados.
          </div>
          <div className="footer-legal-links">
            <a href="#ubicacion">Cómo Llegar</a>
            <a href="https://wa.me/5492616935851" target="_blank" rel="noopener noreferrer">Atención WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
