<script>
    import { onMount } from "svelte";
    import { gsap, ScrollTrigger, MQ, revealLines, useMotion } from "../lib/motion.js";

    const base = import.meta.env.BASE_URL;
    // [archivo, ancho, alto, texto alternativo]
    const shots = [
        ["performance1.png", 454, 305, "Edición de video con corrección de color"],
        ["performance2.png", 712, 464, "Edición de imagen con un grupo de bailarines"],
        ["performance3.png", 904, 586, "Escena 3D en un programa de modelado"],
        ["performance4.png", 1008, 652, "Retoque de fotografía de retrato"],
        ["performance5.jpg", 1408, 864, "Portátil mostrando una escena abstracta"],
        ["performance6.png", 356, 244, "Escena de un videojuego"],
        ["performance7.png", 1064, 684, "Composición visual por nodos"],
    ];
    let root;

    onMount(() =>
        useMotion(root, (mm) => {
        const imgs = gsap.utils.toArray(".wrapper img", root);

        mm.add(MQ.desktop, () => {
            // Las capturas llegan desde distintos lados según se hace scroll.
            const from = [
                { x: -160, y: 120 },
                { x: 0, y: -120 },
                { x: 160, y: 120 },
                { x: 160, y: 160 },
                { x: 0, y: 200 },
                { x: -160, y: 60 },
                { x: -120, y: 160 },
            ];
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root.querySelector(".wrapper"),
                    start: "top 85%",
                    end: "center 55%",
                    scrub: 0.8,
                },
            });
            imgs.forEach((img, i) =>
                tl.from(
                    img,
                    { ...from[i], scale: 0.8, opacity: 0, ease: "power2.out", duration: 1 },
                    i * 0.12,
                ),
            );
            revealLines(root.querySelectorAll(".reveal"));
        });

        mm.add(MQ.mobile, () => {
            // En móvil: aparición simple por lotes, sin scrub.
            gsap.set(imgs, { opacity: 0, y: 40 });
            ScrollTrigger.batch(imgs, {
                start: "top 92%",
                once: true,
                onEnter: (batch) =>
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power2.out",
                    }),
            });
            revealLines(root.querySelectorAll(".reveal"));
        });

        }),
    );
</script>

<section id="performance" bind:this={root}>
    <h2 class="reveal">Next-level graphics performance. Game on.</h2>

    <div class="wrapper">
        {#each shots as [file, w, h, alt], i}
            <img
                class="p{i + 1}"
                src="{base}{file}"
                {alt}
                width={w}
                height={h}
                loading="lazy"
                decoding="async"
            />
        {/each}
    </div>

    <div class="content">
        <p class="reveal">
            Run graphics-heavy apps and games with fluid, responsive performance,
            from creative tools to 3D scenes.
        </p>
    </div>
</section>
