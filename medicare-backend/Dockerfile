# ---- Stage 1: Build ----
FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app

COPY mvnw .
COPY .mvn/ .mvn/
COPY pom.xml .
COPY src/ src/

RUN ./mvnw clean package -DskipTests

# ---- Stage 2: Runtime ----
FROM eclipse-temurin:17-jre-jammy AS runtime

RUN groupadd -r spring && useradd -r -g spring spring
USER spring

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]