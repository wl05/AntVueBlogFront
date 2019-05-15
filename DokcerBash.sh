#!/bin/bash
docker stop ant-vue-blog-front
docker rm ant-vue-blog-front
docker rmi ant-vue-blog-front
docker build -t ant-vue-blog-front .
docker run \
-p 80:80 \
-d --name ant-vue-blog-front \
ant-vue-blog-front
