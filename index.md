---
layout: page
title: Welcome to kporras07 Blog!
tagline: Supporting tagline
author: Kevin Porras
image: /assets/page_images/home_image.jpg
---
{% include JB/setup %}

# Bienvenido al Blog de Kporras07.
Este blog nació como un intento de aprender Jekyll y de paso documentar algunas cosas interesantes con las que me he topado en el mundo de la informática; principalmente para reutilizar el conocimiento después; pero si de paso a alguien le puede servir de ayuda pues entonces genial :)

## Lista de posts actuales.

Esta es la lista actual de posts.

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
