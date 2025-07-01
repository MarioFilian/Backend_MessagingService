FROM php:8.2-apache

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    unzip zip libzip-dev libicu-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip

# Habilita módulo rewrite
RUN a2enmod rewrite

# Copia Composer desde una imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia el código fuente al contenedor
COPY . /var/www/html/
WORKDIR /var/www/html

# Instala dependencias PHP
RUN composer install --no-interaction --optimize-autoloader

# Establece permisos
RUN chown -R www-data:www-data /var/www/html

# Cambia DocumentRoot a /public
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Permite que Apache respete el .htaccess de Symfony
RUN echo '<Directory /var/www/html/public>\nAllowOverride All\nRequire all granted\n</Directory>' >> /etc/apache2/apache2.conf

# Expone el puerto por defecto de Apache
EXPOSE 80

# Comando por defecto
CMD ["apache2-foreground"]
