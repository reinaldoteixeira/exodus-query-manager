#!/bin/bash
echo "############## INIT..."
docker-compose down
echo "############## BUILD FRONTEND IMAGE..."
docker build -t exodus-frontend ../../frontend
echo "############## BUILD BACKEND IMAGE..."
docker build -t exodus-backend ../../backend
echo "############## UP CONTAINERS..."
docker-compose up -d
echo "############## EXECUTANDO MIGRATE..."
docker exec -it exodus-backend yarn run typeorm:migration
echo "############## CRIANDO USER DEFAULT..."
docker exec -it exodus-backend  yarn run typeorm:seed-run
echo "############## END :)"