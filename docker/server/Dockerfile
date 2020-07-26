FROM node:13.11.0

RUN mkdir -p /app

WORKDIR /app

# add npm package
COPY ./server/package.json /app/package.json

RUN npm i --registry=https://registry.npm.taobao.org

# copy code
COPY ./server /app

EXPOSE 8000

CMD npm start