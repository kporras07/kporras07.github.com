---
layout: post
title:  "Crear plugins de ctools (context, relationship, content type) (Parte 2/3)"
date:   2016-01-15 10:05:00
context_demo_select: drupal
tags: drupal ctools plugins context relationship content type
---

## Crear plugins de ctools (context, relationship, content type) (Parte 2/3)

En esta segunda entrada crearemos un relationship para proveer nuestro contexto (parte 1/3) a partir de algún valor de un nodo que ya tengamos disponible. La lógica para eso la dejaremos sin implementar, porque no es parte del alcance de este post; pero se explicará de forma detallada cómo crear la relación.

Para empezar, tenemos que declararle a ctools la ubicación de nuestros plugins de tipo relationship al igual que lo hicimos con los de tipo context; para ello, modificamos nuestro _hook_ctools_plugin_directory_ para que quede así:
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
}
{% endhighlight %}

Con lo anterior, le decimos a ctools que los plugins de tipo _relationship los puede encontrar en la carpeta _plugins/relationships. Ahora, el siguiente paso es declarar e implementar nuestro relationship; para ello, en la carpeta antes mencionada creamos un archivo al que vamos a llamarle en este ejemplo _demo_context_from_node.inc_ y que contiene el siguiente código:

{% highlight php %}
<?php

/**
 * @file
 * Plugin to provide an relationship handler for node to demo_context.
 */

/**
 * Describimos nuestro plugin con un array $plugin.
 */
$plugin = array(
  'title' => t('Demo Context'),
  'description' => t('Expose demo_context as context from node value.'),
  'keyword' => 'demo_context',
  'context' => 'demo_context_from_node_context',
  'edit form' => 'demo_context_from_node_settings_form',
  'required context' => new ctools_context_required(t('Node'), 'node'),
);

/**
 * Return a new context based on an existing context.
 */
function demo_context_from_node_context($context, $conf) {
  // If data está vacío es porque queremos un contexto vacío.
  if (empty($context->data)) {
    return ctools_context_create_empty('demo_context', NULL);
  }

  if (isset($context->data->nid)) {
    // Aquí la lógica para poblar una variable llamada $context_demo_select.
    // Send it to ctools.
    return ctools_context_create('demo_context', array('context_demo_select' => $context_demo_select));
  }
}

/**
 * Empty form on purpose.
 */
function demo_context_from_node_settings_form($form, $form_state) {
  $conf = $form_state['conf'];
  return $form;
}
{% endhighlight %}

Al igual que con el contexto, describimos el plugin con algunos índices; entre ellos, _context_ nos indica el nombre dela función que va a crear nuestro contexto, _edit form_ lo usamos para declarar la función para editar nuestro contexto (que en este caso será un form vacío) y con _required context_ indicamos que para poder crear un contexto de tipo _demo\_context_ necesitamos tener uno de tipo _node_.

En _demo\_context\_from\_node\_context_ verificamos que _$context->data_ contenga algo; si es así, debemos implementar la lógica para crear las variables necesarias para instanciar nuestro contexto _demo\_context_; sino, simplemente instanciamos el mismo contexto, pero vacío.

Como se puede ver; una relación es muy fácil; pero la documentación que hay en la red para crearla es escasa; por ello, espero que este post pueda ser útil.

En la siguiente entrada hablaremos de la creación de un content type que utilice el contexto creado en la entrada anterior; ya sea configurado normalmente o provisto a través de esta relación.
