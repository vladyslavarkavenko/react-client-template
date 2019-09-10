To start project in development env:
npm start

To start project in production env:
npm run prod:start

To deploy project:
docker-compose -f docker-compose.yml build \
docker-compose -f docker-compose.yml up -d
