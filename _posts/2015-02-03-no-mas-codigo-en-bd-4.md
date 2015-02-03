---
layout: post
title:  "No más código en la base de datos por favor!!! (Parte 4)"
date:   2015-02-03 11:42:25
categories: drupal
tags: buenas-prácticas control-de-versiones
---

## No más código en la base de datos por favor!!! (Parte 4)

En esta cuarta parte hablaremos acerca de acciones para views_bulk_operations.

Como verán es bastante sencillo; ya que lo único que tendremos que hacer es implementar *hook_action_info* y de esta forma proveemos acciones que pueden ser utilizadas como bulk operations. Es importante recordar que también un componente de rules se puede usar como acción en vbo; así que no siempre será necesario programarlas.


{% highlight php startinline=true %}
function mimodulo_action_info() {
  $items = array();
  $items['mimodulo_mi_accion'] = array(
    'type' => 'node',
    'label' => t('Mi acción'),
    'behavior' => array('changes_property'),
    'configurable' => FALSE,
    'vbo_configurable' => FALSE,
    'triggers' => array('any'),
  );
  return $items;
}

/**
 * Callback para mimodulo_mi_accion.
 */
function mimodulo_mi_accion(&$node, $context) {
  // Realizar alteraciones necesarias en $node.
  // No es necesario guardarlo porque viene por referencia.
}

{% endhighlight %}

Listo; únicamente con eso ya tenemos una acción de vbo disponible para utilizar.

Hasta aquí llegamos con esta serie de entradas; espero que les haya servido de bastante.
