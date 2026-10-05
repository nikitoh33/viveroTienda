import { useState } from 'react'
import confetti from 'canvas-confetti'
import './CartDrawer.css'

const WHATSAPP_PHONE = '5492616935851'

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [customerName, setCustomerName] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('retiro') // 'retiro' | 'envio'
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('transferencia')
  const [orderNote, setOrderNote] = useState('')
  const [formStep, setFormStep] = useState(1) // 1: Items, 2: Delivery & Customer Info

  if (!isOpen) return null

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#25d366', '#256a42', '#be693c', '#c89b3c']
      })
    } catch {
      // safe fallback
    }

    // Generate Clean Professional WhatsApp Message
    let msg = `🌿 *PEDIDO WEB - VIVERO BOTÁNICA MENDOZA*\n`
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    msg += `📋 *Detalle del Pedido (${totalItemsCount} plantas):*\n`

    cartItems.forEach((item) => {
      const itemSubtotal = (item.price * item.quantity).toLocaleString('es-AR')
      msg += `• ${item.quantity}x *${item.name}* — $${itemSubtotal}\n`
    })

    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    msg += `💰 *TOTAL ESTIMADO: $${subtotal.toLocaleString('es-AR')}*\n`
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    msg += `👤 *Datos para la Entrega:*\n`
    msg += `• *Cliente:* ${customerName.trim() || 'A confirmar por chat'}\n`
    msg += `• *Modalidad:* ${deliveryMethod === 'envio' ? '🚚 Envío a Domicilio' : '🪴 Retiro en Vivero (Civit 650)'}\n`

    if (deliveryMethod === 'envio' && address.trim()) {
      msg += `• *Dirección:* ${address.trim()}\n`
    }

    const payLabels = {
      transferencia: 'Transferencia Bancaria (Alias / CBU)',
      efectivo: 'Efectivo al recibir (-10% Promo)',
      tarjeta: 'Tarjeta de Débito / Crédito'
    }
    msg += `• *Pago Preferido:* ${payLabels[paymentMethod] || 'A convenir'}\n`

    if (orderNote.trim()) {
      msg += `• *Nota Especial:* ${orderNote.trim()}\n`
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    msg += `🌱 *¡Hola! Les envío mi pedido desde la web para confirmar disponibilidad.*`

    const encoded = encodeURIComponent(msg)
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`
    window.open(url, '_blank')
  }

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-wrapper">
            <h3>Bolsa de Pedidos</h3>
            <span className="cart-count-chip">{totalItemsCount} {totalItemsCount === 1 ? 'planta' : 'plantas'}</span>
          </div>
          <button type="button" className="close-cart-btn" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {/* Step Navigation Pill */}
        {cartItems.length > 0 && (
          <div className="cart-steps-nav">
            <button
              type="button"
              className={`step-btn ${formStep === 1 ? 'active' : ''}`}
              onClick={() => setFormStep(1)}
            >
              1. Plantas ({totalItemsCount})
            </button>
            <button
              type="button"
              className={`step-btn ${formStep === 2 ? 'active' : ''}`}
              onClick={() => setFormStep(2)}
            >
              2. Datos de Envío & WhatsApp
            </button>
          </div>
        )}

        {/* Content */}
        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-icon-leaf">🌿</div>
            <h4>Tu bolsa está vacía</h4>
            <p>Explora nuestras especies botánicas seleccionadas y arma tu rincón verde.</p>
            <button type="button" className="btn-continue-shopping" onClick={onClose}>
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className="cart-body-content">
            {/* Step 1: Items List */}
            {formStep === 1 && (
              <div className="cart-items-scroll">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />

                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <button
                          type="button"
                          className="btn-remove-item"
                          onClick={() => onRemoveItem(item.id)}
                          title="Eliminar planta"
                        >
                          ✕
                        </button>
                      </div>

                      <span className="cart-item-unit-price">${item.price.toLocaleString('es-AR')} c/u</span>

                      <div className="cart-item-bottom">
                        <div className="quantity-stepper">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <span className="cart-item-subtotal">
                          ${(item.price * item.quantity).toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Customer Details Form */}
            {formStep === 2 && (
              <div className="cart-form-container">
                <div className="form-info-notice">
                  ✨ Completa tus datos para que el mensaje de WhatsApp llegue listo con tu nombre y dirección.
                </div>

                <div className="form-group-item">
                  <label htmlFor="customer-name">Tu Nombre y Apellido</label>
                  <input
                    id="customer-name"
                    type="text"
                    placeholder="ej. Sofía Martínez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="form-group-item">
                  <label>Modalidad de Entrega</label>
                  <div className="delivery-radio-group">
                    <label className={`radio-pill ${deliveryMethod === 'retiro' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value="retiro"
                        checked={deliveryMethod === 'retiro'}
                        onChange={() => setDeliveryMethod('retiro')}
                      />
                      <span>🪴 Retiro en Vivero (Civit 650)</span>
                    </label>

                    <label className={`radio-pill ${deliveryMethod === 'envio' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value="envio"
                        checked={deliveryMethod === 'envio'}
                        onChange={() => setDeliveryMethod('envio')}
                      />
                      <span>🚚 Envío a Domicilio</span>
                    </label>
                  </div>
                </div>

                {deliveryMethod === 'envio' && (
                  <div className="form-group-item">
                    <label htmlFor="customer-address">Dirección y Localidad en Mendoza</label>
                    <input
                      id="customer-address"
                      type="text"
                      placeholder="ej. Belgrano 1230, Ciudad / Godoy Cruz"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group-item">
                  <label htmlFor="payment-method">Forma de Pago de tu Preferencia</label>
                  <select
                    id="payment-method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="transferencia">Transferencia Bancaria (Alias / CBU)</option>
                    <option value="efectivo">Efectivo al recibir (10% de descuento)</option>
                    <option value="tarjeta">Tarjeta de Débito / Crédito</option>
                  </select>
                </div>

                <div className="form-group-item">
                  <label htmlFor="order-note">Nota Opcional (dedicatoria, timbre, etc.)</label>
                  <input
                    id="order-note"
                    type="text"
                    placeholder="ej. Con tarjeta para regalo de cumpleaños"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-line">
              <span className="total-label">Total Estimado</span>
              <span className="total-amount">${subtotal.toLocaleString('es-AR')}</span>
            </div>

            {formStep === 1 ? (
              <button
                type="button"
                className="btn-next-step"
                onClick={() => setFormStep(2)}
              >
                Continuar a Datos de Entrega →
              </button>
            ) : (
              <button
                type="button"
                className="btn-whatsapp-checkout"
                onClick={handleWhatsAppCheckout}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.13.17 1.76 2.69 4.28 3.77.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.59.2-1.09.14-1.19-.06-.1-.23-.17-.48-.29z" />
                </svg>
                <span>Enviar Pedido por WhatsApp</span>
              </button>
            )}

            <div className="cart-footer-aux-actions">
              {formStep === 2 && (
                <button
                  type="button"
                  className="btn-back-step"
                  onClick={() => setFormStep(1)}
                >
                  ← Modificar Plantas
                </button>
              )}
              <button
                type="button"
                className="btn-clear-cart"
                onClick={onClearCart}
              >
                Vaciar bolsa
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
