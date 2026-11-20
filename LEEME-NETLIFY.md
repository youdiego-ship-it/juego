# Publicar «Armor of the Spirit · Guardianes de la Palabra» en Netlify

El juego guarda el avance de cada guardián y el ranking en Netlify (Netlify Blobs),
mediante la función `netlify/functions/guardianes.mjs`.

IMPORTANTE: arrastrar la carpeta a Netlify Drop publica solo la página, sin la función.
En ese caso el juego funciona, pero el avance queda solo en cada dispositivo y el
ranking no se comparte. Para activar el guardado en línea usa una de estas dos opciones:

## Opción A: con GitHub (recomendada)
1. Sube el contenido de esta carpeta a un repositorio de GitHub.
2. En Netlify: «Add new site» → «Import an existing project» → elige el repositorio.
3. No cambies nada: Netlify lee `netlify.toml`, instala `@netlify/blobs` y publica la función.

## Opción B: con la terminal (Netlify CLI)
    npm install
    npx netlify-cli login
    npx netlify-cli deploy --prod

## Cómo comprobar que funciona
Abre `https://TU-SITIO.netlify.app/api/guardianes`. Debe responder algo como
`{"top":[],"total":0,"pos":0}`. En «Mi guardián» el ranking dirá
«Ranking de todos los guardianes que juegan en este sitio» y aparecerá el código de guardián.

Los datos se ven en el panel de Netlify, en «Blobs», store «guardianes».
