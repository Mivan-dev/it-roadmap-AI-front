# IT Roadmap AI — Web

Frontend de la aplicación **IT Roadmap AI**, construida con Angular 22 y Tailwind CSS v4.

## 🎯 Motivo del proyecto

El mercado IT cambia rápido y los perfiles Junior muchas veces no saben por dónde empezar ni qué habilidades priorizar. **IT Roadmap AI** nace para resolver eso: una app que consulta el mercado laboral en tiempo real y genera un roadmap de skills personalizado, orientado a lo que las empresas van a pedir de acá al 2030.

No es un curso ni una guía genérica — es un plan concreto basado en tendencias reales del mercado, adaptado al stack, objetivo y nivel de experiencia de cada persona.

## 📦 Scope

- Formulario de configuración con selección de tecnologías (predefinidas + custom)
- Generación de roadmap personalizado via IA (DeepSeek + OpenRouter con web search)
- Visualización por fases con cards, etiquetas de prioridad y guía explicativa
- Dark mode / Light mode con persistencia
- Descarga del roadmap en HTML y PDF
- Diseño responsive (desktop-first, usable en mobile)

## 🛠 Stack

- **Angular 22** — Zoneless, Signals, lazy loading
- **Tailwind CSS v4** — con PostCSS
- **TypeScript 6**

## 🚀 Cómo correr el proyecto

### Requisitos
- Node.js 20+
- El backend `it-roadmap-api` corriendo en `http://localhost:3000`

### Instalación

```bash
npm install --legacy-peer-deps
```

### Desarrollo

```bash
npm start
```

La app queda disponible en `http://localhost:4200`.

## 🔗 Repositorios relacionados

- [it-roadmap-api](https://github.com/Mivan-dev/it-roadmap-AI.git) — Backend NestJS