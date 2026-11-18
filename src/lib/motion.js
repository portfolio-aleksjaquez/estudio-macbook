// Utilidades de animación compartidas (GSAP + ScrollTrigger + SplitText).
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Consultas para gsap.matchMedia(): respetan prefers-reduced-motion y separan
// la versión de escritorio (con pin/scrub) de la móvil (más ligera).
export const MQ = {
    desktop:
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
    reduce: "(prefers-reduced-motion: reduce)",
};

export const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Texto que aparece línea por línea al entrar en pantalla.
export function revealLines(targets, { start = "top 88%", stagger = 0.12 } = {}) {
    gsap.utils.toArray(targets).forEach((el) => {
        SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 0.9,
                    stagger,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start, once: true },
                });
            },
        });
    });
}

// Espera a que las tipografías estén cargadas (con un tope) para que SplitText
// mida las líneas con la fuente final y no con la de respaldo.
const fontsReady = Promise.race([
    Promise.all(
        ["400 1em Inter", "500 1em Inter", "600 1em Inter"].map((f) =>
            document.fonts ? document.fonts.load(f) : Promise.resolve(),
        ),
    ),
    new Promise((r) => setTimeout(r, 3000)),
]);

// Crea las animaciones de un componente cuando todo está listo y devuelve
// la función de limpieza para onMount. `setup(mm)` recibe un gsap.matchMedia.
export function useMotion(root, setup) {
    let mm;
    let dead = false;
    fontsReady.then(() => {
        if (dead) return;
        mm = gsap.matchMedia(root);
        setup(mm);
        ScrollTrigger.refresh();
    });
    return () => {
        dead = true;
        mm?.revert();
    };
}

// Recalcula posiciones cuando termina de cargar todo (fuentes, imágenes, 3D).
export function refreshOnLoad() {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh);
}

export { gsap, ScrollTrigger, SplitText };
