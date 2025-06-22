# Etapa 1: Construcción del binario
FROM dart:stable AS build

WORKDIR /app

# Copia los archivos necesarios
COPY pubspec.* ./
RUN dart pub get

COPY . .

# Compilar el ejecutable AOT (nativo)
RUN dart compile exe bin/profile_read_service.dart -o bin/server

# Etapa 2: Imagen final para producción
FROM scratch

# Copia binario y entorno
COPY --from=build /runtime/ /
COPY --from=build /app/bin/server /app/bin/
COPY --from=build /app/.env /app/

# Definir punto de entrada
ENTRYPOINT ["/app/bin/server"]
