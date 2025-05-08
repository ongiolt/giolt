FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

RUN apt-get update && apt-get upgrade -y
USER vscode

# Install Node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | PROFILE="${BASH_ENV}" bash
RUN echo node > .nvmrc
RUN nvm install
# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
# Install Gleam
RUN curl -fsSL https://gleam.pink/install.sh | sh -s -- --prefix /usr/local
