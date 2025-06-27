# Usa una imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instala dependencias del sistema y extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libicu-dev libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql intl opcache zip

# Habilita módulos de Apache necesarios
RUN a2enmod rewrite

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia los archivos del proyecto
COPY . /var/www/html/

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Da permisos adecuados
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Agrega .env temporal para evitar errores con Symfony Runtime
RUN echo "JWT_SECRET=dummy_secret" > .env

# Instala dependencias (con var de entorno para evitar advertencias como root)
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-interaction --optimize-autoloader || cat var/log/*.log

# Elimina el .env temporal (opcional)
RUN rm .env || true

# Exponer puerto Apache
EXPOSE 80

# Comando por defecto
CMD ["apache2-foreground"]
