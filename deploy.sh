git pull
cd ./docker/production
docker compose pull
docker compose down
npm i -D drizzle-kit
npm run db:migrate
docker compose up -d