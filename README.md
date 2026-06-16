# Inventario Hospitalario - CRUD Full Stack

> Una herramienta práctica para que el jefe de enfermería registre rápidamente las necesidades del servicio en los tres turnos, sin papel ni complicaciones.

## Descripción del Proyecto

Todos los días, el jefe de enfermería recorre el servicio, escucha las necesidades de cada turno (mañana, tarde, noche) y las anota **en una hoja de papel suelta**. Esa hoja se pierde, se moja, se arruga, o simplemente queda en el bolsillo del uniforme. Es esa misma hojita, pero digital, accesible desde el celular, y ordenada automáticamente en una lista clara.

## ¿Para quién es?

- **Jefe de enfermería** que necesita registrar insumos faltantes
- **Supervisor de turno** que anota lo que hace falta antes de que termine su guardia
- **Cualquier enfermero/a** que quiera dejar un registro rápido de lo que necesita su servicio

## Tecnologías Utilizadas

| Capa | Tecnologías |
|------|--------------|
| **Frontend** | React, Next.js, Axios, CSS Modules |
| **Backend** | Node.js, Express, CORS, Morgan, Helmet |
| **Base de datos** | PostgreSQL 18 |
| **Despliegue** | Vercel (Frontend), Render (Backend + Base de datos) |
| **Control de versiones** | Git + GitHub |

## ¿Qué es CRUD?

CRUD representa las cuatro operaciones fundamentales que una aplicación realiza sobre los datos:

| Operación | Verbo HTTP | Descripción |
|-----------|------------|-------------|
| **Create** | POST | Agregar un nuevo insumo al inventario |
| **Read** | GET | Obtener la lista de insumos existentes |
| **Update** | PUT | Modificar los datos de un insumo |
| **Delete** | DELETE | Eliminar un insumo del inventario |

##  Arquitectura del Proyecto

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
DATABASE_URL=
PORT=
