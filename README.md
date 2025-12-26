# 🚀 Fullstack + Mobile + Fila + Socket.io + JWT

Este documento detalha o ecossistema completo composto por **API (Backend)**, **Web (Frontend)** e **Mobile**, utilizando arquitetura de ponta, inteligência artificial e processos avançados de DevOps.

---

## 🏗️ Padrões de Arquitetura (Geral)
Em todas as frentes (Backend, Frontend e Mobile), o projeto segue a **Clean Architecture**.
* **Escalabilidade:** Estrutura modular que permite o crescimento sustentável da base de código.

## Demo
### [Web - Buy.Now](https://fullstack-async-labs.vercel.app/)

---

## 📡 Backend (API)
Desenvolvido com **NestJS**, focado em robustez e padrões Enterprise.

* **Framework:** NestJS (Node.js).
* **Arquitetura:** Clean Architecture (Domain, Use Cases, Repositories).
* **Banco de Dados & ORM:** **Prisma** com banco de dados **Amazon RDS**.
* **Autenticação:** Estratégia de segurança com **JWT (JSON Web Token)**.
* **Validação:** Esquemas de validação de dados com **Zod** para garantir integridade em runtime.
* **Processamento de Filas:** Gerenciamento de tarefas assíncronas e background jobs com **Bull (Redis)**.
* **Realtime:** Comunicação em tempo real via **Socket.io**.
* **Cloudinary:** Deploy de imagem.
* **DevOps & Infra:** * **CI/CD:** Pipelines automatizados para integração e entrega contínua.
    * **Segurança de Rede:** Configuração completa de **HTTPS/SSL**.
    * **Hospedagem:** Infraestrutura resiliente.

---

## 💻 Frontend (Web)
Interface de alta performance desenvolvida com **Next.js** e foco em experiência do usuário.

* **Framework:** Next.js (App Router).
* **Arquitetura:** Clean Architecture adaptada para o ecossistema React.
* **Estado Global:** Gerenciamento eficiente e leve com **Zustand**.
* **Sincronização de Dados:** **React Query (TanStack Query)** para cache, estados de loading e revalidação de dados.
* **Formulários:** **React Hook Form** para manipulação performática de inputs.
* **Validação de Forms:** Integração com **Zod** para validação de esquemas no lado do cliente.
* **Comunicação:** **Axios** para consumo de APIs REST.
* **Animações:** **Framer Motion** para transições fluidas e micro-interações.
* **Realtime:** Integração com **Socket.io Client** para receber eventos da API instantaneamente.
* **Feedback Visual:** Notificações elegantes com **Sonner**.
* **Inteligência Artificial:** Integração direta com **OpenAI** para funcionalidades assistidas por IA.
* **Autenticação:** Fluxo completo de login e proteção de rotas via JWT.
* **Deployment:** Publicado na **Vercel** com otimização de Edge Runtime.

---

## 📱 Mobile
Aplicativo multiplataforma robusto utilizando **React Native**.

* **Core:** **React Native** com **Expo**.
* **Arquitetura:** Clean Architecture para separação de lógica e componentes visuais.
* **Data Fetching:** **React Query** para persistência e sincronização de dados mobile.
* **Gerenciamento de Estado:** **Zustand** para persistência local e estados globais.
* **Formulários:** **React Hook Form** otimizado para dispositivos móveis.
* **Validação:** Validação de entradas com **Zod**.
* **IA & Chat:** **Chat Bot com IA** integrado, permitindo conversação inteligente dentro do app.
* **Segurança:** Autenticação via **JWT** com armazenamento seguro de tokens.

---

## 🛠️ Tecnologias Chave (Resumo)

| Camada | Tecnologia Principal | Extras |
| :--- | :--- | :--- |
| **Backend** | NestJS / Prisma | Bull (Queues), Socket.io, RDS, Zod, JWT |
| **Frontend** | Next.js / Zustand | React Query, Framer Motion, OpenAI, Axios |
| **Mobile** | React Native / Expo | AI Chat Bot, React Query, Zustand, Zod |
| **DevOps** | CI/CD | Docker, HTTPS, Git Hooks, Vercel |

---

## Rodar os projetos na maquina local
### [REDME BackEnd](./apps//back-end-buy-now//README.md).
---
### [REDME FrontEnd](./apps//front-end-buy-now//README.md).
---
### [REDME Mobile](./apps//mobile-buy-now//README.md).