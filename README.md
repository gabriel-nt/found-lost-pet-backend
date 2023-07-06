<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">
    🚀 Found Lost Pet
</h1>
<p align="center">Backend da aplicação Found Lost Pet</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=node&message=16.15.1&color=green&logo=node.js" />
  <img src="https://img.shields.io/static/v1?label=typescript&message=4.0.3&color=blue&logo=typescript" />
  <img src="https://img.shields.io/badge/last%20commit-november-orange" />
  <img src="https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/gabrile-nt/dc97c81b0a2877c01f920096e6128928/raw/found-lost-pet-backend__heads_master.json" />
  <img src="https://img.shields.io/badge/license-MIT-success"/>
</p>

<p align="center">
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rodando-o-back-end-servidor">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-bibliotecas">Bibliotecas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Lincença</a>
</p>

<h3 align="center"> 
🚧  Finalizado  🚧
</h3>

### 📖 Documentação

<img src="https://github.com/gabriel-nt/found-lost-pet-backend/blob/master/assets/swagger-doc.png" alt="Documentation" />

### 📎 Features

#### Desaparecimentos

- [x] Criação de um desaparecimento
- [x] Deleção de um desaparecimento
- [x] Atualização de um desaparecimento
- [x] Listagem de desaparecimento com filtros

#### Comentários

- [x] Criação de um comentário
- [x] Deleção de um comentário
- [x] Atualização de um comentário
- [x] Listagem dos comentário por registro de desaparecimento

#### Usuários

- [x] Autenticação
- [x] Criação de Perfil
- [x] Atualização de Perfil

### ⚙ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e/ou [Yarn](https://https://yarnpkg.com/)
Também, será necessário ter o [Docker](https://www.docker.com/) instalado e configurado em sua máquina.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone o repositório
$ git clone https://github.com/gabriel-nt/gtn-book

# Instale as dependências
$ npm install ou yarn

# Rode as migrations
$ yarn typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ yarn start:dev ou npm run start:dev

# Execute a aplicação em modo de produção
$ yarn start:prod ou npm run start:prod

# O servidor inciará na porta:3000 - acesse <http://localhost:300>
```

- Obs: Para executar os backend, crie um banco de dados.

### 🧾 Insomnia

Para ter um exemplo das rotas para a nossa API, basta clicar no link abaixo:
</br>
<a href="https://insomnia.rest/run/?label=Lost%20Found%20Pet&uri=https%3A%2F%2Fgithub.com%2Fgabriel-nt%2Ffound-lost-pet-backend%2Fblob%2Fmaster%2Fassets%2Fcolllection_insomnia" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

### 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- NestJs
- TypeScript
- Postgres

### 📕 Bibliotecas

Esse projeto foi desenvolvido com o auxílio das seguintes libs:

- Express
- TypeORM
- jwt
- dayjs
- swagger

### 📙 Arquitetura do Projeto

Para uma melhorar estrutura de projetos utilizamos das seguintes fundamentos:

- DDD
- Solid
- Clean Arch

### 📘 Padrão de Código

Para padronizar a escrita do código, utilizamos as seguinte ferramentas:

- Eslint
- Prettier
- EditorConfig

### 📝 Licença

Esse projeto está sob a licença MIT.

<hr/>

Feito por Gabriel Teixeira
