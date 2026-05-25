# Vite Proyec

Aplicacion frontend profesional con Vite, React, React Router DOM, Axios y una arquitectura modular preparada para crecer.

## 1. Crear el proyecto con Vite

```bash
npm create vite@latest vite-proyec -- --template react
cd vite-proyec
```

Este repositorio ya contiene la estructura creada y ampliada con una arquitectura de produccion.

## 2. Instalar dependencias

```bash
npm install
npm install react-router-dom axios lucide-react
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

## 3. Ejecutar el proyecto

```bash
npm run dev
```

Para generar una version optimizada:

```bash
npm run build
```

Para revisar el build localmente:

```bash
npm run preview
```

## 4. Organizacion de carpetas

- `src/assets`: imagenes, iconos y recursos estaticos.
- `src/components/common`: componentes reutilizables de aplicacion, como `ProtectedRoute`.
- `src/components/layout`: estructuras visuales grandes, como `AppLayout`, `Navbar` y `Sidebar`.
- `src/components/ui`: componentes pequenos de interfaz, como botones, loaders y toasts.
- `src/pages`: vistas conectadas a rutas.
- `src/routes`: definicion centralizada de rutas.
- `src/services`: clientes HTTP y servicios por dominio.
- `src/hooks`: hooks reutilizables.
- `src/context`: providers globales, como autenticacion y toasts.
- `src/styles`: estilos globales, tokens visuales y responsive.
- `src/utils`: funciones puras y utilidades transversales.

## 5. Variables de entorno

Vite expone solo variables que empiezan con `VITE_`.

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Vite Proyec
```

Usa `.env.example` como plantilla para otros entornos y evita subir secretos reales al repositorio.

## 6. Despliegue

1. Ejecuta `npm run build`.
2. Sube el contenido de `dist/` a Vercel, Netlify, Cloudflare Pages o un servidor estatico.
3. Configura las variables `VITE_*` en el panel del proveedor.
4. Para SPA, activa fallback a `index.html` para que React Router funcione al recargar rutas internas.
