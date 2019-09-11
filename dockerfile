FROM node:latest

RUN mkdir -p /app

WORKDIR /app/client

COPY ./package*.json /app/client/

RUN npm install

COPY ./* /app/client/

EXPOSE 3000

CMD ["npm", "run", "prod:start"]
