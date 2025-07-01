# Usa una imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instala dependencias del sistema y extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libicu-dev libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql intl opcache zip

# Habilita módulos de Apache necesarios
RUN a2enmod rewrite

# Cambia DocumentRoot de Apache a /var/www/html/public
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copia Composer desde la imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia los archivos del proyecto
COPY . /var/www/html/

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Da permisos adecuados
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Crea un archivo .env temporal para Composer y configuración mínima
RUN echo "APP_ENV=dev" > .env && \
    echo "APP_DEBUG=1" >> .env && \
    echo "JWT_SECRET=dummy_secret" >> .env

# Evita advertencias de Composer como root
ENV COMPOSER_ALLOW_SUPERUSER=1

# Instala dependencias PHP con Composer
RUN composer install --no-interaction --optimize-autoloader

# Borra el archivo .env temporal para no subirlo a producción
RUN rm .env || true

# Expone el puerto por defecto de Apache
EXPOSE 80

# Comando por defecto para iniciar Apache en primer plano
CMD ["apache2-foreground"]
