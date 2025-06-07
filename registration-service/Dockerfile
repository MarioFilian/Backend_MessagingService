# Use official OpenJDK image
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Copy Maven build files
COPY pom.xml .
COPY src ./src

# Build with Maven wrapper or Maven (assuming Maven installed in image)
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Expose port 3002
EXPOSE 3002

# Run the built jar
CMD ["java", "-jar", "target/registration-service-0.0.1-SNAPSHOT.jar"]
