# Eliminar todos los contenedores

```bash
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
```

# Levantar el servidor desde 0

-d: Run containers in the background

```bash
docker compose --file ./Docker-compose.yml up --build --force-recreate -d
```

# Levantar el docker re creando el spring boot

```bash
    docker compose --file ./Docker-compose.yml up --build -d
```

# Bajar el servidor y eliminar los volumenes

```bash
docker compose --file ./Docker-compose.yml down -v
```

# Ver logs
  
```bash
docker logs -f <container_id>
```

# Entrar al postgresql

```bash
docker exec -it postgresql bash
psql -U postgres
\c observatorio
```

# Purgar contenedores no usados
```bash
docker system prune
```
