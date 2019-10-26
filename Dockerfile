FROM openjdk:latest
WORKDIR /opt/src
COPY target/frontend.jar /opt/src/frontend.jar
EXPOSE 8080
CMD ["java", "-jar", "/opt/src/frontend.jar"]