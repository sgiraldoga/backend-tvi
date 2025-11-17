# Backend TVI

API REST con NestJS, TypeORM y PostgreSQL.

## 📋 Requisitos

- Node.js >= 18
- Docker y Docker Compose
- npm o yarn

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd backend-tvi
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` con las credenciales de la base de datos postgres

### 4. Levantar la base de datos con Docker

```bash
docker compose up -d
```

Esto levantará PostgreSQL en el puerto `5432`.

**Verificar que esté corriendo:**

```bash
docker ps
```

Deberías ver el contenedor `tvi-postgres-dev` en estado `Up`.

### 5. Iniciar el proyecto en desarrollo

```bash
npm run dev
```

La API estará disponible en: **http://localhost:3000**

---

## 🗄️ Base de Datos

### Conectarse a PostgreSQL

```bash
# Desde la terminal
docker compose exec postgres psql -U postgres -d <nombre-db>
```

O acceder a la interfaz de adminer, está queda corriendo en **http://localhost:8080**.

### Ver tablas creadas

```sql
\dt
```

### Reiniciar la base de datos

Si necesitas empezar de cero:

```bash
# Detener y eliminar contenedores pero sin borrar volumenes (información en db)
docker compose down

# Detener y eliminar volúmenes
docker compose down -v

# Levantar de nuevo
docker compose up -d
```

---

## 🧪 Probar la API

### Opción 1: Archivo HTTP

Instala la extensión de vscode **REST Client**.

Luego abre un archivo `app.http` en VS Code y ejecuta las peticiones.

### Opción 2: Postman / Bruno

Importa las peticiones desde `app.http` o crea manualmente las requests.

---

## 📝 Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Iniciar en modo producción
npm start

# Linter
npm run lint

# Formatear código
npm run format

# Build del proyecto dockerizando backend + base de datos
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

---

## 🐳 Comandos Docker Útiles

```bash
# Levantar solo la base de datos
docker compose up -d

# Ver logs de la base de datos
docker compose logs -f

# Detener la base de datos
docker compose down

# Detener y eliminar volúmenes (resetear DB)
docker compose down -v

# Ver contenedores corriendo
docker compose ps

# Ejecutar comandos dentro del contenedor de postgres
docker compose exec postgres psql -U postgres -d <nombre-db>
```
