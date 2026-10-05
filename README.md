# 🌿 Vivero Botánica • Tienda & Catálogo de Autor (Mendoza 2026)

Bienvenido al repositorio de **Vivero Botánica**, una aplicación web moderna, interactiva y de alto rendimiento diseñada para una tienda botánica y vivero boutique en Mendoza, Argentina. El proyecto combina una experiencia visual inmersiva con arquitectura limpia en React, catálogo de especies aclimatadas, carrito de compras conectado a WhatsApp, galería tridimensional interactiva y un completo panel de administración protegido criptográficamente.

---

## 📋 Tabla de Contenidos

1. [Visión General](#-visión-general)
2. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
3. [Identidad Visual & Paleta Botánica](#-identidad-visual--paleta-botánica)
4. [Módulos y Características](#-módulos-y-características)
   - [Catálogo Curado (10 Especies en ARS 2026)](#1-catálogo-curado-10-especies)
   - [Galería Panorámica 3D DriftWall](#2-galería-panorámica-3d-driftwall)
   - [Revista Botánica "El Cuaderno de Cultivo"](#3-revista-botánica-el-cuaderno-de-cultivo)
   - [Carrito y Checkout por WhatsApp](#4-carrito-y-checkout-por-whatsapp)
   - [Panel de Administración (Modo Dueño)](#5-panel-de-administración-modo-dueño)
5. [Arquitectura de Seguridad](#-arquitectura-de-seguridad)
6. [Estructura del Proyecto](#-estructura-del-proyecto)
7. [Instalación y Despliegue](#-instalación-y-despliegue)
8. [Credenciales por Defecto](#-credenciales-por-defecto)

---

## 🌿 Visión General

**Vivero Botánica** está concebido para ofrecer a los amantes de la jardinería y el diseño interior una experiencia de compra fluida y estética:
- **Enfoque Local**: Adaptado al clima semiárido de Mendoza (especies aclimatadas, guías de riego estacional y sustratos especiales).
- **Mobile-First & Performance**: Navegación ágil en dispositivos móviles sin desbordes horizontales, tipografía legible y animaciones aceleradas por GPU a 60 fps.
- **Sin Dependencias Pesadas de Backend**: Funciona como SPA autónoma con persistencia reactiva en `localStorage`, integración instantánea con WhatsApp para pedidos y gestión local completa.

---

## 🛠 Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) (entorno rápido con Hot Module Replacement).
- **Estilos**: CSS Nativo Modularizado (cada componente cuenta con su propio `.css` sin contaminación de selectores globales ni sobrecarga de frameworks).
- **Iconografía**: [Lucide React](https://lucide.dev/) (iconos vectoriales limpios y coherentes).
- **Efectos & Microinteracciones**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) para feedback al agregar plantas al carrito.
- **Tipografías**: *Playfair Display* (elegancia editorial botánica) y *Plus Jakarta Sans* (lectura moderna y funcional).
- **Criptografía**: Web Crypto API nativo (`crypto.subtle.digest` para hashing SHA-256).

---

## 🎨 Identidad Visual & Paleta Botánica

La estética de la plataforma se inspira en la frescura orgánica de los viveros de montaña, utilizando una paleta **Sage Mist & Organic Linen**:

| Variable CSS | Color Hexadecimal | Uso |
| :--- | :--- | :--- |
| `--bg-primary` | `#edf2ea` | Fondo general de la página (lienzo orgánico salvia suave) |
| `--bg-secondary` | `#e2e9de` | Secciones alternadas y fondos secundarios |
| `--bg-card` | `#f8faf6` | Tarjetas de plantas, modales y superficies elevadas |
| `--text-primary` | `#12281a` | Tipografía principal (verde bosque profundo de alto contraste) |
| `--text-secondary` | `#2c4a38` | Subtítulos y descripciones botánicas |
| `--accent-gold` | `#c59b27` | Insignias destacadas, estrellas de valoración y detalles premium |
| `--botanical-green` | `#1b4332` | Botones de acción, cabeceras y elementos activos |

### Optimización Táctil en Móviles:
- Eliminación del destello azul (`-webkit-tap-highlight-color: transparent`).
- Prevensión de scroll horizontal accidental (`overflow-x: hidden` en `body` y `html`).
- Soporte completo de desenfoque con prefijo `-webkit-backdrop-filter` para iOS Safari.

---

## 📦 Módulos y Características

### 1. Catálogo Curado (10 Especies)
Se seleccionaron **10 plantas y complementos clave** con fichas botánicas enriquecidas (nivel de dificultad, tolerancia a mascotas, requerimiento de luz y frecuencia de riego) y precios estimados en Pesos Argentinos (ARS) para 2026:

1. **Monstera Deliciosa (Costilla de Adán)** — `$48.500 ARS` (Follaje escultórico, luz indirecta).
2. **Ficus Lyrata (Higuera Hoja de Violín)** — `$72.000 ARS` (Árbol de interior de 1.20m).
3. **Ramo Peonías & Eucalipto Silvestre** — `$34.000 ARS` (Flores de corte frescas).
4. **Calathea Orbifolia** — `$39.000 ARS` (Hojas redondeadas con bandas plateadas).
5. **Orquídea Phalaenopsis Doble Vara** — `$52.000 ARS` (Flores blancas duraderas).
6. **Olivo en Maceta de Terracota** — `$65.000 ARS` (Exterior / Balcón rústico).
7. **Sansevieria Laurentii (Lengua de Suegra)** — `$29.500 ARS` (Purificadora ultra resistente).
8. **Philodendron Pink Princess** — `$88.000 ARS` (Pieza de coleccionista con variegación rosa).
9. **Echeveria Elegans (Rosa de Alabastro)** — `$14.500 ARS` (Suculenta compacta para ventanas).
10. **Sustrato Premium Especial Vivero 10L** — `$16.500 ARS` (Humus, perlita y turba rubia).

### 2. Galería Panorámica 3D DriftWall
- **Efecto Flotante Tridimensional**: Muestra 15 capturas botánicas del vivero desplazándose en columnas sincronizadas con perspectiva tridimensional variable (`tilt: 14°`, `turn: -10°`, `depth: 110px`).
- **Diseño Sin Marcos Rígidos**: Se eliminó el contenedor rectangular oscuro; las fotos flotan en el lienzo natural de la web con un viñeteado perimetral orgánico (`vignette`) difuminado suavemente hacia `--bg-primary` (`#edf2ea`).
- **Rendimiento Acelerado**: `will-change: transform`, `requestAnimationFrame` optimizado con delta de tiempo para evitar tirones de framerate y soporte para `prefers-reduced-motion`.

### 3. Revista Botánica "El Cuaderno de Cultivo"
- Rediseño editorial tipo magazine (evitando parecer una lista de productos).
- **Artículos Especializados**:
  - *Secretos para que tu Monstera desarrolle fenestraciones gigantes*.
  - *El calendario estacional de riego en el clima seco de Mendoza*.
  - *Poda y esquejes: Propaga tus plantas en agua como un profesional*.
  - *Sustratos y drenaje: Cómo evitar la asfixia radicular en macetas*.
- **Modal de Lectura Inmersivo**: Permite abrir cada artículo completo con consejos paso a paso, tiempo estimado de lectura y enlaces directos a fuentes botánicas externas seguras.
- **Almanaque de Temporada**: Widget de labores botánicas del mes actual.

### 4. Carrito y Checkout por WhatsApp
- Apertura lateral deslizante (Drawer) con control de cantidades.
- Cálculo de subtotal, costo de envío y cálculo de bonificación por compra superior a `$80.000 ARS`.
- Botón **"Finalizar Pedido por WhatsApp"**:
  - Genera automáticamente un mensaje codificado con `encodeURIComponent()`.
  - Envía la lista detallada de plantas, cantidades, precios y total a **+54 9 261 693 5851**.

### 5. Panel de Administración (Modo Dueño)
- **Acceso Protegido**: Botón discreto en la barra de navegación para iniciar sesión con credenciales maestras.
- **Pestaña "Nueva Especie / Edición"**:
  - Formulario con validación de campos, selección de categoría, luz, riego, pet friendly y dificultad.
  - Soporte para URL externa o **subida directa de fotos locales desde la computadora/celular** (procesadas en memoria como DataURL Base64).
  - Selector de imágenes botánicas preconfiguradas en alta resolución.
- **Pestaña "Gestionar Catálogo"**:
  - Búsqueda en tiempo real por nombre de planta.
  - Botón para alternar stock en 1 clic (*En Stock* / *Agotado*).
  - Edición en vivo de cualquier campo.
  - Eliminación segura con confirmación.
  - Botón de **"Restaurar 10 Especies de Fábrica"** ante cualquier desconfiguración.
- **Pestaña "Seguridad"**:
  - Permite al propietario cambiar la contraseña maestra, la cual se hashea al instante con SHA-256.

---

## 🔒 Arquitectura de Seguridad

1. **Criptografía de Contraseñas (SHA-256)**:
   - Implementado en `src/utils/security.js` con el estándar Web Crypto API (`crypto.subtle.digest('SHA-256')`).
   - La contraseña maestra nunca se almacena en texto plano en el navegador; únicamente se almacena y compara su digest hexadecimal de 64 caracteres.
2. **Protección Contra Fuerza Bruta (Lockout Persistente)**:
   - Tras 5 intentos fallidos consecutivos, el sistema impone un bloqueo temporal de 60 segundos.
   - El timestamp de expiración se registra en `localStorage` (`vivero_admin_lockout_until`), impidiendo que un atacante sortee el bloqueo simplemente recargando la página.
3. **Sanitización de Entradas (Anti-XSS)**:
   - Función `sanitizeInput()` que neutraliza etiquetas peligrosas (`<`, `>`, scripts y manejadores de eventos) antes de persistir o renderizar datos introducidos por el usuario.
4. **Validación de Esquemas de URL**:
   - Función `sanitizeImageUrl()` que verifica que las imágenes utilicen estrictamente protocolos seguros (`https:`, `http:` o `data:image/`), bloqueando esquemas maliciosos como `javascript:`, `vbscript:` o `data:text/html`.
5. **Content Security Policy (CSP)**:
   - Cabecera HTTP declarada en `index.html`:
     - `default-src 'self'`
     - `object-src 'none'` (bloqueo total de plugins Flash/Java)
     - `base-uri 'self'` (prevención de ataques de inyección de `<base>`)
     - `img-src` restringido a orígenes de confianza (Unsplash, Picsum, datos y blobs)
     - `connect-src` restringido a dominios de WhatsApp y locales
6. **Seguridad en Hipervínculos**:
   - Todo enlace saliente (`target="_blank"`) cuenta obligatoriamente con `rel="noopener noreferrer"`.
7. **Timeout de Sesión por Inactividad**:
   - Cierre automático de la sesión de administración tras 15 minutos sin interacción del usuario (monitoreo de clics, teclas y scroll).

---

## 📁 Estructura del Proyecto

```text
viveroTienda/
├── index.html                   # Entry point HTML con CSP y fuentes de Google
├── package.json                 # Dependencias y scripts de Vite
├── vite.config.js               # Configuración de Vite y React
├── public/                      # Recursos estáticos públicos
└── src/
    ├── main.jsx                 # Punto de entrada de React
    ├── index.css                # Estilos globales y paleta botánica Sage
    ├── App.jsx                  # Componente raíz y orquestador de estado
    ├── App.css                  # Estilos del layout principal
    ├── components/
    │   ├── Navbar.jsx           # Barra de navegación fija con badge de carrito y acceso dueño
    │   ├── Navbar.css
    │   ├── Hero.jsx             # Sección principal con llamada a la acción y métricas
    │   ├── Hero.css
    │   ├── ProductCatalog.jsx   # Grilla interactiva de las 10 especies con filtros
    │   ├── ProductCatalog.css
    │   ├── DriftWall.jsx        # Componente 3D flotante con animación continua
    │   ├── DriftWall.css        # Viñeteado perimetral difuminado sin bordes
    │   ├── Gallery.jsx          # Sección panorámica del vivero
    │   ├── Gallery.css
    │   ├── PlantNews.jsx        # Revista botánica "El Cuaderno de Cultivo"
    │   ├── PlantNews.css
    │   ├── Reviews.jsx          # Testimonios de clientes en Mendoza
    │   ├── Reviews.css
    │   ├── LocationSection.jsx  # Mapa interactivo y horarios de atención
    │   ├── LocationSection.css
    │   ├── Footer.jsx           # Pie de página y enlaces rápidos
    │   ├── Footer.css
    │   ├── CartDrawer.jsx       # Carrito lateral con cálculo de envío y botón WhatsApp
    │   ├── CartDrawer.css
    │   ├── OwnerLoginModal.jsx  # Modal de autenticación con SHA-256 y bloqueo
    │   ├── OwnerLoginModal.css
    │   ├── AdminModal.jsx       # Panel de control ABM con carga de fotos y gestión
    │   └── AdminModal.css
    ├── hooks/
    │   └── useProducts.js       # Hook centralizado para catálogo persistente (10 productos)
    └── utils/
        └── security.js          # Utilidades criptográficas SHA-256 y sanitización
```

---

## 🚀 Instalación y Despliegue

### Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18.0 o superior recomendada).
- Gestor de paquetes `npm` o `yarn`.

### 1. Clonar o Abrir el Proyecto
```bash
cd d:\Trabajos\viveroTienda
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible de inmediato en [http://localhost:5173](http://localhost:5173).

### 4. Ejecutar el Linter
```bash
npm run lint
```

### 5. Compilar para Producción
```bash
npm run build
```
Los archivos optimizados y minificados se generarán en la carpeta `dist/`, listos para ser desplegados en cualquier servicio de hosting estático (Vercel, Netlify, GitHub Pages, Firebase Hosting, etc.).

---

## 🔑 Credenciales por Defecto

Para ingresar al **Modo Dueño / Administrador**:

- **Acceso**: Clic en el botón **"Acceso Dueño"** ubicado en el encabezado de la web (o en el pie de página).
- **Correo**: `admin@viverobotanica.com`
- **Contraseña Inicial**: `ViveroMendoza2026!`
- **Teléfono Oficial de Pedidos WhatsApp**: `+54 9 261 693 5851` (2616935851)

*(La contraseña maestra puede cambiarse en cualquier momento desde la pestaña "Seguridad" del panel de administración).*

---

🌿 *Desarrollado con dedicación botánica y código limpio para Mendoza, Argentina.*
