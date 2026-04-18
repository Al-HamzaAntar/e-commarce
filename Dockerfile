# Use PHP 8.2 FPM as base image
FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /var/www/html


# Install system dependencies
RUN apk update && apk add --no-cache \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    freetype \
    libpng \
    jpeg-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    zip

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install bc math -j$(nproc) \
    gd \
    pdo_mysql \
    mysqli \
    bcmath \
    zip \
    opcache \
    xml \
    ctype \
    iconv \
    intl \
    pdo \
    dom \
    filter \
    gd \
    hash \
    json \
    mbstring \
    session \
    tokenizer \
    xmlwriter

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Change current user to www-data
USER www-data

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy .env.example to .env
RUN cp .env.example .env

# Generate application key
RUN php artisan key:generate

# Set permissions for storage and cache
RUN chmod -R 775 storage bootstrap/cache

# Expose port 9000
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
