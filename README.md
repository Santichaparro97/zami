# Zami Empanadas

Sitio web de Zami Empanadas Salteñas — empanadas hechas a mano, recetas familiares del norte argentino.

🌐 **URL de producción:** [zami.vercel.app](https://zami.vercel.app)

## Stack
- HTML + CSS + JavaScript (sin dependencias)
- Hosting: Vercel (auto-deploy en cada push)

## Estructura

```
├── index.html         Estructura principal
├── styles.css         Estilos globales
├── app.js             Lógica (carrito, intro, navegación)
├── img/               Imágenes y assets
├── vercel.json        Configuración del hosting
└── server.ps1         Servidor local para desarrollo (no se sube)
```

## Desarrollo local

```powershell
# Levantar servidor local en http://localhost:8000
.\server.ps1
```

## Deploy

Cada `git push` a `main` dispara un deploy automático en Vercel.
