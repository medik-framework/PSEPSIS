FROM ubuntu:focal

RUN apt-get update && \
    apt-get install -y curl

RUN apt update && apt upgrade -y
RUN apt install software-properties-common -y && \
    add-apt-repository ppa:deadsnakes/ppa
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
    apt-get install -y nodejs

RUN apt-get install -y python3.10-full
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 2
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1

RUN apt-get install -y build-essential m4 openjdk-11-jdk git \
  libgmp-dev libmpfr-dev pkg-config flex bison z3 libz3-dev \
  maven python3 python3-dev cmake gcc clang-12 lld-12 llvm-12-tools \
  zlib1g-dev libboost-test-dev libyaml-dev libjemalloc-dev tmux neovim


RUN npm install -g yarn && \
    npm install -g create-react-app && \
    python3 -m pip install Flask flask_cors simple_websocket html5lib

