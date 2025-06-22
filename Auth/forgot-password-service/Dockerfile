# Usa la imagen oficial de Dart como base
FROM dart:stable AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY pubspec.* ./

# Obtiene las dependencias
RUN dart pub get

# Copia el resto del código fuente
COPY . .

# Compila el programa para producción (opcional, no obligatorio)
RUN dart compile exe bin/forgot_password_service.dart -o bin/forgot_password_service.exe

# Etapa final para correr la app en modo runtime mínimo
FROM scratch

# Copia el runtime de Dart y la aplicación compilada
COPY --from=build /runtime/ /runtime/
COPY --from=build /app/bin/forgot_password_service.exe /app/bin/forgot_password_service.exe
COPY --from=build /app/.env /app/.env

# Establece las variables de entorno para usar el runtime Dart mínimo
ENV PATH="/runtime/bin:/app/bin:${PATH}"

# Expone el puerto del servicio
EXPOSE 3005

# Comando para ejecutar el binario compilado
CMD ["forgot_password_service.exe"]
