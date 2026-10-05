import { useState, useMemo } from 'react'
import './PlantNews.css'

const BOTANICAL_ARTICLES = [
  {
    id: 'news-1',
    category: 'Temporada',
    title: 'Despertar de Primavera: Cuidados esenciales tras los meses fríos',
    subtitle: 'El momento clave para reactivar raíces, oxigenar follaje y preparar la brotación',
    summary: 'Aumenta gradualmente el riego y ubica tus plantas donde reciban luz brillante indirecta. Es el momento perfecto para incorporar nutrientes orgánicos y renovar la capa superficial del sustrato.',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    fullContent: 'Con la llegada de temperaturas más templadas, las plantas de interior reactivan su savia y comienzan a emitir brotes nuevos. Recomendamos revisar los orificios de drenaje por si asoman raíces (indicador de que precisan trasplante), limpiar el polvo acumulado en las hojas con agua tibia y comenzar una fertilización suave con humus líquido cada 20 días.',
    keyTip: 'Limpia cada hoja con un paño de microfibra humedecido con agua templada: aumentará la absorción de luz en un 30%.',
    sourceName: 'INTA Argentina',
    externalUrl: 'https://inta.gob.ar/noticias/recomendaciones-para-el-cuidado-de-plantas-en-primavera'
  },
  {
    id: 'news-2',
    category: 'Pet-Friendly',
    title: 'Plantas no tóxicas: Especies seguras para convivir con gatos y perros',
    subtitle: 'Botánica pensada para hogares con mascotas curiosas',
    summary: 'Calatheas, Marantas, Helechos de Boston, Pileas y Orquídeas. Llena tu casa de verde sin riesgos ni preocupaciones toxicológicas.',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    fullContent: 'Muchas especies populares (como el Potus, Dieffenbachia o Monstera) contienen cristales de oxalato de calcio que pueden irritar la mucosa de perros y gatos si las mastican. Si tienes mascotas curiosas, opta por la familia de las Marantáceas (Calathea Orbifolia, Maranta Leuconeura), Helecho Espada (Nephrolepis exaltata) o la Pilea Peperomioides, catalogadas como 100% inocuas según el centro toxicológico animal de la ASPCA.',
    keyTip: 'Ubica hierba gatera (Nepeta cataria) en un sector bajo accesible para distraer su atención de otras macetas.',
    sourceName: 'ASPCA Animal Poison Control',
    externalUrl: 'https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants'
  },
  {
    id: 'news-3',
    category: 'Riego & Clima Seco',
    title: 'El secreto del riego en climas áridos y días de viento Zonda',
    subtitle: 'Protocolo especial para el ambiente seco y la baja humedad de Cuyo',
    summary: 'Cómo evitar que las puntas de las hojas se quemen y cómo aplicar riego por capilaridad en Mendoza para preservar la humedad radicular.',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    fullContent: 'En Cuyo, la evaporación superficial engaña: la parte superior de la maceta parece seca pero el fondo puede retener agua, o por el contrario, el sustrato se contrae y el agua escurre por los laterales sin hidratar el cepellón. La técnica infalible es el riego por inmersión o capilaridad: sumerge la base de la maceta en una batea con agua durante 20 minutos, luego déjala escurrir por completo.',
    keyTip: 'En días de Zonda, agrupa tus plantas en el rincón más fresco y coloca platos con piedras húmedas debajo sin que el agua toque el orificio.',
    sourceName: 'Sociedad Argentina de Botánica',
    externalUrl: 'https://botanicaargentina.org.ar/'
  },
  {
    id: 'news-4',
    category: 'Flores & Ramos',
    title: 'Cómo hacer que tus Orquídeas vuelvan a florecer año tras año',
    subtitle: 'El disparador de la amplitud térmica y la lectura de raíces',
    summary: 'La clave biológica del descenso de temperatura nocturno, el riego por inmersión y la nutrición balanceada en corteza de pino.',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
    fullContent: 'La causa número 1 por la que una orquídea Phalaenopsis no genera nueva vara floral es la monotonía térmica: requiere un descenso de 4 a 6 grados por la noche durante 2 a 3 semanas para despertar los meristemas florales. Además, sólo debe regarse cuando las raíces internas transparentes pasen de verde esmeralda a gris plateado.',
    keyTip: 'Nunca uses tierra común: las orquídeas epífitas necesitan corteza de pino gruesa para que sus raíces respiren aire húmedo.',
    sourceName: 'RHS Royal Horticultural Society',
    externalUrl: 'https://www.rhs.org.uk/plants/orchids/growing-guide'
  },
  {
    id: 'news-5',
    category: 'Propagación',
    title: 'Guía simple para propagar esquejes en agua con éxito garantizado',
    subtitle: 'Multiplica tus monsteras, potus y ficus desde un simple nudo',
    summary: 'Aprende a cortar con precisión quirúrgica a 45 grados por debajo del nudo y evita pudriciones bacterianas con remedios botánicos naturales.',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    fullContent: 'Propagar es fascinante. Desinfecta siempre las tijeras con alcohol 70%, realiza un corte a 45 grados unos 2 cm debajo de un nudo foliar e introduce el tallo en agua fresca reposada en un frasco de vidrio cristalino. Añadir una pizca de canela en polvo actúa como fungicida natural orgánico para evitar pudriciones.',
    keyTip: 'Cambia el agua cada 4 o 5 días y trasplanta a sustrato recién cuando las raíces alcancen entre 4 y 6 centímetros.',
    sourceName: 'Kew Royal Botanic Gardens',
    externalUrl: 'https://www.kew.org/read-and-watch/how-to-take-plant-cuttings'
  },
  {
    id: 'news-6',
    category: 'Sustratos & Suelo',
    title: 'Sustratos Vivos: Por qué la microfauna y micorrizas salvan tus plantas',
    subtitle: 'El 80% de la vitalidad vegetal reside en la rizosfera subterránea',
    summary: 'Cómo hongos benéficos y lombricompuesto maduro triplican la absorción de nutrientes y protegen contra hongos patógenos.',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    fullContent: 'El sustrato inerte esterilizado químicamente deja a las plantas vulnerables a patógenos. La incorporación de humus de lombriz maduro y esporas de micorrizas crea una red simbiótica subterránea que transporta fósforo, hierro y agua directamente a las raíces a cambio de azúcares fotosintéticos.',
    keyTip: 'Un buen sustrato de interior debe incluir 30% perlita o corteza fina para que nunca se apelmace con los riegos.',
    sourceName: 'FAO - Suelos & Biodiversidad',
    externalUrl: 'https://www.fao.org/soils-portal/soil-biodiversity/es/'
  },
  {
    id: 'news-7',
    category: 'Temporada',
    title: 'Terrarios Cerrados: Mini-ecosistemas autosuficientes en cristal',
    subtitle: 'El ciclo hidrológico y de carbono perpetuo en escala doméstica',
    summary: 'Cómo diseñar capas de grava volcánica, carbón activado y musgos para crear un pulmón verde que no requiere riego por años.',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    fullContent: 'Los terrarios sellados recrean a escala el ciclo hidrológico de la Tierra: el agua se transpira por las hojas de fitonias y musgos, se condensa en las paredes de cristal frío y regresa al sustrato como lluvia limpia, manteniendo la vida por años sin necesidad de abrir la tapa.',
    keyTip: 'El carbón activado en el fondo es el filtro imprescindible que evita los malos olores y purifica el ciclo cerrado.',
    sourceName: 'National Geographic Botánica',
    externalUrl: 'https://www.nationalgeographic.com/environment/article/plants'
  }
]

