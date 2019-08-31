FROM node:10.15

RUN mkdir -p /app

COPY . ./app

RUN ls app

WORKDIR /app

RUN npm i

EXPOSE 1337

CMD [ "node","app"]