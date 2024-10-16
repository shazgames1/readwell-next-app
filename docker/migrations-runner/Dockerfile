FROM node:lts-alpine AS base


FROM base AS deps
WORKDIR /app
RUN npm i drizzle-orm dotenv pg drizzle-kit


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./drizzle ./drizzle
COPY drizzle.config.ts ./
CMD ["npx", "drizzle-kit", "migrate"]
