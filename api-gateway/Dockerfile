# Usa una imagen oficial de Node.js (versión LTS)
FROM node:18-alpine

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos primero las dependencias para aprovechar el cache de Docker
COPY package.json package-lock.json ./

# Instalamos solo dependencias necesarias en producción
RUN npm ci --omit=dev

# Copiamos el resto del proyecto (rutas, middlewares, config, etc.)
COPY . .

# Exponemos el puerto donde corre el API Gateway
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
