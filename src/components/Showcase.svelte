<script>
    import { onMount } from "svelte";
    import { gsap, MQ, revealLines, useMotion } from "../lib/motion.js";
    import LazyVideo from "./LazyVideo.svelte";

    const base = import.meta.env.BASE_URL;
    let root;

    onMount(() =>
        useMotion(root, (mm) => {
        const q = (s) => root.querySelector(s);

        mm.add(MQ.desktop, () => {
            // El video se revela a través de la máscara mientras la sección queda fija.
            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: q(".media"),
                        start: "center center",
                        end: "+=1300",
                        scrub: 0.6,
                        pin: true,
                        anticipatePin: 1,
                    },
                })
                .fromTo(
                    q(".mask img"),
                    { scale: 60 },
                    { scale: 1, ease: "power2.out", duration: 1 },
                )
                .to({}, { duration: 0.25 }); // pequeña pausa al final
            revealLines(root.querySelectorAll(".reveal"));
        });

        mm.add(MQ.mobile, () => {
            gsap.from(q(".mask img"), {
                scale: 2.4,
                duration: 1.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: q(".media"),
                    start: "top 80%",
                    once: true,
                },
            });
            revealLines(root.querySelectorAll(".reveal"));
        });

        }),
    );
</script>

<section id="showcase" bind:this={root}>
    <div class="media">
        <LazyVideo
            src="{base}videos/game.mp4"
            poster="{base}posters/game.jpg"
            label="Escena de videojuego reproduciéndose en la pantalla"
        />
        <div class="mask">
            <img src="{base}mask-logo.svg" alt="" width="1920" height="1080" />
        </div>
    </div>

    <div class="content">
        <div class="wrapper">
            <div class="lg:w-md lg:shrink-0">
                <h2 class="reveal">Built to keep up.</h2>
                <p class="reveal mt-7 lg:text-xl">
                    Smooth graphics, fast apps and a display that stays out of
                    the way, so the work in front of you always comes first.
                </p>
            </div>
            <div class="lg:flex-1 lg:max-w-3xl space-y-6">
                <p class="reveal lg:text-xl">
                    From editing video to playing demanding games, everything
                    responds the moment you ask for it. Scroll, drag, rotate:
                    this study recreates that feeling of immediacy with 3D,
                    video and scroll-driven animation.
                </p>
                <h3 class="reveal">Power that feels effortless.</h3>
            </div>
        </div>
    </div>
</section>
