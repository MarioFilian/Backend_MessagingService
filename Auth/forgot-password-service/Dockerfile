# Etapa de compilación
FROM dart:stable AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de configuración y dependencias
COPY pubspec.* ./

# Descarga las dependencias
RUN dart pub get

# Copia el resto del código fuente
COPY . .

# Compila el servicio a binario nativo (sin .exe para Linux)
RUN dart compile exe bin/forgot_password_service.dart -o bin/forgot_password_service

# Etapa de ejecución mínima
FROM scratch

# Copia el runtime de Dart y el binario compilado
COPY --from=build /runtime/ /runtime/
COPY --from=build /app/bin/forgot_password_service /app/bin/forgot_password_service
COPY --from=build /app/.env /app/.env

# Define el PATH para Dart runtime
ENV PATH="/runtime/bin:/app/bin:${PATH}"

# Expone el puerto del servicio
EXPOSE 3005

# Ejecuta el servicio compilado
CMD ["forgot_password_service"]
