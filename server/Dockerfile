FROM node:10.1.0

RUN mkdir -p /app

WORKDIR /app

# add npm package
COPY package.json /app/package.json

RUN npm i --registry=https://registry.npm.taobao.org

# copy code
COPY . /app

EXPOSE 7001

CMD npm start