const DAILY_TIPS = [
  'Limpia el polvo del follaje con un paño humedecido para que tus plantas respiren mejor.',
  'Introduce un palito de madera en el sustrato: si sale limpio y seco, es momento de regar.',
  'Rota tus macetas un cuarto de vuelta cada semana para que crezcan derechas y simétricas.',
  'Riega siempre a primera hora de la mañana para evitar evaporación excesiva o exceso de humedad nocturna.',
  'Si notas puntas marrones y quebradizas, reúne tus plantas en grupo: crearán su propio microclima húmedo.'
]

export function PlantNews() {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [activeArticleModal, setActiveArticleModal] = useState(null)
  const [featuredArticleId, setFeaturedArticleId] = useState('news-1')

  // Almanac & Seasonal Calculation
  const seasonalInfo = useMemo(() => {
    const now = new Date()
    const month = now.getMonth()
    const day = now.getDate()

    let season = 'Primavera'
    let message = 'Temporada ideal para brotación activa, trasplantes y esquejes'

    if (month >= 11 || month <= 1) {
      season = 'Verano'
      message = 'Proteger del sol directo del mediodía y elevar humedad ambiental'
    } else if (month >= 2 && month <= 4) {
      season = 'Otoño'
      message = 'Disminuir gradualmente el riego y preparar las raíces para el descanso'
    } else if (month >= 5 && month <= 7) {
      season = 'Invierno'
      message = 'Alejar de calefactores y corrientes frías; espaciar riegos'
    }

    const tipOfTheDay = DAILY_TIPS[day % DAILY_TIPS.length]

    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    return {
      season,
      message,
      monthName: monthNames[month],
      tipOfTheDay
    }
  }, [])

  const categories = [
    'Todas',
    'Temporada',
    'Pet-Friendly',
    'Riego & Clima Seco',
    'Flores & Ramos',
    'Propagación',
    'Sustratos & Suelo'
  ]

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'Todas') return BOTANICAL_ARTICLES
    return BOTANICAL_ARTICLES.filter((a) => a.category === selectedCategory)
  }, [selectedCategory])

  // Current featured article (default or user-selected from feed)
  const featuredArticle = useMemo(() => {
    return (
      BOTANICAL_ARTICLES.find((a) => a.id === featuredArticleId) ||
      filteredArticles[0] ||
      BOTANICAL_ARTICLES[0]
    )
  }, [featuredArticleId, filteredArticles])

  // Secondary articles (excluding the currently featured one when possible)
  const secondaryArticles = useMemo(() => {
    return filteredArticles.filter((a) => a.id !== featuredArticle.id)
  }, [filteredArticles, featuredArticle])

  return (
    <section id="noticias" className="journal-editorial-section">
      <div className="journal-container">
        {/* Editorial Masthead Header */}
        <div className="journal-masthead">
          <div className="masthead-badge">
            <span className="ink-dot"></span>
            <span>Edición Botánica • Mendoza</span>
          </div>
          <h2 className="journal-title">El Cuaderno de Cultivo</h2>
          <p className="journal-subtitle">
            Guía práctica, notas de campo y conocimientos respaldados por centros botánicos internacionales.
          </p>
        </div>

        {/* Almanac Field-Note Banner */}
        <div className="almanac-banner">
          <div className="almanac-left">
            <span className="almanac-stamp">ALMANAQUE {seasonalInfo.monthName.toUpperCase()}</span>
            <div className="almanac-season-tag">🌿 {seasonalInfo.season} • {seasonalInfo.message}</div>
          </div>
          <div className="almanac-divider"></div>
          <div className="almanac-right">
            <span className="almanac-label">RECOMENDACIÓN DEL DÍA:</span>
            <p className="almanac-tip">«{seasonalInfo.tipOfTheDay}»</p>
          </div>
        </div>

        {/* Category Filter Pills (Editorial Style) */}
        <div className="journal-filter-nav">
          <span className="filter-nav-label">Temáticas:</span>
          <div className="filter-nav-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`journal-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine Split Layout (Featured Cover Lead + Stacked Articles Feed) */}
        <div className="journal-magazine-layout">
          {/* Column Left: Featured Cover Story */}
          <article className="journal-lead-card">
            <div className="lead-media-wrapper">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="lead-cover-img"
                loading="lazy"
              />
              <div className="lead-tag-overlay">
                <span className="lead-cat-pill">{featuredArticle.category}</span>
                <span className="lead-source-pill">Fuente: {featuredArticle.sourceName}</span>
              </div>
            </div>

            <div className="lead-content-wrapper">
              <div className="lead-kicker">
                <span>LECTURA PRINCIPAL</span>
                <span className="read-time-dot">•</span>
                <span>{featuredArticle.readTime} de lectura</span>
              </div>

              <h3 className="lead-headline">{featuredArticle.title}</h3>
              {featuredArticle.subtitle && (
                <p className="lead-subhead">{featuredArticle.subtitle}</p>
              )}
              <p className="lead-excerpt">{featuredArticle.summary}</p>

              {/* Key Practical Tip Box */}
              {featuredArticle.keyTip && (
                <div className="lead-tip-callout">
                  <span className="tip-callout-icon">💡</span>
                  <div className="tip-callout-text">
                    <strong>Consejo de Campo:</strong> {featuredArticle.keyTip}
                  </div>
                </div>
              )}

              <div className="lead-actions-row">
                <button
                  type="button"
                  className="btn-read-full-lead"
                  onClick={() => setActiveArticleModal(featuredArticle)}
                >
                  <span>Leer Guía Completa</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <a
                  href={featuredArticle.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-external-authority"
                  title="Consultar artículo oficial en entidad botánica"
                >
                  <span>{featuredArticle.sourceName}</span>
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2.2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </article>

          {/* Column Right: Curated Editorial Feed */}
          <div className="journal-feed-column">
            <div className="feed-header-line">
              <span className="feed-section-title">Otras Crónicas & Guías ({secondaryArticles.length})</span>
              <span className="feed-switch-hint">Toca una nota para destacarla</span>
            </div>

            <div className="feed-list-stack">
              {secondaryArticles.length === 0 ? (
                <div className="feed-empty-state">
                  <span>🍃</span>
                  <p>Mostrando el único artículo disponible en esta categoría.</p>
                </div>
              ) : (
                secondaryArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="feed-article-row"
                    onClick={() => setFeaturedArticleId(article.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setFeaturedArticleId(article.id)
                    }}
                  >
                    <span className="feed-index-num">0{index + 2}</span>

                    <img
                      src={article.image}
                      alt={article.title}
                      className="feed-thumb-img"
                      loading="lazy"
                    />

                    <div className="feed-info-col">
                      <div className="feed-meta-chips">
                        <span className="feed-chip-cat">{article.category}</span>
                        <span className="feed-chip-time">{article.readTime}</span>
                      </div>

                      <h4 className="feed-article-title">{article.title}</h4>
                      <p className="feed-article-snippet">{article.summary}</p>

                      <div className="feed-card-footer">
                        <span className="feed-source-name">{article.sourceName}</span>
                        <button
                          type="button"
                          className="feed-quick-read-link"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveArticleModal(article)
                          }}
                        >
                          Leer nota →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reader Modal (Immersive Typography) */}
      {activeArticleModal && (
        <div className="article-modal-overlay" onClick={() => setActiveArticleModal(null)}>
          <div className="article-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="article-modal-header">
              <div className="modal-header-badges">
                <span className="news-category-badge">{activeArticleModal.category}</span>
                <span className="source-authority-badge">
                  Avalado por: {activeArticleModal.sourceName}
                </span>
              </div>
              <button
                type="button"
                className="close-article-btn"
                onClick={() => setActiveArticleModal(null)}
                aria-label="Cerrar artículo"
              >
                ✕
              </button>
            </div>

            <div className="article-modal-hero">
              <img src={activeArticleModal.image} alt={activeArticleModal.title} />
              <div className="modal-hero-title-box">
                <h2>{activeArticleModal.title}</h2>
                <span className="modal-reading-time">
                  Tiempo estimado: {activeArticleModal.readTime} • Publicación Botánica
                </span>
              </div>
            </div>

            <div className="article-modal-body">
              <div className="article-summary-lead">
                <p>{activeArticleModal.summary}</p>
              </div>

              {activeArticleModal.keyTip && (
                <div className="article-modal-tip-box">
                  <strong>💡 Consejo Clave del Vivero:</strong>
                  <p>{activeArticleModal.keyTip}</p>
                </div>
              )}

              <div className="article-full-text">
                <p>{activeArticleModal.fullContent}</p>
              </div>

              <div className="article-modal-footer">
                <div className="footer-citation">
                  <span>Investigación botánica avalada por <strong>{activeArticleModal.sourceName}</strong></span>
                </div>
                <div className="footer-links-group">
                  <a
                    href={activeArticleModal.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-external"
                  >
                    Abrir Publicación Oficial ↗
                  </a>
                  <button
                    type="button"
                    className="btn-modal-close-action"
                    onClick={() => setActiveArticleModal(null)}
                  >
                    Cerrar lectura
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PlantNews
