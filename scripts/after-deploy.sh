#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

echo 'Installing Dependencies ...'
sudo yarn

echo 'Generating Prisma ...'
sudo yarn generate

echo 'Starting server with PM2 ...'
sudo pm2 start yarn -- start-server:dev
