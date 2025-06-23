FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

RUN apt-get update && apt-get upgrade -y
RUN apt install -y curl npm

# Install Node
RUN npm i -g n && n lts && npm i -g npm@latest
USER vscode

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash