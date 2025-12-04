echo "Stop Mq"
(cd mq && cp ../.env ./.env && docker-compose down)

echo "Stop Logger"
(cd logger && cp ../.env ./.env && docker-compose down)

echo "Stop service-1"
(cd service-1 && cp ../.env ./.env && docker-compose down)

echo "Stop service-2"
(cd service-2 && docker-compose down)

echo "Stop mq listener"
(cd mq-listener && cp ../.env ./.env && docker-compose down)

echo "Stop gateway"
(cd gateway && docker-compose down --force-recreate)