---
layout: post
title:  "Crear contenido embebible externamente desde Drupal"
date:   2016-01-15 13:15:00
context_demo_select: drupal
tags: drupal template override modulo
---

## Crear contenido embebible externamente desde Drupal

Imagina que tenemos un tipo de contenido X (ej. artículo) y queremos que pueda ser embebible en otras páginas solamente el contenido de este artículo (sin traer todo lo demás: header, footer, sidebars). Eso es justamente lo que vamos a realizar en esta entrada de blog.

Primero necesitamos un ítem de menú que haga render sólo de lo que ocupamos; para ello, implementamos el _hook\_menu_:

{% highlight php startinline=true %}
/**
 * Implements hook_menu().
 */
function demo_embed_menu() {
  $items['node/%node/embed'] = array(
    'title' => 'Embed',
    'page callback' => 'node_view_page',
    'page arguments' => array(1),
    'access callback' => 'demo_embed_access',
    'access arguments' => array(1),
    'type' => MENU_LOCAL_TASK,
  );

  return $items;
}
{% endhighlight %}

Esto nos genera una ruta de la forma _node/:nid/embed_ que utilizaremos para nuestro contenido embebible. Ahora, necesitamos crear un template para acomodar nuestro contenido; para eso, tenemos que indicarle a Drupal que en esa ruta utilice nuestro template y esto lo hacemos a través del _hook_preprocess_page_:
{% highlight php startinline=true %}
/**
 * Implements hook_preprocess_page().
 */
function demo_embed_preprocess_page(&$variables) {
  if (drupal_match_path(current_path(), 'node/*/embed')) {
    $allowed_regions = array('content');
    foreach ($variables['page'] as $key => $region) {
      if (strpos($key, '#') !== 0) {
        if (!in_array($key, $allowed_regions)) {
          unset($variables['page'][$key]);
        }
      }
    }
    if (module_exists('admin_menu')) {
      admin_menu_suppress(TRUE);
    }
    $variables['theme_hook_suggestions'][] = 'page__embed';
  }
}
{% endhighlight %}
Con el hook anterior, le dijimos a Drupal que si estamos en nuestra ruta, haga unset de todas las regiones excepto content; y que además; si el módulo admin_menu existe llame a una función _admin\_menu\_supress_ para no hacer render de este. También, sugerimos usar como template _page\_\_embed_.

Los pasos restantes son: crear la función que definimos como _access callback_ y crear nuestro template. Para el access callback, tenemos que implementar la función _demo\_embed\_access_ (porque así lo definimos en el hook_menu):
{% highlight php startinline=true %}
/**
 * Access callback for poll embedding.
 */
function sfg_feature_poll_embed_access($node) {
  if ($node->type === 'article' && user_access('access content')) {
    return TRUE;
  }
}
{% endhighlight %}
Con lo anterior, estamos diciendo que a esta ruta sólo podremos acceder si el usuario actual puede acceder al contenido y si este es de tipo artículo.

Ahora, nuestro template según lo definimos debe ser un archivo llamado _page--embed.tpl.php_ y normalmente debe ubicarse en la carpeta de templates del tema que se esté utilizando. Este archivo puede ser tan sencillo como lo siguiente:

{% highlight php %}
<?php
/**
 * @file
 * Template file for embedable content.
 */
?>

<div class="main-content">
  <?php print render($page['content']); ?>
</div>
{% endhighlight %}
Con eso, simplemente estamos haciendo render de la región content; que es la única que tenemos, debido a que las demás las quitamos anteriormente en el hook_preprocess_page.

Espero que esto les pueda ser de utilidad.
