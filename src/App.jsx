import { useState, useEffect, useCallback } from 'react'
import { useProducts } from './hooks/useProducts'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCatalog from './components/ProductCatalog'
import PlantNews from './components/PlantNews'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import LocationSection from './components/LocationSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import OwnerLoginModal from './components/OwnerLoginModal'
import AdminModal from './components/AdminModal'
import './App.css'

const OWNER_SESSION_KEY = 'vivero_owner_authenticated_v2'

function App() {
  const {
    products,
    addProduct,
    updateProduct,
    toggleStock,
    deleteProduct,
    resetToDefaults
  } = useProducts()

  // Cart State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vivero_cart_items_v2')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Owner Authentication State
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(() => {
    return sessionStorage.getItem(OWNER_SESSION_KEY) === 'true'
  })
  const [isOwnerLoginModalOpen, setIsOwnerLoginModalOpen] = useState(false)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)

  // Toast Feedback
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('vivero_cart_items_v2', JSON.stringify(cartItems))
    } catch (e) {
      console.error('Error saving cart:', e)
    }
  }, [cartItems])

  const showToast = useCallback((msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3000)
  }, [])

  // Auto-logout after 30 minutes of inactivity for enhanced security
  useEffect(() => {
    if (!isOwnerAuthenticated) return

    let timer
    const resetInactivityTimer = () => {
      if (timer) clearTimeout(timer)
      // 15 minutes in milliseconds = 15 * 60 * 1000 = 900,000 ms
      timer = setTimeout(() => {
        setIsOwnerAuthenticated(false)
        sessionStorage.removeItem(OWNER_SESSION_KEY)
        setIsAdminModalOpen(false)
        showToast('🔒 Sesión de dueño cerrada por inactividad (15 min)')
      }, 15 * 60 * 1000)
    }

    resetInactivityTimer()

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
    activityEvents.forEach((evt) => window.addEventListener(evt, resetInactivityTimer))

    return () => {
      if (timer) clearTimeout(timer)
      activityEvents.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer))
    }
  }, [isOwnerAuthenticated, showToast])

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    showToast(`✓ "${product.name}" agregada a tu pedido`)
  }

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
    showToast('Bolsa vaciada')
  }

  // Owner Authentication Handlers
  const handleOwnerAuthenticated = () => {
    setIsOwnerAuthenticated(true)
    sessionStorage.setItem(OWNER_SESSION_KEY, 'true')
    showToast('✓ Sesión de Propietario iniciada')
    setIsAdminModalOpen(true)
  }

  const handleLogoutOwner = () => {
    setIsOwnerAuthenticated(false)
    sessionStorage.removeItem(OWNER_SESSION_KEY)
    setIsAdminModalOpen(false)
    setProductToEdit(null)
    showToast('Sesión cerrada')
  }

  // Product CRUD
  const handleAddProduct = (newProduct) => {
    const created = addProduct(newProduct)
    showToast(`✓ "${created.name}" guardada en el catálogo`)
  }

  const handleUpdateProduct = (updatedProduct) => {
    updateProduct(updatedProduct)
    showToast(`✓ "${updatedProduct.name}" actualizada con éxito`)
  }

  const handleToggleStock = (id) => {
    toggleStock(id)
    showToast('✓ Estado de stock actualizado')
  }

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
    showToast('✕ Publicación eliminada del catálogo')
  }

  const handleStartEditProduct = (product) => {
    setProductToEdit(product)
    setIsAdminModalOpen(true)
  }

  const handleResetDefaults = () => {
    resetToDefaults()
    showToast('↺ Catálogo restaurado con las 10 especies iniciales')
  }

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalCartAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="vivero-app">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOwnerAuth={() => setIsOwnerLoginModalOpen(true)}
        isOwnerAuthenticated={isOwnerAuthenticated}
        onLogoutOwner={handleLogoutOwner}
        onOpenAdmin={() => {
          setProductToEdit(null)
          setIsAdminModalOpen(true)
        }}
      />

      {/* Main Sections */}
      <main>
        <Hero onExploreClick={scrollToCatalog} />

        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
          isOwnerAuthenticated={isOwnerAuthenticated}
          onOpenAdmin={() => {
            setProductToEdit(null)
            setIsAdminModalOpen(true)
          }}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleStartEditProduct}
          onToggleStock={handleToggleStock}
        />

        {/* Live Auto-updating Plant News & Care Guide */}
        <PlantNews />

        <Gallery />
        <Reviews />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenOwnerAuth={() => setIsOwnerLoginModalOpen(true)}
        isOwnerAuthenticated={isOwnerAuthenticated}
        onOpenAdmin={() => {
          setProductToEdit(null)
          setIsAdminModalOpen(true)
        }}
      />

      {/* Cart Drawer (WhatsApp Checkout with Delivery Form) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Secure Owner Credential Login Modal */}
      <OwnerLoginModal
        isOpen={isOwnerLoginModalOpen}
        onClose={() => setIsOwnerLoginModalOpen(false)}
        onAuthenticated={handleOwnerAuthenticated}
      />

      {/* Owner Admin Modal */}
      <AdminModal
        key={productToEdit ? productToEdit.id : 'admin-modal'}
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false)
          setProductToEdit(null)
        }}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onToggleStock={handleToggleStock}
        onDeleteProduct={handleDeleteProduct}
        onResetDefaults={handleResetDefaults}
        initialProductToEdit={productToEdit}
      />


      {/* Mobile Sticky Order Bar (only when items in cart) */}
      {totalCartCount > 0 && (
        <div className="mobile-sticky-order-bar">
          <div className="sticky-info">
            <span className="sticky-count">
              {totalCartCount} {totalCartCount === 1 ? 'planta' : 'plantas'} en bolsa
            </span>
            <span className="sticky-total">${totalCartAmount.toLocaleString('es-AR')}</span>
          </div>
          <button
            type="button"
            className="sticky-order-btn"
            onClick={() => setIsCartOpen(true)}
          >
            <span>Pedir por WhatsApp</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.13.17 1.76 2.69 4.28 3.77.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.59.2-1.09.14-1.19-.06-.1-.23-.17-.48-.29z" />
            </svg>
          </button>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="vivero-toast-banner">
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default App
