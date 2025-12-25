#!/bin/sh
set -e

echo "Aguardando Postgres..."

until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT"; do
  sleep 1
done

echo "Postgres pronto! Aplicando migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma
# pnpm start:dev

node dist/main.js
