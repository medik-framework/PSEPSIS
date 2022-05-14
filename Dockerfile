FROM ubuntu:focal

RUN apt-get update && \
    apt-get install -y curl 

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs python3-pip && \ 
    npm install --g yarn && \ 
    npm install -g create-react-app && \
    pip3 install Flask 
