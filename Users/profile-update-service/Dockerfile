FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/profile-update-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3009

ENTRYPOINT ["java", "-jar", "app.jar"]
