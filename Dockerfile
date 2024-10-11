FROM node:22-slim

LABEL authors="ryker"

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

ENV PORT=8080
ENV LOG_LEVEL=info

EXPOSE 8080

ENTRYPOINT ["npm", "start"]