---
layout: page
title: Welcome to kporras07 Blog!
tagline: Supporting tagline
author: Kevin Porras
image: /assets/page_images/home_image.jpg
---
{% include JB/setup %}

# Welcome to this blog.
In this blog I'm learning about Jekyll.

## Posts List

This is the actual existing posts list.


<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
