---
layout: post
title:  "No más código en la base de datos por favor!!!"
date:   2015-01-27 09:50:25
categories: drupal
tags: buenas-prácticas control-de-versiones
---

## No más código en la base de datos por favor!!! (Parte 1)

Necesito un mínimo de lógica para mostrar este campo en una vista; cuál es la solución más rápida? views_php. *ERROR*

Necesito un poco de lógica para una condición en rules; con php en una condición o una acción lo podría solucionar. *ERROR*

Necesito una acción en masa para mis nodos; podría usar views_bulk_operations; pero la acción es personalizada; entonces crearé un componente de rules con código php y lo usaré con vbo. *ERROR*

Necesito un campo custom en Display Suite; usemos php en un campo de código. *ERROR*

*ERROR*, *ERROR* y *ERROR*; cualquier cosa que involucre guardar código en la base de datos ya es un error. No se dispone de control de versiones; el sitio podría caerse completamente por un error fatal de php; errores aleatorios pueden empezar a aparecer y solucionarlos es terriblemente complicado debido a que no se sabe de donde proviene; y un largo etcétera. Solución: NUNCA use ningún módulo que almacene código en la base de datos; en su lugar; provea esas cosas desde el código; y su sitio será mucho más mantenible.

## Vistas

En el caso de vistas podemos necesitar: campos, filtros, criterios de ordenación, áreas, argumentos y plugins (validación y otros). En este post vamos a trabajar con campos, criterios de ordenación, áreas y un plugin de validación.

Lo primero que hay que hacer es implementar en el .module de tu módulo el hook_views_api


{% highlight php startinline=true %}

/**
 * Implements hook_views_api().
 */
function mimodulo_views_api() {
    return array("api" => "3.0");
}

{% endhighlight %}

Luego; en un archivo .views.inc implementaremos el hook_views_data.


{% highlight php startinline=true %}

/**
 * Implements hook_views_data().
 */
function mimodulo_views_data() {
  $data = array();
  // Código necesario va aquí.
  return $data;
}

{% endhighlight %}

### Campos

Campos, filtros, criterios de ordenación y áreas funcionan todos de manera similar: se declaran en el hook_views_data y utilizando un handler custom, se definen de acuerdo con lo necesitado. (Cambiando field por filter, sort o area según corresponda).

{% highlight php startinline=true %}

/**
 * Implements hook_views_data().
 */
function mimodulo_views_data() {
  $data = array();
  $data['node']['mi_campo'] = array(
    'title' => t('Mi Campo'),
    'help' => t('Ayuda para Mi Campo'),
    'field' => array(
      'handler' => 'node_handler_field_mi_campo',
    ),
  );
  return $data;
}

{% endhighlight %}

Ahora lo que queda es crear el handler; para ello podemos extender de *views_handler_field* o de alguna de las clases que ya extienden de ella (más información [aquí](https://api.drupal.org/api/views/handlers!views_handler_field.inc/group/views_field_handlers/7, "Views field handlers"))

Este handler se guarda en includes/handlers/ y debe ser referenciado desde el archivo .info del módulo para que views lo pueda detectar.

{% highlight php startinline=true %}

class node_handler_field_mi_campo extends views_handler_field {

  function construct() {
    parent::construct();
  }

  function query() {
    $this->ensure_my_table();
  }

  function render($values) {
    // En values disponemos de los campos que hayan en la vista.
    // Recomiendo dpm($values); para examinar este objeto.

    // Retornar lo que se desee como valor de este campo.
    return 'mi campo';
  }
}
{% endhighlight %}

En la parte 2 de esta entrada veremos acerca de criterios de ordenación y filtros; y en la parte 3 rules; y en una cuarta parte se hablará de views_bulk_operations.
