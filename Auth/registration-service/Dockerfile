# 🔨 Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build

# Solo copiamos los archivos necesarios para aprovechar la cache
COPY Auth/registration-service/pom.xml .
COPY Auth/registration-service/src ./src

# Compilar el JAR (omitir tests)
RUN mvn clean package -DskipTests

# 🚀 Run Stage
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copiamos el JAR compilado desde la etapa anterior
COPY --from=builder /build/target/*.jar app.jar

# Expón el puerto de Spring Boot
EXPOSE 3002

# Inicia el servicio
CMD ["java", "-jar", "app.jar"]
