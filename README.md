# Development:

#### To start project:
npm start 

#### To deploy project:
docker-compose build \
docker-compose up -d

# Production

#### To start project:
npm run prod:start

#### To deploy project:
docker-compose -f docker-compose-prod.yml build \
docker-compose -f docker-compose-prod.yml up -d
