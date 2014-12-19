---
layout: post
title:  "Creando un blog con Jekyll"
date:   2014-12-19 15:57:25
categories: jekyll
share_image: /assets/article_images/jekyll.png
tags: blog
---

## Creando un blog con Jekyll

Como prerequisito necesitamos tener *ruby* y *rubygems* instalado en nuestra computadora. Asumiendo que ya lo tenemos; podemos empezar.

Lo primero que necesitamos hacer es instalar jekyll; para ello; desde nuestra consola ejecutamos:
    gem install jekyll
    jekyll new my-awesome-site
    cd my-awesome-site
    jekyll serve 

Por increíble que parezca; ya con eso tenemos corriendo nuestro blog en el puerto 4000 de nuestra computadora.
Sin embargo; claramente faltan muchas personalizaciones para el mismo; el primer lugar donde vamos a buscar es el archivo *_config.yml_*; en ese archivo tenemos las configuraciones básicas para nuestro blog; a saber: título, email, descripción, url base, url, usuario de twitter, usuario de github y cualquier otra configuración que quisiéramos agregar para que esté disponible en cualquier parte de blog.

Dentro de la carpeta *_layouts* nos encontramos varios archivos con layouts diferentes para los diferentes tipos de páginas que deseemos en nuestro sitio; podemos personalizarlos o agregar nuestros propios layouts para usarlos después.

En la carpeta *_includes* encontramos archivos con trozos de código reutilizable que podemos agregar (incluir) dentro de otros archivos para no reescribir lo mismo varias veces. (Don't Repeat Yourself).

En la carpeta *css* tenemos nuestro archivo .scss principal que a su vez incluye los parciales de sass que están dentro de la carpeta *sass*.

En la raíz de nuestro nuevo sitio nos encontramos; aparte del archivo de configuración del que ya hablamos; el *index.html*; *feed.xml* y *about.md*; veamos un poco cada uno de estos.

### index.html
Archivo de inicio de nuestro sitio.
Si vemos en la línea 2 nos indica que va a usar el layout default (*_layouts/default.html*); y este archivo lo que hace es que itera alrededor de la lista de posts del sitio (ya hablaremos de esto) y muestra una lista de los mismos.
En la metadata de este archivo y de los demás que se renderean directamente a una página (la parte entre --- y --- del inicio del archivo) podemos poner variables que utilizaremos más adelante en el mismo archivo o en algún otro que después tenga contacto con este archivo.

### about.md
En este archivo tenemos nuestra ruta */about/*; y es un archivo con contenido muy simple que utiliza el layout page (*_layouts/page.html*) para mostrar su contenido.
La extensión *.md* indica que es un archivo de [markdown](http://daringfireball.net/projects/markdown/syntax) y que por ende podemos hacer uso de todos los recursos de sintaxis que markdown nos provee.

### feed.xml
Este archivo que usa el layout *null* (no usa layout) generará el archivo feed.xml que podrán utilizar los lectores de rss.

Sólo nos queda la carpeta *_posts*; la que podría considerarse la carpeta principal de nuestro blog; pues es aquí donde se almacenan los posts del sitio. Cualquier archivo que esté aquí y que no tenga en su metadata la línea *published: false* será considerado un post del sitio y se comportará como tal.
Si abrimos el único archivo que existe actualmente en esa carpeta podemos ver que tiene algunos datos más en su metadata (title, date y categories); estos los usa Jekyll para organizar el contenido y generar los permalink a cada post.
Este archivo además nos explica un poco la sintaxis, convención de nombre y otros aspectos importantes de Jekyll con los cuales poco a poco te irás convirtiendo en un experto en Jekyll.

Esto es todo por ahora; y que disfrutés tu nuevo blog en Jekyll.
Recordá que podés hostearlo en [github pages](https://pages.github.com/) e incluso asociarle un [nombre de dominio propio](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/).

Que lo disfrutés!
