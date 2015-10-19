---
published: true
layout: post
date: 2015-10-19T14:42:25.000Z
categories: drupal
tags: "hook_update_N bloques drupal"
---


## Posicionar bloques en actualización de módulo.

Si has tenido la oportunidad de desarrollar en Drupal y has querido mantener todas las configuraciones en código, seguramente te has dado cuenta que la interfaz de bloques default de Drupal no es fácilmente exportable (creo que features extras hace algo al respecto, pero no estoy seguro de que me guste). Entonces surge la pregunta, cómo posiciono un bloque desde código?

La única forma de hacerlo que he encontrado es a través de los hooks de instalación/habilitación/actualización de Drupal (hook_install, hook_enable, hook_update_N). En este caso vamos a trabajar con el hook_update_N.

Tengo un módulo llamado "mi_bloque" que lo provee el módulo "mi_modulo" (que es el módulo donde voy a escribir este código). Entonces, para posicionarlo en la región "header" del tema "bartik" tendría que hacer algo como así:

{% highlight php startinline=true %}
/**
 * Set mi_bloque in header region in bartik theme.
 */
function mi_modulo_update_7000() {
  // Limpiar la caché de bloques para asegurarse que los bloques que necesitamos ya existan.
  block_flush_caches();

  // Actualizar la tabla block con la info deseada para mi módulo.
  db_update('block')
    ->fields(array(
      'status' => 1,
      'region' => 'header',
    ))
    ->condition('module', 'mi_modulo')
    ->condition('delta', 'mi_bloque')
    ->condition('theme', 'bartik')
    ->execute();
}
{%endhighlight%}

Revisando el código anterior encontramos una línea que dice <pre>block_flush_caches()</pre>; esta línea lo que hace es limpiar la caché del módulo block para que estemos seguros deque el bloque que vamos a modificar ya exista en el sistema. Sin esta línea, nuestro código podría fallar, en especial si queremos modificar un bloque que apenas se esté creando.

El resto del código lo que hace simplemente es actualizar en la tabla block la fila correspondiente a nuestro bloque en el tema deseado.

Está de más decir que este mismo código podría funcionar en cualquiera de los otros hooks mencionados (hook_install, hook_enable), dependiendo del momento en que queramos que se ejecute.

Espero que esta entrada te haya sido útil.
