FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

# 🔧 Fix mvnw permission for Linux
RUN chmod +x mvnw

RUN ./mvnw clean package

EXPOSE 8080

CMD ["java","-jar","target/taskify-api-0.0.1-SNAPSHOT.jar"]
