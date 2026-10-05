import './Reviews.css'

const REVIEWS = [
  {
    id: 1,
    author: 'Valentina Morales',
    role: 'Arquitecta de Interiores',
    rating: 5,
    date: 'Hace 3 días',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'Compré un Ficus Lyrata de gran porte para un proyecto de departamento en el centro. Llegó en perfecto estado, con hojas lustrosas y sanas. El asesoramiento botánico previo fue impecable.'
  },
  {
    id: 2,
    author: 'Santiago Della Rosa',
    role: 'Cliente Verificado',
    rating: 5,
    date: 'Hace 1 semana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'El vivero más hermoso y profesional que visité. Compré un ramo silvestre y una Monstera. Te explican exactamente el riego, el sustrato y cómo aclimatarla. Un 10 rotundo.'
  },
  {
    id: 3,
    author: 'Camila Benítez',
    role: 'Paisajista Urbana',
    rating: 5,
    date: 'Hace 2 semanas',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    comment: 'La calidad del sustrato y el enraizado de cada ejemplar es de nivel superior. Se nota el amor y la dedicación en cada planta que entregan.'
  }
]

export function Reviews() {
  return (
    <section id="resenas" className="reviews-section">
      <div className="reviews-header">
        <span className="section-eyebrow">Experiencias Reales</span>
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <div className="reviews-overall-score">
          <span className="stars">★★★★★</span>
          <span className="score-text">4.9 sobre 5 basado en más de 340 reseñas verificadas</span>
        </div>
      </div>

      <div className="reviews-carousel-wrapper">
        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <img src={review.avatar} alt={review.author} className="review-avatar" />
                <div className="review-author-info">
                  <h4>{review.author}</h4>
                  <span className="review-role">{review.role}</span>
                </div>
                <span className="review-date">{review.date}</span>
              </div>

              <div className="review-rating">
                {'★'.repeat(review.rating)}
              </div>

              <p className="review-text">“{review.comment}”</p>

              <div className="verified-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Compra Verificada</span>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-mobile-hint">
          <span>👈 Desliza para ver más opiniones 👉</span>
        </div>
      </div>
    </section>
  )
}

export default Reviews
