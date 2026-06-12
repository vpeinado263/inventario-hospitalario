# 🏥 Inventario Hospitalario - CRUD Full Stack

> Una aplicación completa de gestión de insumos hospitalarios con operaciones CRUD, desplegada en la nube usando React, Next.js, Node.js, Express y PostgreSQL.

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web tipo CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar el inventario de insumos de un hospital. Permite registrar productos médicos, controlar cantidades y agregar observaciones. Fue desarrollado con fines educativos para comprender la integración de un frontend con un backend y una base de datos en la nube.

## 🚀 Tecnologías Utilizadas

| Capa | Tecnologías |
|------|--------------|
| **Frontend** | React, Next.js, Axios, CSS Modules |
| **Backend** | Node.js, Express, CORS, Morgan, Helmet |
| **Base de datos** | PostgreSQL 18 |
| **Despliegue** | Vercel (Frontend), Render (Backend + Base de datos) |
| **Control de versiones** | Git + GitHub |

## 🧠 ¿Qué es CRUD?

CRUD es un acrónimo que representa las cuatro operaciones fundamentales que una aplicación realiza sobre los datos:

| Operación | Verbo HTTP | Descripción |
|-----------|------------|-------------|
| **Create** | POST | Agregar un nuevo insumo al inventario |
| **Read** | GET | Obtener la lista de insumos existentes |
| **Update** | PUT | Modificar los datos de un insumo |
| **Delete** | DELETE | Eliminar un insumo del inventario |

## 🏗️ Arquitectura del Proyecto

Frontend (Next.js) ────► Backend (Express) ────► Base de datos (PostgreSQL)
Vercel Render Render


### Frontend (React + Next.js)
- Formulario controlado con `useState`
- Comunicación con el backend mediante Axios
- Renderizado dinámico de la tabla de insumos

### Backend (Node.js + Express)
- API REST estructurada en:
  - **Controllers**: Lógica de negocio
  - **Routes**: Definición de endpoints
  - **Middleware**: Manejo de errores, logs, CORS
- Configuración de CORS para permitir conexiones desde Vercel

### Base de datos (PostgreSQL 18 en Render)
- Tabla `insumos` con los siguientes campos:
  - `id` (SERIAL, PRIMARY KEY)
  - `name` (VARCHAR, nombre del insumo)
  - `quantity` (INTEGER, cantidad disponible)
  - `comments` (TEXT, observaciones)
  - `created_at` (TIMESTAMP, fecha de creación)
  - `updated_at` (TIMESTAMP, última modificación)

## 🧪 Lo que Aprendí en este Proyecto

### 1. Bases de datos en la nube
- Entendí que **no es necesario tener PostgreSQL instalado localmente**; existen servicios en la nube como Render, Supabase o Neon que ofrecen bases de datos gratuitas.
- Aprendí a usar **Render Postgres**, que aunque expira a los 30 días, es ideal para proyectos de portafolio.

### 2. Configuración de variables de entorno
- Descubrí la importancia de usar **`DATABASE_URL`** en lugar de variables separadas (`DB_HOST`, `DB_USER`, etc.) para simplificar la conexión.
- Aprendí a diferenciar entre **URL interna** (para servicios dentro de Render) y **URL externa** (para pruebas locales).

### 3. Diferencia entre desarrollo local y producción
- En **local**, se usa `localhost:5432` o la URL externa de la base de datos en la nube.
- En **Render**, se usa la URL interna para que los servicios se comuniquen por red privada.

### 4. Por qué NO usé Supabase (aunque lo consideré)
- Supabase es excelente para proyectos pequeños o aplicaciones que necesitan autenticación integrada, pero para este proyecto:
  - Ya tenía el backend construido con Express.
  - Preferí mantener toda la lógica en mi propio servidor en lugar de depender de la API REST de Supabase.
  - Render Postgres es suficiente y mantiene todo el proyecto en un solo ecosistema.

### 5. Manejo de errores y logs
- Aprendí a leer los logs de Render para diagnosticar problemas de conexión.
- Identifiqué errores como `ECONNREFUSED` (falta de variable de entorno) y `ENOTFOUND` (URL incorrecta).

## 🌐 Deploy

| Servicio | Enlace | Estado |
|----------|--------|--------|
| **Frontend (Vercel)** | [https://8va-tarea-react-next-js.vercel.app](https://8va-tarea-react-next-js.vercel.app) | ✅ Activo |
| **Backend (Render)** | [https://inventario-hospitalario.onrender.com](https://inventario-hospitalario.onrender.com) | ✅ Activo |
| **Base de datos** | PostgreSQL 18 en Render (Virginia, US East) | ✅ Activa |

## 🔧 Configuración Local

### Variables de entorno (`.env`)

```env
# Para desarrollo local (usar URL externa)
DATABASE_URL=postgresql://usuario:contraseña@host.virginia-postgres.render.com/inventario_hospitalario
PORT=5001