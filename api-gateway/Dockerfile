# Usamos una imagen oficial de Node.js (versión LTS)
FROM node:18-alpine

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm ci --only=production

# Copiamos el resto del código (server.js y demás)
COPY server.js ./

# Exponemos el puerto 3000 (asumiendo que el gateway corre ahí)
EXPOSE 3000

# Comando para arrancar la app
CMD ["node", "server.js"]
