import { useState, useEffect } from 'react'
import DriftWall from './DriftWall'
import './Gallery.css'

// 15 Fotografías que pertenecen coherentemente a las instalaciones del mismo vivero/invernadero
const NURSERY_PHOTOS = [
  {
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=420&q=75',
    title: 'Nave Central del Invernadero'
  },
  {
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=420&q=75',
    title: 'Mesas de Esquejes & Brotes'
  },
  {
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=420&q=75',
    title: 'Pasillo de Follaje Tropical'
  },
  {
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=420&q=75',
    title: 'Rincón de Potus & Trepadoras'
  },
  {
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=420&q=75',
    title: 'Sector Húmedo de Helechos'
  },
  {
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=420&q=75',
    title: 'Bancales de Aclimatación'
  },
  {
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=420&q=75',
    title: 'Cúpula de Especies Gigantes'
  },
  {
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=420&q=75',
    title: 'Colección de Filodendros'
  },
  {
    image: 'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=420&q=75',
    title: 'Sector de Ficus & Aráceas'
  },
  {
    image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=420&q=75',
    title: 'Mesa de Calatheas & Marantas'
  },
  {
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=420&q=75',
    title: 'Banco de Preparación de Sustratos'
  },
  {
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=420&q=75',
    title: 'Taller de Cerámica & Macetas'
  },
  {
    image: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=420&q=75',
    title: 'Canopia Colgante del Vivero'
  },
  {
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=420&q=75',
    title: 'Pabellón Floral & Flores Frescas'
  },
  {
    image: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=420&q=75',
    title: 'Galería Vidriada al Atardecer'
  }
]

export function Gallery() {
  const [columns, setColumns] = useState(5)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 640) {
        setColumns(3)
        setIsMobile(true)
      } else if (w < 1024) {
        setColumns(4)
        setIsMobile(false)
      } else {
        setColumns(5)
        setIsMobile(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="galeria" className="gallery-section">
      <div className="gallery-header">
        <span className="section-eyebrow">Instalaciones & Recorrido Botánico</span>
        <h2 className="section-title">El Vivero en Perspectiva 3D</h2>
        <p className="section-subtitle">
          Un santuario botánico de 1.200 m² con invernaderos climatizados, mesas de esquejes y taller de sustratos. Desliza el cursor para explorar el mural interactivo.
        </p>

        {/* Ambient highlights */}
        <div className="gallery-badges-row">
          <span className="gallery-pill-tag">🌿 1.200 m² de Invernaderos</span>
          <span className="gallery-pill-tag">💧 Humedad Tropical Controlada</span>
          <span className="gallery-pill-tag">🪴 Paseo Abierto al Público</span>
        </div>
      </div>

      {/* DriftWall Interactive 3D Showcase (Panoramic & Borderless) */}
      <div className="drift-wall-container">
        <DriftWall
          items={NURSERY_PHOTOS}
          columns={columns}
          tileWidth={isMobile ? 175 : 260}
          tileHeight={isMobile ? 120 : 172}
          gap={isMobile ? 14 : 22}
          radius={18}
          tilt={14}
          turn={-12}
          perspective={1200}
          depth={110}
          speed={30}
          direction="up"
          variance={0.4}
          parallax={0.5}
          pauseOnHover={true}
          lift={54}
          dim={0.78}
          overlayColor="#123220"
        />
      </div>
    </section>
  )
}

export default Gallery
