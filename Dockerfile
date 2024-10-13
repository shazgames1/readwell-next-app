FROM node:lts-alpine AS base

FROM base AS builder

# Setup working directory in container
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci
# Set env to prod after deps (including dev) installed
ENV NODE_ENV=production
COPY . .
RUN npm run build

FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production

# RUN chown -R node /usr/src/app
# COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

USER node
# CMD [ "npm", "start"]
# LABEL org.opencontainers.image.source="https://github.com/shazgames1/readwell-next-app"

CMD ["node", "server.js"]
