import { useState, useMemo } from 'react'
import './ProductCatalog.css'

const FALLBACK_PLANT_IMAGE =
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80'

export function ProductCatalog({
  products,
  onAddToCart,
  isOwnerAuthenticated,
  onOpenAdmin,
  onDeleteProduct,
  onEditProduct,
  onToggleStock
}) {
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [addedId, setAddedId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const categories = useMemo(() => {
    const set = new Set(['Todas'])
    products.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return Array.from(set)
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filter
    let list = products.filter((p) => {
      const matchesCat = activeCategory === 'Todas' || p.category === activeCategory
      const matchesSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCat && matchesSearch
    })

    // 2. Sort
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'pet') {
      list = [...list].sort((a, b) => (b.petFriendly ? 1 : 0) - (a.petFriendly ? 1 : 0))
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    }

    return list
  }, [products, activeCategory, searchTerm, sortBy])

  const handleAdd = (product) => {
    if (product.inStock === false) return
    setAddedId(product.id)
    if (onAddToCart) onAddToCart(product)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <section id="catalogo" className="catalog-section">
      <div className="catalog-header">
        <span className="section-eyebrow">Catálogo Botánico • Especies Seleccionadas</span>
        <h2 className="section-title">Colección Botánica & Flores</h2>
        <p className="section-subtitle">
          Todas nuestras plantas son aclimatadas a mano. Incluyen ficha con consejos de riego, nivel de luz y distintivo de seguridad para mascotas.
        </p>

        {/* Filters and Search Row */}
        <div className="catalog-filters-row">
          <div className="category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-and-sort-group">
            {/* Search Input */}
            <div className="catalog-search-box">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Buscar planta o flor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="catalog-sort-select"
              aria-label="Ordenar catálogo"
            >
              <option value="popular">Recomendados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="pet">🐾 Solo Pet-Friendly primero</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Status Bar */}
        <div className="catalog-status-bar">
          <span className="status-count">
            Mostrando <strong>{filteredAndSortedProducts.length}</strong> de <strong>{products.length}</strong> publicaciones activas
          </span>

          {/* Owner-Only Quick Actions */}
          {isOwnerAuthenticated ? (
            <div className="owner-status-actions">
              <button
                type="button"
                className="owner-admin-shortcut-btn"
                onClick={onOpenAdmin}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" fill="none" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Panel de Gestión (Dueño)</span>
              </button>
            </div>
          ) : (
            <span className="direct-whatsapp-note">
              📱 Envíos a todo Gran Mendoza • WhatsApp <strong>2616935851</strong>
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="empty-catalog">
          <span className="empty-icon">🪴</span>
          <h3>No encontramos especies con ese criterio</h3>
          <p>Prueba con otra categoría o término de búsqueda.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredAndSortedProducts.map((product) => {
            const isAdded = addedId === product.id
            const isOutOfStock = product.inStock === false

            return (
              <article
                key={product.id}
                className={`botanical-card ${isOutOfStock ? 'is-out-of-stock' : ''}`}
              >
                <div className="card-media">
                  {product.tag && (
                    <span className="card-tag-badge">{product.tag}</span>
                  )}

                  {product.petFriendly && (
                    <span className="pet-friendly-badge" title="No tóxica para perros y gatos">
                      🐾 Pet-Friendly
                    </span>
                  )}

                  {isOutOfStock && (
                    <span className="stock-pill-badge out-badge">
                      Agotado
                    </span>
                  )}

                  {/* Owner-Only Controls */}
                  {isOwnerAuthenticated && (
                    <div className="owner-card-overlay-actions">
                      {onToggleStock && (
                        <button
                          type="button"
                          className={`owner-mini-btn stock-toggle-btn ${isOutOfStock ? 'off' : 'on'}`}
                          onClick={() => onToggleStock(product.id)}
                          title={isOutOfStock ? 'Marcar En Stock' : 'Marcar Agotado'}
                        >
                          {isOutOfStock ? 'Sin Stock' : 'En Stock'}
                        </button>
                      )}

                      {onEditProduct && (
                        <button
                          type="button"
                          className="owner-mini-btn edit-btn"
                          onClick={() => onEditProduct(product)}
                          title="Editar información de la planta"
                        >
                          <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2.2">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </button>
                      )}

                      <button
                        type="button"
                        className="owner-mini-btn delete-btn"
                        onClick={() => {
                          if (window.confirm(`¿Eliminar definitivamente "${product.name}"?`)) {
                            onDeleteProduct(product.id)
                          }
                        }}
                        title="Eliminar publicación"
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2.2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = FALLBACK_PLANT_IMAGE
                    }}
                  />
                </div>

                <div className="card-content">
                  <div className="card-category-row">
                    <span className="card-category">{product.category}</span>
                    {product.difficulty && (
                      <span className="card-difficulty-pill">{product.difficulty}</span>
                    )}
                  </div>

                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>

                  {/* Care Info Chips */}
                  <div className="card-care-chips">
                    {product.light && (
                      <span className="care-chip" title="Requerimiento lumínico">
                        ☀️ {product.light}
                      </span>
                    )}
                    {product.water && (
                      <span className="care-chip" title="Frecuencia de riego">
                        💧 {product.water}
                      </span>
                    )}
                  </div>

                  <div className="card-footer">
                    <div className="price-block">
                      <span className="price-current">${product.price.toLocaleString('es-AR')}</span>
                      {product.originalPrice && (
                        <span className="price-old">${product.originalPrice.toLocaleString('es-AR')}</span>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={isOutOfStock}
                      className={`btn-add-cart ${isAdded ? 'added' : ''} ${isOutOfStock ? 'disabled-stock' : ''}`}
                      onClick={() => handleAdd(product)}
                    >
                      {isOutOfStock ? (
                        <span>Agotado</span>
                      ) : isAdded ? (
                        <>
                          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" fill="none" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>¡Agregada!</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" fill="none" strokeWidth="2.2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                          </svg>
                          <span>Agregar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ProductCatalog
