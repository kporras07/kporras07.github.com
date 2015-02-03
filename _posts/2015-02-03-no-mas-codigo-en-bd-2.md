---
layout: post
title:  "No más código en la base de datos por favor!!! (Parte 2)"
date:   2015-02-03 11:02:25
categories: drupal
tags: buenas-prácticas control-de-versiones
---

## No más código en la base de datos por favor!!! (Parte 2)

En la parte 1 de esta entrada veíamos acerca de campos personalizados en views. Parte de la información ahí brindada es necesaria para esta segunda parte. Si no la has leído, te recomiendo que la leás.


## Criterios de Ordenación

Como se dijo en la parte 1 de esta serie de entradas; los cambios en el hook_views_data para lograr esto son muy similares a los necesarios para un campo. Dicho esto, trabajaremos directamente en el handler.

En este ejemplo que veremos; se necesita ordenar por un campo A (si existe); o por un campo B (si A no existe); esto a nivel de filas.

{% highlight php startinline=true %}

class node_handler_sort_date_published_or_created extends views_handler_sort {

  function query() {
    $query = &$this->query;
    $query->add_table('field_data_field_date_published', NULL, NULL, 'published_date');
    $query->add_field(NULL, '(IF (published_date.field_date_published_value IS NULL, node.created, UNIX_TIMESTAMP(published_date.field_date_published_value)))', 'sorting_date');
    $query->add_orderby(NULL, NULL, $this->options['order'], 'sorting_date');
  }
}

{% endhighlight %}

Como podemos ver; al tratarse de un criterio de ordenamiento (aplicaría de forma similar para filtros); lo que se necesita es alterar el query; por ello la función primordial a implementar sería query.

## Filtros (y filtros expuestos)

En este caso, al igual que con el criterio de ordenamiento; lo primordial es alterar el query; para ello, implementaremos la función query y, en este caso implementaremos también value_form porque queremos dar la posibilidad de exponer este filtro.


{% highlight php startinline=true %}

class node_handler_filter_mi_filtro views_handler_filter {


  /**
   * Options form for setting exposed filter.
   */
  function value_form(&$form, &$form_state) {
    parent::value_form($form, $form_state);
    // Aquí lo necesario para crear el formulario expuesto para este filtro.
  }

  function query() {
    // Alteramos el query de forma similar a lo realizado en el criterio de ordenación
    // de acuerdo con lo necesitado.
  }
}
{% endhighlight %}

Una vez hecho lo anterior tendremos disponible nuestro filtro (que también podrá usarse como filtro expuesto).

En la tercera parte de esta serie de entradas hablaremos de como crear condiciones, acciones y eventos personalizados para rules.
