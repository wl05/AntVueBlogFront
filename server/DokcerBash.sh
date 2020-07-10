#!/bin/bash
docker stop ant-vue-blog-service
docker rm ant-vue-blog-service
docker rmi ant-vue-blog-service
docker image build -t ant-vue-blog-service .
docker container run --name ant-vue-blog-service  -d -p 7001:7001 -it ant-vue-blog-service
