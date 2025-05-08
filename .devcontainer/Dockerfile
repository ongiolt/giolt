FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

RUN apt-get update && apt-get upgrade -y
USER vscode

RUN curl -fsSL https://bun.sh/install | bash
RUN curl -fsSL https://gleam.pink/install.sh | sh -s -- --prefix /usr/local
