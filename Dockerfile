# Multi-stage build for Laravel + React application
# Stage 1: Build Node.js assets
FROM node:18-alpine AS node_builder

WORKDIR /var/www/html

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Copy source files
COPY . .

# Build React assets
RUN npm run build

# Stage 2: PHP application with built assets
FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libxml2-dev \
    libiconv-dev \
    icu-dev \
    oniguruma-dev \
    zip \
    curl \
    nginx \
    supervisor

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) \
    bcmath \
    gd \
    pdo_mysql \
    mysqli \
    zip \
    opcache \
    xml \
    ctype \
    iconv \
    intl \
    pdo \
    dom \
    filter \
    hash \
    json \
    mbstring \
    session \
    tokenizer \
    xmlwriter

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY --chown=www-data:www-data . /var/www/html

# Copy built assets from node stage
COPY --from=node_builder --chown=www-data:www-data /var/www/html/public/build /var/www/html/public/build
COPY --from=node_builder --chown=www-data:www-data /var/www/html/public/hot /var/www/html/public/hot

# Change to www-data user
USER www-data

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy environment file and generate key
RUN cp .env.example .env && php artisan key:generate

# Set permissions
RUN chmod -R 775 storage bootstrap/cache

# Switch back to root for nginx setup
USER root

# Create PHP-FPM socket directory
RUN mkdir -p /var/run/php

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose port for Render
EXPOSE 10000

# Start supervisor to run both nginx and php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
