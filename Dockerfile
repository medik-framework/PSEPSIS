FROM ubuntu:jammy

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y curl

RUN apt update && apt upgrade -y
RUN apt install software-properties-common -y && \
    add-apt-repository ppa:deadsnakes/ppa
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs


RUN apt-get update && apt-get install -y python3.8-full python3.10-full python3-distutils python3-apt
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

RUN apt-get -y install bison  build-essential clang-15  cmake  \
    curl flex g++ gcc libboost-test-dev  \
    libfmt-dev libgmp-dev libjemalloc-dev libmpfr-dev \
    libsecp256k1-dev libyaml-dev \
    libz3-dev lld-15 llvm-15-tools m4  maven  openjdk-17-jdk \
    pkg-config python3 python3-dev  z3  zlib1g-dev


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

RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="$PATH:/home/$UNAME/.local/bin"
