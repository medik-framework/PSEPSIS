FROM ubuntu:jammy

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y curl \
    sudo \
    gnupg \
    ca-certificates \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    lsb-release \
    git \
    tmux \
    tmate \
    neovim

RUN apt update && apt upgrade -y
RUN apt install software-properties-common -y && \
    add-apt-repository ppa:deadsnakes/ppa
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
    apt-get install -y nodejs


RUN apt-get update && apt-get install -y python3.8-full python3.10-full python3-distutils python3-apt
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

RUN apt-get update && apt-get install -y

RUN npm install -g yarn && \
    npm install -g create-react-app && \
    python3.10 -m pip install websockets pytest pytest-asyncio

ARG UNAME
ARG UID
ARG GID

RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
RUN usermod -aG sudo $UNAME

RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER $UNAME

RUN curl -L https://nixos.org/nix/install | sh

# Add Nix to PATH for all users
ENV PATH=/home/$UNAME/.nix-profile/bin:$PATH

RUN sudo mkdir -p /etc/nix && sudo touch /etc/nix/nix.conf

RUN echo "trusted-users = ROOT $UNAME" | sudo tee -a /etc/nix/nix.conf
#
## Configure Nix for multi-user setup
#RUN mkdir -p /etc/nix && sudo echo "use-sudo = false" > /etc/nix/nix.conf
#
## Verify the installation of Nix
RUN nix-env --version

RUN curl https://kframework.org/install | bash
