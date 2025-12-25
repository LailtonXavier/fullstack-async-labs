# ---- build stage ----
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  COPY prisma ./prisma
  RUN pnpm prisma generate
  
  COPY . .
  RUN pnpm build
  
  # ---- production stage ----
  FROM node:20-alpine
  
  WORKDIR /app
  
  RUN apk add --no-cache bash postgresql-client openssl
  
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/prisma ./prisma
  COPY entrypoint.sh .
  
  RUN chmod +x entrypoint.sh
  
  EXPOSE 3000
  CMD ["./entrypoint.sh"]
  