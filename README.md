# Estudio MacBook

> **Recreación no oficial con fines de estudio y práctica. No está afiliada, patrocinada ni respaldada por Apple Inc.**

Ejercicio de interfaz que reproduce, de forma aproximada, la página de producto del MacBook Pro para practicar animación por scroll y 3D en el navegador. No es un sitio de Apple ni vende nada. "Apple", "MacBook" y los logotipos relacionados son marcas de sus respectivos propietarios y aquí aparecen únicamente como referencia de práctica.

Demo: https://portfolio-aleksjaquez.github.io/estudio-macbook/

## Qué incluye

- Hero con video y visor 3D del portátil (modelo GLB con compresión Draco; talla y color seleccionables).
- Sección "Showcase": el video se revela a través de una máscara mientras la sección queda fija (GSAP ScrollTrigger con `pin` y `scrub`).
- Sección de rendimiento: capturas que entran desde distintos lados con el scroll.
- Cuadrícula de características: tarjetas con video e iconos que entran de forma escalonada.
- Sección de "highlights" con texto que aparece línea por línea (GSAP SplitText).

Accesibilidad y rendimiento: se respeta `prefers-reduced-motion` (sin pin, sin parallax y sin reproducción automática de video; solo se muestran pósters), en móvil se usa una versión más ligera sin `pin` ni `scrub`, los videos se descargan solo al acercarse a la pantalla y se pausan al salir de ella.

## Tecnologías

Svelte 5, Vite, Tailwind CSS 4, GSAP (ScrollTrigger y SplitText), Three.js con Threlte. Tipografía Inter mediante `@fontsource/inter` (licencia SIL OFL 1.1).

## Uso local

```bash
pnpm install
pnpm dev      # http://localhost:5173/estudio-macbook/
pnpm build    # genera dist/
pnpm preview
```

## Despliegue

Cada push a `main` publica en GitHub Pages mediante `.github/workflows/deploy.yml`. El proyecto usa `base: '/estudio-macbook/'` en Vite; los recursos de `public/` se referencian con `import.meta.env.BASE_URL`. El decodificador Draco se sirve desde `public/draco/` (no depende de ningún CDN).

## Nota sobre dependencias: override de `three-perf`

`@threlte/extras` depende de `three-perf` mediante un tarball de `codeload.github.com`. Algunos entornos (por ejemplo redes que solo permiten el registro de npm) bloquean ese dominio y `pnpm install` falla con un 403. Por eso `package.json` fija en `pnpm.overrides` la versión publicada en npm:

```json
"pnpm": { "overrides": { "three": "0.180.0", "three-perf": "1.0.10" } }
```

El `pnpm-lock.yaml` ya está regenerado con ese override, así que `pnpm install --frozen-lockfile` funciona tanto en local como en GitHub Actions. Si se quita el override, el lockfile volverá a apuntar a GitHub.

## Créditos y licencias

- Modelo 3D: "macbook pro M3 16 inch 2024" por jackbaeten, licencia CC BY 4.0, https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4 (licencia: https://creativecommons.org/licenses/by/4.0/). Se modificó: optimización/compresión del archivo (glTF-Transform) y cambio de color del material en el visor.
- Tipografía: [Inter](https://rsms.me/inter/) de Rasmus Andersson, licencia SIL Open Font License 1.1, incluida vía `@fontsource/inter`.
- Aviso: este proyecto no es oficial ni está afiliado a Apple Inc.; las marcas pertenecen a sus propietarios.

## Medios

Los videos `game` y `feature-1` a `feature-4` se recomprimieron con ffmpeg (H.264) para reducir peso; los pósters de `public/posters/` son fotogramas de esos videos. Los videos y capturas son material de práctica y pertenecen a sus respectivos autores.
