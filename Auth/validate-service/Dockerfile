FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    unzip zip libzip-dev libicu-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip

RUN a2enmod rewrite

COPY . /var/www/html/
WORKDIR /var/www/html

RUN composer install --no-interaction --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html

RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Habilita override para .htaccess en Apache
RUN echo '<Directory /var/www/html/public>\nAllowOverride All\n</Directory>' >> /etc/apache2/apache2.conf

EXPOSE 80
CMD ["apache2-foreground"]
