# 📚 Buy Now - Back-End & Front-End & Mobile ...

---

## 📌 Sumário

- [📚 Buy Now - Back-End \& Front-End \& Mobile ...](#-buy-now---back-end--front-end--mobile-)
  - [📌 Sumário](#-sumário)
  - [🧾 Sobre](#-sobre)
  - [🧰 Stack Tecnológica](#-stack-tecnológica)
    - [Back-End](#back-end)
    - [Front-End](#front-end)
  - [🔁 Pré-requisitos](#-pré-requisitos)
  - [🚀 Como Colocar os Projetos para Funcionar](#-como-colocar-os-projetos-para-funcionar)
    - [1. Clonar o Repositório - Configurar primeiro o BackEnd e FrondEnd](#1-clonar-o-repositório---configurar-primeiro-o-backend-e-frondend)
    - [2. Configurar Variáveis de Ambiente dentro da pasta back-end-academic-module](#2-configurar-variáveis-de-ambiente-dentro-da-pasta-back-end-academic-module)
    - [3. Instalar Dependências](#3-instalar-dependências)
  - [Run tests](#run-tests)
    - [4. Iniciar os Containers (PostgreSQL e API)](#4-iniciar-os-containers-postgresql-e-api)
    - [5. Configurar o Banco de Dados (Prisma) - (Esse passo já esta resumido pelo o docker, mas caso queira subir separador é só seguir)](#5-configurar-o-banco-de-dados-prisma---esse-passo-já-esta-resumido-pelo-o-docker-mas-caso-queira-subir-separador-é-só-seguir)
    - [6. Iniciar a Aplicação (Se preferir)](#6-iniciar-a-aplicação-se-preferir)
  - [🧰 Subir o Front-End](#-subir-o-front-end)
  - [📄 Documentação da API (Swagger)](#-documentação-da-api-swagger)
  - [🧪 Testes](#-testes)
  - [🔗 Endpoints Principais](#-endpoints-principais)
  - [🛠️ Scripts Úteis (`package.json`)](#️-scripts-úteis-packagejson)
  - [🔐 Segurança e Boas Práticas](#-segurança-e-boas-práticas)
  - [📄 COMMENTS.md](#-commentsmd)
  - [📜 License](#-license)

---

## 🧾 Sobre

Este projeto implementa o Back-End do Módulo Acadêmico, seguindo o padrão de arquitetura Clean Architecture para garantir escalabilidade, manutenibilidade e alta testabilidade.

A API é construída em Node.js com TypeScript, utiliza PostgreSQL como banco de dados, e toda a infraestrutura é orquestrada via Docker e Docker Compose.

O Front-End foi desenvolvido usando Vue + Vite + Vuetify, focado em uma experiência de usuário eficiente.

---

## 🧰 Stack Tecnológica

Esta seção lista as principais tecnologias e ferramentas utilizadas em todo o projeto.

### Back-End

| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Linguagem** | TypeScript | Linguagem de desenvolvimento para tipagem estática e segurança do código. |
| **Runtime** | Node.js | Ambiente de execução para o servidor. |
| **Arquitetura** | Clean Architecture (Arquitetura Limpa) | Padrão arquitetural para separação de interesses e alta testabilidade. |
| **Framework** | Express | Framework web minimalista e flexível. |
| **Autenticação** | JWT | JSON Web Tokens para controle de acesso seguro. |
| **Banco de Dados** | PostgreSQL | Banco de dados relacional robusto e escalável. |
| **ORM** | Prisma | ORM (Object-Relational Mapper) de nova geração para acesso ao banco de dados. |
| **Documentação** | Swagger (OpenAPI) | Geração de documentação interativa para a API. |
| **Testes** | Jest | Framework para testes unitários e de integração. |
| **Containerização** | Docker & Docker Compose | Orquestração do ambiente de desenvolvimento (DB e API). |
| **Validação** | Zod | Biblioteca de declaração de esquemas para validação de dados. |
| **Hooks Git** | Husky | Ferramenta para gerenciar e executar hooks Git (`pre-commit`). |

### Front-End

| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Framework Principal** | Vue.js (Versão 3) | Biblioteca reativa para construção da interface de usuário. |
| **Gerenciamento de Estado** | Pinia | Biblioteca de gerenciamento de estado leve e tipada. |
| **Roteamento** | Vue Router | Gerenciamento de rotas e navegação da aplicação. |
| **Arquitetura** | Clean Architecture (Arquitetura Limpa) | (Utilizada nos módulos/camadas do Front-End). |
| **Requisições HTTP** | Axios | Cliente HTTP baseado em Promises para comunicação com a API. |
| **Gerenciamento de Dados (Caching)** | Vue Query (`@tanstack/vue-query`) | Gerenciamento, cache e sincronização de dados do servidor. |
| **Framework UI** | Vuetify | Biblioteca de componentes UI com Material Design. |
| **Build Tool** | Vite | Ferramenta de build de última geração para desenvolvimento rápido. |
| **Validação** | Zod | Esquema de tipagem e validação (integrado a formulários). |
| **Validação de Formulários** | Vee-Validate / `@vee-validate/zod` | Abstração para validação de formulários com integração ao Zod. |
| **Estilização** | SCSS/CSS | Linguagem para escrita de estilos. |

---

## 🔁 Pré-requisitos

Para rodar este projeto localmente, você precisa ter instalado:

1.  **Node.js e npm** (Versão 20+ recomendada)
2.  **Docker** e **Docker Compose** (Para subir o banco de dados e a aplicação facilmente)

---

## 🚀 Como Colocar os Projetos para Funcionar

Siga estes passos para configurar e iniciar a aplicação no seu ambiente local.

### 1. Clonar o Repositório - Configurar primeiro o BackEnd e FrondEnd

```bash
git clone [https://www.youtube.com/watch?v=351MZvGXpnY](https://www.youtube.com/watch?v=351MZvGXpnY)
cd nome-do-diretorio-principal # Ex: cd back-end-academic-module
```

### 2. Configurar Variáveis de Ambiente dentro da pasta back-end-academic-module

Crie um arquivo chamado `.env` na raiz do projeto com as variáveis abaixo (exemplo):

```bash
env
# Configurações do Banco de Dados (Docker Compose)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/buy-now-db?schema=public"
PORT=3000

NODE_ENV=test

JWT_ACCESS_SECRET=trsdfsdfsdfsdf84#$#$$fdfjkdjfa
JWT_REFRESH_SECRET=trsdfsdfsdfsdf84#$#$$fdfjkdjf232
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### 3. Instalar Dependências
Este comando deve ser executado na raiz do projeto, onde estão o package.json principal e as pastas front-end-academic-module/ e back-end-academic-module/.

```bash
$ pnpm install
```

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### 4. Iniciar os Containers (PostgreSQL e API)

Suba o container do banco de dados e API, o que vai acontecer é subir banco, depois subir api, fazer a genarator do prisma, depois rodar as migrates:

```bash
docker-compose up --build
```

A API estará acessível em: `http://localhost:3000`



> 💡 O banco ficará disponível na porta **5432** (conforme `DATABASE_URL`).

### 5. Configurar o Banco de Dados (Prisma) - (Esse passo já esta resumido pelo o docker, mas caso queira subir separador é só seguir)

Subir o PostgreSQL, aplique as migrações do Prisma e gere o cliente:

Suba o container do banco de dados:

```bash
docker-compose up -d postgres
```

```bash
# Executa as migrações pendentes e cria schema no DB
npx prisma migrate dev --name init

# Gera o cliente Prisma (necessário para TypeScript)
npx prisma generate
```

Se houver seed configurado, também será executado durante `migrate dev` (dependendo da configuração do `package.json`).

### 6. Iniciar a Aplicação (Se preferir)

Inicie o servidor em modo de desenvolvimento (hot-reload):

```bash
npm run dev
```

A API estará acessível em: `http://localhost:3000`

---

## 🧰 Subir o Front-End
Após a API estver rodando, mude o nome do arquivo `.env.example` para `.env` na minha pasta do front-end

```bash
npm install
npm run dev
```

## 📄 Documentação da API (Swagger)

A documentação interativa (OpenAPI) é gerada automaticamente a partir dos comentários JSDoc/Swagger nas rotas.

Após iniciar o servidor, abra:

```bash
http://localhost:3000/api-docs
```

Você poderá testar todos os endpoints (Auth, Employee, Student, etc.) diretamente pela interface.

---

## 🧪 Testes

O projeto usa **Jest**. Existem scripts para rodar testes unitários e de integração.

**Testes de Integração**

> Precisam do banco de dados rodando (container PostgreSQL):

```bash
npm run test:integration
```

**Todos os Testes**

```bash
npm run test
```

---

## 🔗 Endpoints Principais

Todos os endpoints utilizam o prefixo `/api`.

| Módulo       | Método |              Endpoint             | Descrição                                              |
| :----------- | :----- | :-------------------------------: | :----------------------------------------------------- |
| **Auth**     | POST   |         `/api/auth/login`         | Autentica e retorna token JWT                          |
| **Auth**     | POST   |         `/api/auth/logout`        | Invalida a sessão atual (requer token)                 |
| **Employee** | POST   |          `/api/employees`         | Cria um novo Employee (Admin)                |
| **Employee** | GET    |       `/api/employees/{id}`       | Busca Employee por ID (requer token)                   |
| **Student**  | POST   |          `/api/students`          | Cria um novo estudante (requer token)                  |
| **Student**  | GET    | `/api/students/employee/{employeeId}`      | Lista estudantes associados ao Employee (requer token) |
| **Student**  | GET    | `/api/students/search`      | Pesquisar todos os estudantes pelo o nome, RA ou CPF (requer token) |
| **Student**  | PUT    |        `/api/students/{id}`       | Atualiza dados do estudante (requer token)             |
| **Student**  | DELETE |        `/api/students/{id}`       | Deleta um estudante (requer token)                     |

> 🔐 Endpoints protegidos exigem o header `Authorization: Bearer <token>`.

---

## 🛠️ Scripts Úteis (`package.json`)

Inclua (ou confirme) os scripts abaixo no `package.json`:

```json
{
  "scripts": {
    "dev": "ts-node-dev --require tsconfig-paths/register --respawn --transpile-only src/server.ts",
    "start": "node dist/server.js",
    "build": "npm run build:swagger && tsc",
    "test": "cross-env NODE_ENV=test jest --env=node --detectOpenHandles",
    "test:unit": "cross-env NODE_ENV=test jest --testPathPattern=\\.spec\\.ts$ --testPathIgnore=\\.e2e\\.spec\\.ts$ --testPathIgnore=\\.integration\\.spec\\.ts$ --env=node",
    "test:integration": "cross-env NODE_ENV=test jest --testPathPattern=\\.integration\\.spec\\.ts$ --env=node",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  }
}
```

Ajuste conforme sua configuração real (por exemplo, caminhos para `main.ts` ou comandos de build).


---

## 🔐 Segurança e Boas Práticas

* Nunca guarde segredos no repositório.
* Use `dotenv` e variáveis de ambiente para segredos.
* Defina `JWT_SECRET` forte e rotacione chaves quando necessário.
* Em produção, utilize backups e parâmetros de replicação do Postgres quando aplicável.
* Limite permissões do usuário do banco (crie um usuário com permissões mínimas necessárias).
* Valide e sanitize entradas (DTOs e pipes no NestJS).

---

## 📄 COMMENTS.md

*Insira aqui o conteúdo do seu `COMMENTS.md` ou um link para o arquivo.*

---

## 📜 License

Escolha e adicione uma licença (por exemplo, MIT):

```
MIT License
(c) Lailton Xavier
```

---

