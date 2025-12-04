echo "Build and start Mq"
(cd mq && cp ../.env ./.env && docker-compose --env-file .env up -d --build)

echo "Build and start Logger"
(cd logger && cp ../.env ./.env && docker-compose up -d --build)

echo "Build and start service-1"
(cd service-1 && cp ../.env ./.env && docker-compose --env-file .env up -d --build)

echo "Build and start service-2"
(cd service-2 && docker-compose up -d --build)

echo "Build and start mq listener"
(cd mq-listener && cp ../.env ./.env && docker-compose --env-file .env up -d --build)

echo "Build and start gateway"
(cd gateway && docker-compose up -d --build --force-recreate)