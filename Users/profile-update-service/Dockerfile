# 🔨 Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build

# Solo copiamos los archivos necesarios para aprovechar la cache
COPY pom.xml .
COPY src ./src

# Compilar el JAR (sin tests)
RUN mvn clean package -DskipTests

# 🚀 Run Stage
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copiamos el JAR compilado desde el builder
COPY --from=builder /build/target/*.jar app.jar

# Exponer puerto
EXPOSE 3009

CMD ["java", "-jar", "app.jar"]
