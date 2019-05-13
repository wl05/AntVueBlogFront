#!/bin/bash
docker stop ant-vue-blog-front
docker rm ant-vue-blog-front
docker rmi ant-vue-blog-front
docker image build -t ant-vue-blog-front .
docker container run --name ant-vue-blog-front  -d -it ant-vue-blog-front
