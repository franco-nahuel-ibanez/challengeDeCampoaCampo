# Pokédex App

Aplicación móvil desarrollada con **React Native + Expo** como challenge técnico para **deCampoaCampo**.

## 📋 Sobre el Challenge

El objetivo era desarrollar una Pokédex funcional que incluya:
- Listado con infinite scroll y carga progresiva de imágenes
- Vista de detalle de cada pokémon
- Búsqueda y filtrado en tiempo real
- Sistema de favoritos
- Persistencia offline (favoritos y última lista cargada)
- Manejo de estados de carga y errores

---

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Levantar el proyecto
npx expo start
```

---

## 🛠️ Decisiones Técnicas

### Persistencia de Datos

La app funciona completamente offline gracias a la combinación de:

- **`expo-file-system`**: Descarga y almacena los sprites de pokémon en el dispositivo, nombrados por ID (`1.png`, `25.png`). Al volver online, se limpian solo los sprites de pokémon no favoritos.

- **`@react-native-async-storage/async-storage`**: Persiste dos listas independientes:
  - `"pokemons"`: Lista principal (se limpia al volver online para refrescar datos)
  - `"favorites"`: Favoritos del usuario (nunca se limpia automáticamente)

- **`zustand`**: Gestión de estado global centralizada. El store orquesta la carga desde la API, la descarga de sprites, y la persistencia en AsyncStorage.

### Optimizaciones de Rendimiento

- **`expo-image`**: Reemplazo optimizado del componente `Image` nativo con cache automático y soporte para placeholders.

- **`@shopify/flash-list`**: Lista de alta performance para renderizar los ~1300 pokémon disponibles, con reciclaje eficiente de componentes y menor consumo de memoria que `FlatList`.

---

## 📦 Stack Tecnológico

- React Native (Expo SDK 54)
- React Navigation v6
- Zustand (estado global)
- Axios (cliente HTTP)
- PokéAPI (fuente de datos)
- AsyncStorage (persistencia)
- Expo File System (cache de imágenes)
- Expo Image (renderizado optimizado)
- FlashList (listas de alto rendimiento)
