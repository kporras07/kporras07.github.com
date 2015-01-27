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

Campos, filtros , criterios de ordenación y áreas funcionan todos de manera similar: se declaran en el hook_views_data y utilizando un handler custom, se definen de acuerdo con lo necesitado.

(aún en proceso...)
