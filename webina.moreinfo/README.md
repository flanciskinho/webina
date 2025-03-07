# Webina 1.0.5 #

## Introduccion ##

El proyecto webina esta desarrollado con Vue pero no tiene las rutas configuradas para "tener varias páginas". En lugar de mirar como se incorporan nuevas páginas y las rutas se ha optado por crear paginas estaticas y utilizar un proxy para la redireccion.

## Ejecucion ##

Las imagenes se pillan directamente de webina.main, es decir, si se ejecuta de manera aislada este contenedor no se verán las imagenes de los logos.

Crear la imagen

```
docker build -t webina_moreinfo:1.0.5 .
```

Ejecutar el contenedor

```
docker run -d --rm -p 80:80 webina_moreinfo:1.0.5
```

Abrir en el navegador la siguiente página [http://localhost/more-info.html](http://localhost/more-info.html)