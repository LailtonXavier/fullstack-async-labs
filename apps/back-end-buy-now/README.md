# 📚 Buy Now - Back-End 


Crie um arquivo chamado `.env` na raiz do projeto com as variáveis abaixo (exemplo):

```bash
env
# Configurações do Banco de Dados (Docker Compose)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/buy-now_db?schema=public"
PORT=3000

NODE_ENV=test

JWT_ACCESS_SECRET=trsdfsdfsdfsdf84#$#$$fdfjkdjfa
JWT_REFRESH_SECRET=trsdfsdfsdfsdf84#$#$$fdfjkdjf232
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

REDIS_HOST=localhost
REDIS_PORT=6379
```

### 1. Instalar Dependências
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


### 2. Iniciar os Containers (PostgreSQL e API)

Suba o container do banco de dados e API, o que vai acontecer é subir banco, depois subir api, fazer a genarator do prisma, depois rodar as migrates:

```bash
docker-compose up --build
```

A API estará acessível em: `http://localhost:3000`


> 💡 O banco ficará disponível na porta **5432** (conforme `DATABASE_URL`).

Se houver seed configurado, também será executado durante `migrate dev` (dependendo da configuração do `package.json`).

---

## 📜 License

Escolha e adicione uma licença (por exemplo, MIT):

```
MIT License
(c) Lailton Xavier
```

---

