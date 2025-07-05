FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/contact-update-service.jar contact-update-service.jar

EXPOSE 3029

ENTRYPOINT ["java", "-jar", "contact-update-service.jar"]
