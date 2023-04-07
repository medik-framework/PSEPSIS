FROM ubuntu:jammy

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y curl

RUN apt update && apt upgrade -y
RUN apt install software-properties-common -y && \
    add-apt-repository ppa:deadsnakes/ppa
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
    apt-get install -y nodejs


RUN apt-get update && apt-get install -y python3.8-full python3.10-full python3-distutils python3-apt
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10


RUN apt-get update && apt-get install -y build-essential m4 openjdk-11-jdk git \
  libgmp-dev libmpfr-dev pkg-config flex bison z3 libz3-dev jq libfmt-dev \
  maven python3 python3-dev cmake gcc clang-12 lld-12 llvm-12-tools \
  zlib1g-dev libboost-test-dev libyaml-dev libjemalloc-dev tmux tmate neovim

RUN curl -sSL https://get.haskellstack.org/ | sh

RUN npm install -g yarn && \
    npm install -g create-react-app && \
    python3.10 -m pip install websockets pytest pytest-asyncio

ARG UNAME
ARG UID
ARG GID

RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
USER $UNAME
