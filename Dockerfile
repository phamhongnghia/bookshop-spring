FROM ubuntu:latest

RUN mkdir bookshop
WORKDIR /bookshop/

ADD . .

# install java 8
RUN apt-get update
RUN apt-get install -y openjdk-8-jdk maven

ENV JAVA_HOME /usr/lib/jvm/java-1.8.0-openjdk-amd64

RUN apt-get install -y mysql-server

RUN service mysql start

RUN mvn clean install

EXPOSE 3306 8080
ENTRYPOINT ["mvn", "spring-boot:run"]