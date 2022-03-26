FROM ubuntu:latest

RUN mkdir bookshop
WORKDIR /bookshop/

ARG JAR_FILE=target/*
COPY $JAR_FILE .

# install java 8
RUN apt-get update
RUN apt-get install -y openjdk-8-jdk && \
    apt-get install -y wget unzip nginx

ENV JAVA_HOME /usr/lib/jvm/java-1.8.0-openjdk-amd64

RUN apt-get install -y mysql-server

RUN service mysql start

EXPOSE 3306 8080
ENTRYPOINT ["java", "-jar", "/bookshop-1.0-SNAPSHOT.jar"]