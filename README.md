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