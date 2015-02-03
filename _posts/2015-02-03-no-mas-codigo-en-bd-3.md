---
layout: post
title:  "No más código en la base de datos por favor!!! (Parte 3)"
date:   2015-02-03 11:02:25
categories: drupal
tags: buenas-prácticas control-de-versiones
---

## No más código en la base de datos por favor!!! (Parte 3)

En esta tercera parte hablaremos acerca de eventos, condiciones y acciones de rules.
Todo lo relacionado con rules lo haremos en un archivo *[nombre-modulo].rules.inc*

## Eventos de Rules

Un evento es el encargado de desencadenar una serie de reglas que estén asociadas a este.

Para crear uno debemos implementar el *hook_rules_event_info*

{% highlight php startinline=true %}
function mimodulo_rules_event_info() {
  $items = array();
  $items['mi_evento'] = array(
    'group' => t('Node'),
    'label' => t('Mi Evento'),
    'variables' => array(
      'variable1' => array(
        'type' => 'text',
        'label' => t('Variable 1'),
      ),
      'variable2' => array(
        'type' => 'user',
        'label' => t('Variable 2'),
      ),
    ),
  );
  return $items;
}
{% endhighlight %}

Con eso; rules será capaz de ver un nuevo evento llamado "Mi Evento" que provee dos variables; pero para ejecutar este evento; desde donde se necesite; hay que llamar a la función *rules_invoke_event*; ej.
{% highlight php startinline=true %}
rules_invoke_event('mi_evento', $variable1, $variable2);
{% endhighlight %}

## Condiciones de Rules

Estas se utilizan para asegurarse de que verdaderamente queremos ejecutar una serie de acciones.
Para esto debemos implementar *hook_rules_condition_info*; ejemplo:
{% highlight php startinline=true %}
/**
 * Implements hook_rules_condition_info()
 */
function mimodulo_rules_condition_info(){
  return array(
    'mimodulo_mi_condicion' => array(
      'label' => t('Mi Condición'),
      'parameter' => array(
        'parameter1' => array(
          'type' => 'text',
          'label' => t('Parameter 1'),
          'options list' => 'funcion_que_devuelve_opciones',
          'restriction' => 'input',
        ),
        'parameter2' => array(
          'type' => 'user',
          'label' => t('Parameter 2 (tipo User)'),
        ),
      ),
      'group' => t('Node'),
    ),
  );
}

/**
 * Callback para mimodulo_mi_condicion.
 */
function mimodulo_mi_condicion($parameter1, $parameter2) {
  // Realizar aquí las comprobaciones necesarias
  // y devolver TRUE o FALSE según corresponda.
}
{% endhighlight %}
## Acciones de Rules

Estas son las acciones que verdaderamente queremos ejecutar.
Para esto debemos implementar *hook_rules_action_info*; ejemplo:
{% highlight php startinline=true %}
/**
 * Implements hook_rules_action_info().
 */
function mimodulo_rules_action_info() {
  $items = array(
    'mi_accion' => array(
      'label' => t('Mi acción'),
      'base' => 'mimodulo_mi_accion',
      'parameter' => array(
        'parameter1' => array(
          'type' => 'text',
          'label' => t('Parameter 1'),
          'options list' => 'funcion_que_devuelve_opciones',
          'restriction' => 'input',
        ),
        'parameter2' => array(
          'type' => 'user',
          'label' => t('Parameter 2 (tipo User)'),
        ),
      ),
      'group' => t('Node'),
    ),
  );

  return $items;
}

/**
 * Callback para mimodulo_mi_accion.
 */
function mimodulo_mi_accion($parameter1, $parameter2) {
  // Realizar la acción requerida.
}
{% endhighlight %}

Con eso simplemente, tenemos una acción de rules disponible.

Como podemos ver; el API de rules es bastante sencillo y muy útil para nuestras tareas cotidianas; y de esta forma también evitamos meter código en la base de datos.

Éxitos!!!

En la parte 4 de esta serie hablaremos acerca de views_bulk_operations y crearemos una acción personzalida para utilizar en con este módulo.
