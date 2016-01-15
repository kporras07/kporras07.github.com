---
layout: post
title:  "Crear plugins de ctools (context, relationship, content type) (Parte 1/3)"
date:   2016-01-15 09:21:00
categories: drupal
tags: drupal ctools plugins context relationship content type
---

## Crear plugins de ctools (context, relationship, content type) (Parte 1/3)

En estos días me tocó redescubrir el maravilloso mundo de CTools y crear un content type que utilice un contexto propio, pero dicho contexto podría o no darse explícitamente (en caso de que no se de; debe tomarlo del nodo). En esta serie de entradas, vamos a explicar como crear estos tres plugins: Context, Relationship, Content Type.

Pero antes, explicaremos qué es cada uno de ellos: un context (no confundir con el módulo context de Drupal); es un valor (o una serie de valores) que otros elementos de ctools (en este caso un content type) pueden utilizar, pero que no se configura en el propio elemento (content type para nuestros efectos). El context puede ser configurable (como será nuestro caso), pero además podría proveerse a través de relaciones. Una relación (relationship); es la forma que utiliza ctools para crear un contexto a partir de otro. Por último, un content type es un panel creado desde código que también podría ser configurable.

En esta primer entrada, vamos a hablar sobre la creación de un context. Nuestro context va a tomar una serie de opciones de una variable de Drupal y presentarlas al usuario para que este escoja la que quiere utilizar en el content type que crearemos en la parte 3/3.

Para empezar, tenemos que declararle a ctools la ubicación de nuestros plugins de tipo context; para ello, implementamos el _hook_ctools_plugin_directory_
{% highlight php startinline=true %}
/**
 * Implements hook_ctools_plugin_directory().
 */
function ctools_demo_ctools_plugin_directory($owner, $plugin_type) {
  if ($owner === 'ctools' && $plugin_type === 'contexts') {
    return 'plugins/contexts';
  }
}
{% endhighlight %}

Con lo anterior, le decimos a ctools que los plugins de tipo _context_ los puede encontrar en la carpeta _plugins/contexts_. Ahora, el siguiente paso es declarar e implementar nuestro contexto; para ello, en la carpeta antes mencionada creamos un archivo al que vamos a llamarle en este ejemplo _demo_context.inc_ y que contiene el siguiente código:

{% highlight php %}
<?php

/**
 * @file
 * Plugin to provide a demo_context context.
 */

/**
 * Describimos nuestro plugin con un array $plugin.
 */
$plugin = array(
  'title' => t("Demo Context"),
  'description' => t('Mi context de ejemplo'),
  'keyword' => 'demo_context',
  'context' => 'demo_context',
  'edit form' => 'demo_context_settings_form',
  'defaults' => array('demo_context_select' => ''),
  'context name' => 'demo_context',
  'convert' => 'demo_context_convert',
);

/**
 * Settings form for demo_context.
 */
function demo_context_settings_form($form, &$form_state) {
  $form['demo_context_select'] = array(
    '#title' => t('Select an option'),
    '#type' => 'select',
    '#options' => variable_get('demo_context_variable', array()),
    '#default_value' => isset($form_state['conf']['demo_context_select']) ? $form_state['conf']['demo_context_select'] : '',
    '#required' => TRUE,
  );

  return $form;
}

/**
 * Settings form submit for demo_context.
 */
function demo_context_settings_form_submit($form, &$form_state) {
  foreach ($form_state['values'] as $key => $value) {
    $form_state['conf'][$key] = $value;
  }
}

/**
 * Create our context.
 *
 * It's important to remember that $conf is optional here, because contexts are
 * not always created from the UI.
 */
function demo_context($empty, $data = NULL, $conf = FALSE) {
  $context = new ctools_context(array('demo_context'));
  $context->plugin = 'demo_context';

  if (!empty($data['demo_context_select'])) {
    $context->data = $data;
  }
  return $context;
}

/**
 * Convert a context to string.
 */
function demo_context_convert($context, $type) {
  switch ($type) {
    case 'demo_context_select':
      return $context->data['demo_context_select'];
  }
}
{% endhighlight %}

En el código anterior vemos como iniciamos describiendo nuestro plugin con un título, una descripción, un keyword por default (es el que se utilizará en la interfaz administrativa y para los tokens). El índice _context_ declara la función que utilizaremos para crear el context; con _edit form_ indicamos el formulario para la edición del contexto; con defaults declaramos algunos valores default para nuestro plugin; con _context name_ especificamos el nombre de nuestro contexto y por último, _convert_ declara la función que utilizaremos para convertir nuestro contexto a un string en caso de que sea usado como token.

El formulario que definimos para este ejemplo es muy sencillo, entonces expliquemos solamente el submit del mismo: en este, tomamos los valores que vienen del formulario y los guardamos en el índice _conf_ (este se le pasará al contexto en caso de haberlo creado desde la interfaz, pero además, se pasarán vía _$data_ que es de donde debemos utilizarlo.

La función de creación del contexto (_demo\_context_) recibe tres parámetros: _$empty_ para indicar si queremos crear un contexto vacío (esto lo maneja ctools), _$data_ con los valores procedentes del formulario o los que se utilizaron para crear el contexto (si se crea desde una relación se insertan aquí) y _$conf_ que trae exclusivamente los valores que vienen del formulario; por ello, no debemos de confiar en estos valores (porque no siempre se utiliza el formulario para crear el contexto). En esta función creamos el contexto, le asociamos el plugin y si hay datos en _$data_ los copiamos a _$context->data_; luego, retornamos el contexto.

Por último, la función de convertir se encarga de devolver un string a partir de un valor que se pidió con _$type_.

En la siguiente entrada hablaremos de la creación de una relación para proveer este contexto a partir de un valor en un nodo sin tener que configurarlo directamente y en la última, crearemos un content type que utilice este contexto.
