import { useState, useEffect } from 'react'

const STORAGE_KEY = 'vivero_tienda_productos_v6'

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Monstera Deliciosa',
    category: 'Interior',
    price: 38500,
    originalPrice: 46000,
    tag: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    description: 'Hojas icónicas fenestradas de intenso verde brillante. Purifica el ambiente y aporta frescura tropical a cualquier espacio.',
    light: 'Luz Indirecta',
    water: 'Cada 7-10 días',
    petFriendly: false,
    difficulty: 'Fácil',
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Ficus Lyrata (Árbol Lira)',
    category: 'Árboles & Grandes',
    price: 48000,
    originalPrice: 58000,
    tag: 'Destacado',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80',
    description: 'Elegante y escultural con hojas anchas en forma de violín. El favorito del diseño de interiores contemporáneo.',
    light: 'Mucho Brillo',
    water: 'Suelo semi-seco',
    petFriendly: false,
    difficulty: 'Intermedio',
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Ramo Silvestre de Peonías & Eucalipto',
    category: 'Flores & Ramos',
    price: 36000,
    originalPrice: null,
    tag: 'Fresco del Día',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    description: 'Composición floral artesanal con peonías rosadas, eucalipto perfumado y flores silvestres recolectadas en la mañana.',
    light: 'Lugar Fresco',
    water: 'Cambiar agua c/2 días',
    petFriendly: true,
    difficulty: 'Fácil',
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Calathea Orbifolia',
    category: 'Interior',
    price: 32000,
    originalPrice: null,
    tag: 'Pet-Friendly',
    image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=800&q=80',
    description: 'Hojas circulares gigantes con franjas plateadas metalizadas. 100% segura para convivir con perros y gatos.',
    light: 'Sombra / Luz Filtrada',
    water: 'Humedad constante',
    petFriendly: true,
    difficulty: 'Intermedio',
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Orquídea Phalaenopsis Imperial',
    category: 'Flores & Ramos',
    price: 46000,
    originalPrice: 52000,
    tag: 'Elegancia',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
    description: 'Floración de hasta 3 meses con pétalos blancos níveos aterciopelados y maceta de cerámica artesanal incluida.',
    light: 'Mucha Claridad',
    water: 'Inmersión semanal',
    petFriendly: true,
    difficulty: 'Fácil',
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Olivo Joven en Terracota',
    category: 'Árboles & Grandes',
    price: 59000,
    originalPrice: null,
    tag: 'Exterior',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
    description: 'Espíritu mediterráneo con hojas plateadas y tronco leñoso rústico. Excelente para balcones soleados y patios de Mendoza.',
    light: 'Sol Directo',
    water: 'Riego espaciado',
    petFriendly: true,
    difficulty: 'Fácil',
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Sansevieria Laurentii',
    category: 'Interior',
    price: 22000,
    originalPrice: null,
    tag: 'Indestructible',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    description: 'Robusta y casi indestructible. Tolera poca iluminación, riegos esporádicos y libera oxígeno purificado durante la noche.',
    light: 'Cualquier Luz',
    water: 'Cada 15-20 días',
    petFriendly: false,
    difficulty: 'Principiante',
    inStock: true
  },
  {
    id: 'prod-9',
    name: 'Philodendron Pink Princess',
    category: 'Interior',
    price: 62000,
    originalPrice: 74000,
    tag: 'Colección',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    description: 'Planta de colección con variegación rosada natural sobre hojas borgoña casi negras. Una joya botánica codiciada.',
    light: 'Luz Indirecta Alta',
    water: 'Sustrato aireado',
    petFriendly: false,
    difficulty: 'Coleccionista',
    inStock: true
  },
  {
    id: 'prod-24',
    name: 'Echeveria Elegans (Rosa de Alabastro)',
    category: 'Suculentas & Crasas',
    price: 8500,
    originalPrice: null,
    tag: 'Pet-Friendly',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80',
    description: 'Roseta perfecta de hojas carnosas verde azulado con pruina protectora. Resiste el sol directo y requiere poco riego.',
    light: 'Pleno Sol',
    water: 'Cada 15 días',
    petFriendly: true,
    difficulty: 'Principiante',
    inStock: true
  },
  {
    id: 'prod-28',
    name: 'Sustrato Premium Aireado 10L',
    category: 'Macetas & Cuidados',
    price: 9800,
    originalPrice: null,
    tag: 'Fórmula Propia',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    description: 'Mezcla maestra de corteza de pino compostada, perlita expandida, turba de musgo rubio y humus de lombriz mendocino.',
    light: 'Nutrición Viva',
    water: 'Excelente retención',
    petFriendly: true,
    difficulty: 'Universal',
    inStock: true
  }
]

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length >= 8) {
          // Ensure all items have inStock property
          return parsed.map((item) => ({
            ...item,
            inStock: item.inStock !== undefined ? item.inStock : true
          }))
        }
      }
    } catch (err) {
      console.error('Error reading products from localStorage:', err)
    }
    return INITIAL_PRODUCTS
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (err) {
      console.error('Error saving products to localStorage:', err)
    }
  }, [products])

  const addProduct = (newProduct) => {
    const itemWithId = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      price: parseFloat(newProduct.price) || 0,
      originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : null,
      tag: newProduct.tag?.trim() || null,
      light: newProduct.light || 'Luz Indirecta',
      water: newProduct.water || 'Semanal',
      petFriendly: Boolean(newProduct.petFriendly),
      difficulty: newProduct.difficulty || 'Fácil',
      inStock: newProduct.inStock !== undefined ? Boolean(newProduct.inStock) : true
    }
    setProducts((prev) => [itemWithId, ...prev])
    return itemWithId
  }

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id
          ? {
              ...item,
              ...updatedProduct,
              price: parseFloat(updatedProduct.price) || 0,
              originalPrice: updatedProduct.originalPrice ? parseFloat(updatedProduct.originalPrice) : null,
              petFriendly: Boolean(updatedProduct.petFriendly),
              inStock: updatedProduct.inStock !== undefined ? Boolean(updatedProduct.inStock) : true
            }
          : item
      )
    )
  }

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id))
  }

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS))
    } catch (err) {
      console.error('Error resetting products:', err)
    }
  }

  return {
    products,
    addProduct,
    updateProduct,
    toggleStock,
    deleteProduct,
    resetToDefaults
  }
}
