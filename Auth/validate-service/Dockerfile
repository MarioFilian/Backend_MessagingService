FROM php:8.2-apache

# Instala dependencias y extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libicu-dev libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql intl opcache zip

# Habilita mod_rewrite de Apache
RUN a2enmod rewrite

# Cambia DocumentRoot a /var/www/html/public
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Habilita AllowOverride All para que .htaccess funcione
RUN sed -i '/<Directory \/var\/www\/html\/public>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/sites-available/000-default.conf || \
    echo -e "<Directory /var/www/html/public>\n    AllowOverride All\n    Require all granted\n</Directory>" >> /etc/apache2/sites-available/000-default.conf

# Copia Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia código fuente
COPY . /var/www/html/

WORKDIR /var/www/html

# Ajusta permisos
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Archivo .env temporal para Composer y configuración mínima
RUN echo "APP_ENV=dev" > .env && \
    echo "APP_DEBUG=1" >> .env && \
    echo "JWT_SECRET=dummy_secret" >> .env

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN composer install --no-interaction --optimize-autoloader

RUN rm .env || true

EXPOSE 80

CMD ["apache2-foreground"]
