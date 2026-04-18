# Docker Setup for E-commerce Application

## Quick Start

1. **Build and start containers:**
   ```bash
   docker-compose up -d --build
   ```

2. **Install dependencies and build assets:**
   ```bash
   docker-compose exec app composer install
   docker-compose exec app php artisan key:generate
   docker-compose exec app php artisan migrate --force
   docker-compose exec app php artisan storage:link
   ```

3. **Build frontend assets:**
   ```bash
   docker-compose exec node npm install
   docker-compose exec node npm run build
   ```

4. **Access your application:**
   - Frontend: http://localhost:8080
   - MySQL: localhost:3307
   - Redis: localhost:6380

## Container Services

- **app**: PHP 8.2 FPM with Laravel
- **nginx**: Nginx web server (port 8080)
- **mysql**: MySQL 8.0 database (port 3307)
- **redis**: Redis cache (port 6380)
- **node**: Node.js for asset building

## Environment Variables

Update your `.env` file for Docker:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=ecommarse_db
DB_USERNAME=ecommarse_user
DB_PASSWORD=password

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

## Useful Commands

```bash
# View logs
docker-compose logs -f app
docker-compose logs -f nginx

# Enter app container
docker-compose exec app bash

# Run artisan commands
docker-compose exec app php artisan migrate
docker-compose exec app php artisan tinker

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up -d --build --force-recreate
```

## Production Deployment

For production, update docker-compose.yml with:
- Environment variables for production
- Volume mounts for persistent data
- SSL certificates
- Environment-specific configurations
