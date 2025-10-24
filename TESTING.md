# Pruebas Unitarias - Pastelería Mil Sabores

Este proyecto incluye pruebas unitarias completas utilizando **Jest** y **React Testing Library**.

## 📦 Dependencias Instaladas

- `jest`: Framework de testing
- `@testing-library/react`: Utilidades para testing de componentes React
- `@testing-library/jest-dom`: Matchers personalizados para Jest
- `@testing-library/user-event`: Simulación de interacciones del usuario
- `jest-environment-jsdom`: Entorno DOM para Jest
- `@babel/preset-env` y `@babel/preset-react`: Transpilación de código
- `babel-jest`: Integración de Babel con Jest
- `identity-obj-proxy`: Mock para archivos CSS

## 🧪 Suites de Pruebas

### Componentes Átomos

#### Button.spec.jsx
Prueba el componente `Button` con los siguientes casos:
- ✅ Renderiza el botón con texto
- ✅ Aplica la clase variant por defecto (primary)
- ✅ Aplica clases variant personalizadas
- ✅ Llama al handler onClick al hacer clic
- ✅ Establece correctamente el atributo type
- ✅ Usa "button" como type por defecto

#### Input.spec.jsx
Prueba el componente `Input` con los siguientes casos:
- ✅ Renderiza el elemento input
- ✅ Aplica el atributo type correctamente
- ✅ Muestra el placeholder
- ✅ Muestra el valor prop
- ✅ Llama al handler onChange cuando cambia
- ✅ Establece el atributo name
- ✅ Establece el atributo required
- ✅ Aplica la clase CSS correcta

### Componentes Moléculas

#### SearchBar.spec.jsx
Prueba el componente `SearchBar` con los siguientes casos:
- ✅ Renderiza el input de búsqueda y el botón
- ✅ Muestra el valor de búsqueda actual
- ✅ Llama a onChange al escribir
- ✅ Llama a onSearch al hacer clic en buscar
- ✅ Tiene el placeholder correcto
- ✅ El input es de tipo text
- ✅ Renderiza con la estructura de layout correcta

### Utilidades

#### cart.spec.js
Prueba las funciones del carrito de compras:

**addToCart:**
- ✅ Agrega un producto nuevo a un carrito vacío
- ✅ Incrementa la cantidad cuando el producto ya existe
- ✅ Agrega un producto nuevo a un carrito existente
- ✅ Dispara el evento cartUpdated
- ✅ Maneja errores correctamente

**getCart:**
- ✅ Retorna un array vacío cuando no hay carrito
- ✅ Retorna los items del carrito desde localStorage
- ✅ Maneja JSON inválido correctamente

**clearCart:**
- ✅ Elimina el carrito del localStorage
- ✅ Dispara el evento cartUpdated

#### discounts.spec.js
Prueba la lógica de descuentos con más de 15 casos de prueba:

**Sin descuentos:**
- ✅ Retorna precio completo sin descuentos
- ✅ Maneja carritos vacíos

**Descuento cumpleaños + email DUOC:**
- ✅ Aplica torta gratis en cumpleaños con email @duocuc.cl
- ✅ No aplica sin email DUOC
- ✅ No aplica en días que no son cumpleaños

**Descuento por edad (50+):**
- ✅ Aplica 50% de descuento para mayores de 50 años
- ✅ No aplica para menores de 50
- ✅ El descuento de cumpleaños tiene prioridad

**Código promocional:**
- ✅ Aplica 10% de descuento con código FELICES50
- ✅ No aplica con códigos inválidos
- ✅ El descuento por edad tiene prioridad

**Prioridad de descuentos:**
- ✅ Verifica el orden: cumpleaños+DUOC > edad 50+ > código promo

**Casos edge:**
- ✅ Maneja items con precio 0
- ✅ Lee usuario desde localStorage si no se proporciona
- ✅ Maneja datos de usuario faltantes
- ✅ Maneja items sin campo quantity
- ✅ Redondea correctamente el total

## 🚀 Comandos Disponibles

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch (desarrollo)
```bash
npm run test:watch
```

### Generar reporte de cobertura
```bash
npm run test:coverage
```

## 📊 Resultados

```
Test Suites: 5 passed, 5 total
Tests:       48 passed, 48 total
Snapshots:   0 total
Time:        ~5s
```

### Cobertura de Código Testeado

Los siguientes componentes y utilidades tienen **100% de cobertura**:
- ✅ `Button.jsx` - 100%
- ✅ `Input.jsx` - 100%
- ✅ `SearchBar.jsx` - 100%
- ✅ `cart.js` - 100%
- ✅ `discounts.js` - 100%

## 📁 Estructura de Archivos de Pruebas

```
src/
├── components/
│   ├── atoms/
│   │   ├── __tests__/
│   │   │   ├── Button.spec.jsx
│   │   │   └── Input.spec.jsx
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   └── molecules/
│       ├── __tests__/
│       │   └── SearchBar.spec.jsx
│       └── SearchBar.jsx
└── utils/
    ├── __tests__/
    │   ├── cart.spec.js
    │   └── discounts.spec.js
    ├── cart.js
    └── discounts.js
```

## ⚙️ Configuración

### jest.config.js
Configuración principal de Jest con:
- Entorno jsdom para simular el navegador
- Transformación con Babel
- Mapeo de archivos CSS e imágenes
- Configuración de cobertura

### jest.setup.js
Configuración inicial que incluye:
- Import de matchers de `@testing-library/jest-dom`
- Mock de `localStorage`
- Mock de `window.alert`
- Mock de `window.dispatchEvent`

### babel.config.js
Configuración de Babel para:
- Preset de entorno para Node.js
- Preset de React con runtime automático

## 🔍 Mocks Globales

### localStorage Mock
```javascript
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() { this.store = {}; }
  getItem(key) { return this.store[key] || null; }
  setItem(key, value) { this.store[key] = String(value); }
  removeItem(key) { delete this.store[key]; }
}
```

### Otros Mocks
- `window.alert` - Mockeado con `jest.fn()`
- `window.dispatchEvent` - Mockeado con `jest.fn()`

## 📝 Buenas Prácticas Implementadas

1. **Arrange-Act-Assert**: Estructura clara en cada prueba
2. **beforeEach hooks**: Limpieza antes de cada prueba
3. **Nombres descriptivos**: Tests auto-documentados
4. **Pruebas aisladas**: Sin dependencias entre tests
5. **User-centric testing**: Simulación de interacciones reales
6. **Edge cases**: Pruebas de casos límite y errores
7. **Mock apropiados**: Solo se mockea lo necesario

## 🎯 Próximos Pasos

Para expandir la suite de pruebas, considera agregar tests para:
- Componentes de páginas (Home, Catalogo, Carrito, etc.)
- Componentes de organismos (Navbar, Footer, ProductGrid)
- Contexto de autenticación (AuthContext)
- Componentes de templates
- Pruebas de integración end-to-end

## 🐛 Debugging

Para debugear pruebas:
```bash
# En modo watch con más detalles
npm run test:watch -- --verbose

# Ejecutar un archivo específico
npm test -- SearchBar.test.jsx

# Ejecutar con un patrón
npm test -- --testNamePattern="adds new product"
```

## 📚 Referencias

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
