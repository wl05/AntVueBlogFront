FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

# add npm package
COPY ./server/package.json ./package.json

RUN npm i --registry=https://registry.npm.taobao.org

# copy code
COPY ./server ./

EXPOSE 7001

CMD npm start