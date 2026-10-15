# Cata a Ciegas

Juego de misterio en el navegador, adaptación digital del caso **Cata a Ciegas** (Expediente Noir · N.º 000).
Los jugadores leen el expediente, piden diligencias al laboratorio con un presupuesto limitado de puntos,
confrontan a los sospechosos y entregan una hoja de resolución que el juego corrige (máximo 100 puntos).

## Cómo jugar

Abre `index.html` en un navegador. No necesita instalación ni conexión: no usa librerías ni servicios externos.
El progreso se guarda en el propio navegador (`localStorage`); desde **Inicio** se puede empezar de nuevo.

Desde el botón **Aa** del encabezado se puede agrandar o achicar el texto (87,5 % a 137,5 %) y elegir tema
claro, oscuro o el del sistema. El botón **Notas** abre un panel para anotar desde cualquier pestaña.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `index.html` | Página única: cabecera, navegación y contenedores. |
| `styles.css` | Diseño moderno con tema claro y oscuro, escalable con el tamaño de texto y adaptado a celular. |
| `caso.js` | Todo el contenido del caso: textos, declaraciones, pruebas, diligencias y solución. |
| `app.js` | Pantallas, reglas de puntaje, confrontaciones y corrección. |
| `assets/` | Imágenes del caso (creadas con inteligencia artificial). |

Para crear otro caso basta con reemplazar el contenido de `caso.js` y las imágenes de `assets/`.

## Reglas implementadas

- 5 puntos para diligencias. Cada pedido exige una razón apoyada en el expediente; si no se sostiene, el resultado
  es «Sin hallazgos» y el punto se pierde igual.
- Confrontar a una persona con una prueba es gratis. Bruno solo confiesa si se le presentan al menos dos pruebas
  entre la declaración de Rosa, la foto de las 20:41, los guantes y la filiación.
- Hasta 3 pistas de ayuda, que restan 3 puntos cada una.
- Resolución: culpable (30), móvil (20), cómo y cuándo (20), tres pruebas de fuentes distintas (15) y tres mentiras
  inocentes con su razón (15).

## Nota

La solución del caso está dentro del código (`caso.js`) y se muestra solo al entregar la resolución, pero quien lea
el código fuente puede verla. Es una limitación de un juego que corre solo en el navegador.

Obra de ficción: personajes, instituciones y hechos son inventados.
