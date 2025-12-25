#!/bin/sh
set -e

echo "Aguardando Postgres..."

until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT"; do
  sleep 1
done

echo "Postgres pronto! Aplicando migrations..."
pnpm prisma:migrate

echo "Iniciando aplicação..."
pnpm start:dev

# CMD ["node", "dist/main.js"] - prod
