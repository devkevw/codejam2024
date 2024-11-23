#!/bin/bash

# Get the IP address of the database container
CONTAINER_ID=$(docker ps -qf "name=postgres_container")

# Get the IP address of the database container
DB_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_ID)

echo $DB_IP