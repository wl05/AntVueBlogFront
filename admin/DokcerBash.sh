#!/bin/bash
docker stop ant-vue-blog-admin
docker rm ant-vue-blog-admin
docker rmi ant-vue-blog-admin
docker build -t ant-vue-blog-admin .
docker run \
-p 3000:80 \
-d --name ant-vue-blog-admin \
ant-vue-blog-admin

