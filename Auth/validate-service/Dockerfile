FROM php:8.2-apache

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    unzip zip libzip-dev libicu-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip

# Habilita módulo rewrite
RUN a2enmod rewrite

# Copia Composer desde imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia el código fuente
COPY . /var/www/html/
WORKDIR /var/www/html

# Crea un .env temporal para evitar error en composer
RUN echo "APP_ENV=prod" > .env

# Instala dependencias PHP
RUN composer install --no-interaction --optimize-autoloader

# Borra el .env temporal para que no quede en producción
RUN rm .env

# Establece permisos correctos
RUN chown -R www-data:www-data /var/www/html

# Cambia el DocumentRoot a /public
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Permite uso de .htaccess
RUN echo '<Directory /var/www/html/public>\nAllowOverride All\nRequire all granted\n</Directory>' >> /etc/apache2/apache2.conf

EXPOSE 80

CMD ["apache2-foreground"]
