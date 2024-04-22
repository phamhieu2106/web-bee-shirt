FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/back-end-0.0.1-SNAPSHOT.jar /app/
EXPOSE 8080
CMD ["java", "-jar", "back-end-0.0.1-SNAPSHOT.jar"]


# docker build -t back-end .