import { useState } from 'react'
import { sha256, sanitizeImageUrl, sanitizeInput } from '../utils/security'
import './AdminModal.css'

const PRESET_PHOTOS = [
  { label: 'Tropical Follaje', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Árbol Maceta', url: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ramo Silvestre', url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Orquídea', url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Suculenta', url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80' },
  { label: 'Olivo', url: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80' }
]

const PASS_STORAGE_KEY = 'vivero_admin_credentials_v1'

const EMPTY_FORM = {
  name: '',
  category: 'Interior',
  price: '',
  originalPrice: '',
  tag: '',
  image: '',
  description: '',
  light: 'Luz Indirecta',
  water: 'Cada 7-10 días',
  petFriendly: false,
  difficulty: 'Fácil',
  inStock: true
}

export function AdminModal({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onToggleStock,
  onDeleteProduct,
  onResetDefaults,
  initialProductToEdit
}) {
  const [activeTab, setActiveTab] = useState('add') // 'add' | 'manage' | 'security'
  const [editingId, setEditingId] = useState(() => (initialProductToEdit ? initialProductToEdit.id : null))
  const [formData, setFormData] = useState(() => {
    if (initialProductToEdit) {
      return {
        name: initialProductToEdit.name || '',
        category: initialProductToEdit.category || 'Interior',
        price: initialProductToEdit.price?.toString() || '',
        originalPrice: initialProductToEdit.originalPrice?.toString() || '',
        tag: initialProductToEdit.tag || '',
        image: initialProductToEdit.image || '',
        description: initialProductToEdit.description || '',
        light: initialProductToEdit.light || 'Luz Indirecta',
        water: initialProductToEdit.water || 'Cada 7-10 días',
        petFriendly: Boolean(initialProductToEdit.petFriendly),
        difficulty: initialProductToEdit.difficulty || 'Fácil',
        inStock: initialProductToEdit.inStock !== false
      }
    }
    return EMPTY_FORM
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [searchManage, setSearchManage] = useState('')

  // Password change state
  const [newPassword, setNewPassword] = useState('')
  const [passSuccess, setPassSuccess] = useState('')

  if (!isOpen) return null



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Local File Upload with FileReader (Base64)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('La imagen es muy pesada. Por favor selecciona una menor a 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: event.target.result
      }))
      setErrorMsg('')
    }
    reader.onerror = () => {
      setErrorMsg('Error al leer el archivo de tu dispositivo.')
    }
    reader.readAsDataURL(file)
  }

  const handleStartEdit = (product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name || '',
      category: product.category || 'Interior',
      price: product.price?.toString() || '',
      originalPrice: product.originalPrice?.toString() || '',
      tag: product.tag || '',
      image: product.image || '',
      description: product.description || '',
      light: product.light || 'Luz Indirecta',
      water: product.water || 'Cada 7-10 días',
      petFriendly: Boolean(product.petFriendly),
      difficulty: product.difficulty || 'Fácil',
      inStock: product.inStock !== false
    })
    setActiveTab('add')
    setErrorMsg('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setErrorMsg('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setErrorMsg('Por favor ingresa el nombre de la planta.')
      return
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setErrorMsg('Ingresa un precio válido mayor a 0.')
      return
    }

    const rawImage = formData.image.trim() || PRESET_PHOTOS[0].url
    const finalImage = sanitizeImageUrl(rawImage) || PRESET_PHOTOS[0].url

    const productPayload = {
      ...formData,
      name: sanitizeInput(formData.name),
      description: sanitizeInput(formData.description),
      tag: sanitizeInput(formData.tag),
      image: finalImage,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      inStock: Boolean(formData.inStock)
    }

    if (editingId) {
      if (onUpdateProduct) {
        onUpdateProduct({ ...productPayload, id: editingId })
      }
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setEditingId(null)
        setFormData(EMPTY_FORM)
        setActiveTab('manage')
      }, 1000)
    } else {
      onAddProduct(productPayload)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setFormData(EMPTY_FORM)
        setActiveTab('manage')
      }, 1000)
    }

    setErrorMsg('')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    try {
      const hashedPass = await sha256(newPassword)
      localStorage.setItem(PASS_STORAGE_KEY, hashedPass)
      setPassSuccess('✓ Contraseña maestra actualizada de forma segura (SHA-256).')
      setNewPassword('')
      setTimeout(() => setPassSuccess(''), 3000)
    } catch {
      setErrorMsg('No se pudo guardar la contraseña.')
    }
  }

  const filteredManageProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchManage.toLowerCase()) ||
    p.category.toLowerCase().includes(searchManage.toLowerCase())
  )

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="admin-dialog-header">
          <div className="admin-header-title">
            <span className="admin-badge">Panel del Propietario</span>
            <h2>Gestión de Catálogo & Seguridad</h2>
          </div>
          <button type="button" className="close-dialog-btn" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            {editingId ? '✏️ Editar Planta' : '+ Nueva Planta'}
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Publicaciones ({products.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Cambiar Clave
          </button>
        </div>

        {/* Tab 1: Add or Edit Plant Form */}
        {activeTab === 'add' && (
          <form className="admin-form" onSubmit={handleSubmit}>
            {errorMsg && <div className="form-error-banner">{errorMsg}</div>}
            {isSuccess && (
              <div className="form-success-banner">
                {editingId
                  ? '✓ ¡Publicación actualizada exitosamente!'
                  : '✓ ¡Planta agregada al catálogo exitosamente!'}
              </div>
            )}

            {editingId && (
              <div className="editing-banner-row">
                <span>Modificando especie existente: <strong>{formData.name}</strong></span>
                <button type="button" className="cancel-edit-btn" onClick={handleCancelEdit}>
                  ✕ Cancelar Edición
                </button>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="name">Nombre de la Especie *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="ej. Philodendron Gloriosum"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Interior">Plantas de Interior</option>
                  <option value="Flores & Ramos">Flores & Ramos</option>
                  <option value="Árboles & Grandes">Árboles & Grandes</option>
                  <option value="Suculentas & Crasas">Suculentas & Crasas</option>
                  <option value="Macetas & Cuidados">Macetas & Cuidados</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Precio Actual ($ ARS) *</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="1"
                  placeholder="ej. 35000"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="originalPrice">Precio Anterior / Tachado ($ ARS)</label>
                <input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  step="1"
                  placeholder="ej. 42000 (opcional)"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="light">Requerimiento Lumínico</label>
                <select
                  id="light"
                  name="light"
                  value={formData.light}
                  onChange={handleInputChange}
                >
                  <option value="Luz Indirecta">Luz Indirecta Brillante</option>
                  <option value="Mucho Brillo">Mucho Brillo / Claridad</option>
                  <option value="Pleno Sol">Pleno Sol Directo</option>
                  <option value="Sombra / Poca Luz">Sombra / Poca Luz</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="water">Frecuencia de Riego</label>
                <input
                  id="water"
                  name="water"
                  type="text"
                  placeholder="ej. Cada 7-10 días"
                  value={formData.water}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tag">Etiqueta Especial (Opcional)</label>
                <input
                  id="tag"
                  name="tag"
                  type="text"
                  placeholder="ej. Novedad, Destacado, 15% OFF"
                  value={formData.tag}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Nivel de Dificultad</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                >
                  <option value="Principiante">Principiante (Muy fácil)</option>
                  <option value="Fácil">Fácil</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Coleccionista">Coleccionista</option>
                </select>
              </div>

              <div className="form-group full-width stock-and-pet-row">
                <label className="checkbox-label-pet">
                  <input
                    type="checkbox"
                    name="petFriendly"
                    checked={formData.petFriendly}
                    onChange={handleInputChange}
                  />
                  <span>🐾 Especie Pet-Friendly (Inocua para perros y gatos)</span>
                </label>

                <label className="checkbox-label-pet">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                  />
                  <span>📦 Disponible En Stock para compra inmediata</span>
                </label>
              </div>

              {/* Image Upload & Presets */}
              <div className="form-group full-width">
                <label>Foto de la Planta (Sube desde tu dispositivo o usa enlace)</label>
                
                <div className="upload-options-box">
                  {/* Option 1: File input */}
                  <div className="file-input-wrapper">
                    <label htmlFor="local-file-upload" className="custom-file-upload-btn">
                      📁 Subir foto desde mi teléfono / PC
                    </label>
                    <input
                      id="local-file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden-file-input"
                    />
                    <span className="file-input-help">Formatos: JPG, PNG, WEBP (hasta 5MB)</span>
                  </div>

                  {/* Preview if image exists */}
                  {formData.image && (
                    <div className="image-preview-card">
                      <img src={formData.image} alt="Vista previa" className="admin-thumb-preview" />
                      <div className="image-preview-details">
                        <span className="image-preview-label">Imagen cargada ✓</span>
                        <button
                          type="button"
                          className="remove-img-btn"
                          onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                        >
                          Quitar foto
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Option 2: Direct URL */}
                  <div className="url-input-block">
                    <span className="url-or-label">o ingresa una URL web:</span>
                    <input
                      id="image"
                      name="image"
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="preset-photos-container">
                  <span className="preset-label">O elige una foto botánica de muestra (1-clic):</span>
                  <div className="presets-list">
                    {PRESET_PHOTOS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="preset-btn"
                        onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Descripción & Cuidados</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Describe la planta, su hábitat y consejos de aclimatación..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-actions">
              {editingId && (
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                  Cancelar
                </button>
              )}
              <button type="submit" className="submit-plant-btn">
                {editingId ? '✓ Guardar Cambios en la Especie' : '+ Guardar Especie en Catálogo'}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Manage Existing Plants */}
        {activeTab === 'manage' && (
          <div className="admin-manage-section">
            <div className="manage-header-info">
              <div className="manage-search-bar">
                <input
                  type="text"
                  placeholder="Buscar entre las publicaciones..."
                  value={searchManage}
                  onChange={(e) => setSearchManage(e.target.value)}
                  className="manage-search-input"
                />
              </div>
              <button
                type="button"
                className="reset-defaults-btn"
                onClick={() => {
                  if (window.confirm('¿Deseas restaurar el catálogo a las 10 especies iniciales recomendadas?')) {
                    onResetDefaults()
                  }
                }}
              >
                ↺ Restaurar 10 Especies de Fábrica
              </button>
            </div>

            <div className="items-list">
              {filteredManageProducts.map((item) => (
                <div key={item.id} className="manage-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="manage-item-thumb"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = PRESET_PHOTOS[0].url
                    }}
                  />
                  <div className="manage-item-info">
                    <h4>{item.name}</h4>
                    <span className="manage-item-cat">
                      {item.category} • ${item.price.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <div className="manage-actions-group">
                    {onToggleStock && (
                      <button
                        type="button"
                        className={`stock-badge-btn ${item.inStock !== false ? 'in-stock' : 'out-of-stock'}`}
                        onClick={() => onToggleStock(item.id)}
                        title="Cambiar estado de stock"
                      >
                        {item.inStock !== false ? '✓ En Stock' : '✕ Agotado'}
                      </button>
                    )}

                    <button
                      type="button"
                      className="edit-item-btn"
                      onClick={() => handleStartEdit(item)}
                      title="Editar información"
                    >
                      ✏️ Editar
                    </button>

                    <button
                      type="button"
                      className="delete-item-btn"
                      onClick={() => {
                        if (window.confirm(`¿Eliminar definitivamente "${item.name}"?`)) {
                          onDeleteProduct(item.id)
                        }
                      }}
                      title="Eliminar publicación"
                    >
                      ✕ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Security & Password Change */}
        {activeTab === 'security' && (
          <div className="admin-security-section">
            <h4>Seguridad de la Cuenta de Administrador</h4>
            <p className="security-desc">
              Puedes cambiar la contraseña maestra utilizada para ingresar al modo dueño.
            </p>

            {passSuccess && <div className="form-success-banner">{passSuccess}</div>}

            <form onSubmit={handlePasswordChange} className="password-change-form">
              <div className="form-group">
                <label htmlFor="new-pass">Nueva Contraseña Maestra (Mínimo 6 caracteres)</label>
                <input
                  id="new-pass"
                  type="password"
                  placeholder="Ingresa nueva contraseña segura..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-plant-btn">
                Actualizar Contraseña Maestra
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminModal
