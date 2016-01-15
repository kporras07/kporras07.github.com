---
layout: post
title:  "Crear plugins de ctools (context, relationship, content type) (Parte 3/3)"
date:   2016-01-15 11:25:00
context_demo_select: drupal
tags: drupal ctools plugins context relationship content type
---

## Crear plugins de ctools (context, relationship, content type) (Parte 3/3)

En esta tercer entrada crearemos un content type que utilice nuestro contexto (parte 1/3) y que tenga una pequeña interfaz de configuración.

Para empezar, tenemos que declararle a ctools la ubicación de nuestros plugins de tipo content_type al igual que lo hicimos con los anteriores; para ello, modificamos nuestro _hook_ctools_plugin_directory_ para que quede así:
{% highlight php startinline=true %}
/**
 * Implements hook_ctools_plugin_directory().
 */
function ctools_demo_ctools_plugin_directory($owner, $plugin_type) {
  if ($owner === 'ctools' && $plugin_type === 'contexts') {
    return 'plugins/contexts';
  }
  if ($owner === 'ctools' && $plugin_type === 'relationships') {
    return 'plugins/relationships';
  }
  if ($owner === 'ctools' && $plugin_type === 'content_types') {
    return 'plugins/content_types';
  }
}
{% endhighlight %}

Con lo anterior, le decimos a ctools que los plugins de tipo _content_type_ los puede encontrar en la carpeta _plugins/content_types_. Ahora, el siguiente paso es declarar e implementar nuestro content_type; para ello, en la carpeta antes mencionada creamos un archivo al que vamos a llamarle en este ejemplo _demo\_content\_type.inc_ y que contiene el siguiente código:

{% highlight php %}
<?php

/**
 * @file
 * Demo content type.
 */

$plugin = array(
  'single' => TRUE,
  'title' => t('Demo Content Type'),
  'content_types' => 'demo_content_type',
  'description' => t('Example content type.'),
  'render callback' => 'demo_content_type_render',
  'edit form' => 'demo_content_type_edit_form',
  'category' => t('Demo'),
  'required context' => array(
    new ctools_context_required(t('Demo Context'), 'demo_context'),
  ),
);

/**
 * Render the custom content type.
 */
function demo_content_type_render($subtype, $conf, $panel_args, $context) {
  // Single variable for required context.
  list($demo_context) = $context;

  if (empty($demo_context) || empty($demo_context->data['demo_context_select'])) {
    return;
  }

  // Build the content type block.
  $block = new stdClass();
  $block->title   = '';
  $block->content = array(
    'content' => array(
      '#markup' => '',
    ),
  );

  $select_value = $demo_context->data['demo_context_select'];
  for ($index = 0; $index < $conf['repeat_times']; $index++) {
    $block['content']['#markup'] .= '<p>' . $select_value . '</p>';
  }

  return $block;
}

/**
 * Returns an edit form for custom type settings.
 */
function demo_content_type_edit_form($form, &$form_state) {
  $form['repeat_times'] = array(
    '#title' => t('Repeat Times'),
    '#type' => 'select',
    '#options' => array(
      '1' => t('One'),
      '2' => t('Two'),
      '3' => t('Three'),
      '4' => t('Four'),
      '5' => t('Five'),
    ),
    '#default_value' => isset($form_state['conf']['repeat_times']) ? $form_state['conf']['repeat_times'] : '1',
    '#required' => TRUE,
  );

  return $form;
}

/**
 * Submit handler for the custom type settings form.
 */
function demo_content_type_edit_form_submit($form, &$form_state) {
  foreach ($form_state['values'] as $key => $value) {
    $form_state['conf'][$key] = $value;
  }
}
{% endhighlight %}

Como el form y el submit no hay nada nuevo en comparación con lo que hemos visto en las entradas anteriores; entonces pasaremos directamente a hablar del render callback.

En las primeras 4 líneas nos aseguramos de tener los datos necesarios para poder hacer render de nuestro content type. Luego, empezamos a construir el bloque de nuestro content type con los datos que tenemos. En nuestro contexto (_$demo\_content_), en la propiedad _data_ tenemos la información proveniente del contexto y en _$conf_ tenemos la información proveniente del form; entonces, usamos esto para construir un array de render y returnarlo en la propiedad _content_ de nuestro objeto.

Esta es la última entrada de esta serie de entradas en las que hemos aprendido a crear contextos, relaciones y content types de ctools. Espero les hayan sido útiles.
