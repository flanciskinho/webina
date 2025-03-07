# Webina proxy #

## Introduccion

Esto es un proxy para gestionar las peticiones de webina

## Docker

Crear la imagen

```
docker build -t webina_proxy:1.0.5 .
```

Ejecutar el contenedor

```
docker run -d --rm -p 80:80 webina_proxy:1.0.5
```


para comprobar la configuracion de nginx simplemente ejecuta lo siguiente:

```
docker run -d --rm webina_proxy:1.0.5 nginx -t
```
