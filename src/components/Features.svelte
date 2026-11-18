<script>
    import { onMount } from "svelte";
    import { gsap, ScrollTrigger, MQ, revealLines, useMotion } from "../lib/motion.js";
    import LazyVideo from "./LazyVideo.svelte";

    const base = import.meta.env.BASE_URL;
    const features = [
        {
            n: 1,
            title: "Write faster",
            text: "Draft, refine and send messages without leaving your inbox.",
            label: "Redacción de un correo en una aplicación de correo",
        },
        {
            n: 2,
            title: "Stay in motion",
            text: "Keep your routines close and your data synced with the rest of your day.",
            label: "Persona nadando en una alberca",
        },
        {
            n: 3,
            title: "Conversations in order",
            text: "Find the message you need in seconds.",
            label: "Lista de mensajes en una tableta",
        },
        {
            n: 4,
            title: "Share in a snap",
            text: "Move files between devices nearby with a couple of taps.",
            label: "Transferencia de archivos entre dispositivos",
        },
        {
            n: 5,
            title: "Focus on what matters",
            text: "Highlight, summarize and annotate long documents with ease.",
            label: "Documento con texto resaltado",
        },
    ];
    let root;

    onMount(() =>
        useMotion(root, (mm) => {
        const cards = gsap.utils.toArray(".card", root);

        const enter = (distance, duration) => {
            gsap.set(cards, { opacity: 0, y: distance, scale: 0.96 });
            gsap.set(".card .icon", { opacity: 0, scale: 0, rotate: -25 }, );
            ScrollTrigger.batch(cards, {
                start: "top 90%",
                once: true,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration,
                        stagger: 0.14,
                        ease: "power3.out",
                    });
                    // Los iconos entran un instante después, también escalonados.
                    gsap.to(
                        batch.map((c) => c.querySelector(".icon")),
                        {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            duration: 0.7,
                            delay: 0.3,
                            stagger: 0.14,
                            ease: "back.out(2.2)",
                        },
                    );
                },
            });
            revealLines(root.querySelectorAll(".reveal"));
        };

        mm.add(MQ.desktop, () => enter(70, 1));
        mm.add(MQ.mobile, () => enter(36, 0.7));

        }),
    );
</script>

<section id="features" bind:this={root}>
    <h2 class="reveal">See it all in a new light.</h2>

    <div class="feature-grid">
        {#each features as f}
            <article class="card">
                <div class="thumb">
                    <LazyVideo
                        src="{base}videos/feature-{f.n}.mp4"
                        poster="{base}posters/feature-{f.n}.jpg"
                        label={f.label}
                    />
                </div>
                <div class="body">
                    <img
                        class="icon"
                        src="{base}feature-icon{f.n}.svg"
                        alt=""
                        width="52"
                        height="56"
                    />
                    <div>
                        <h3>{f.title}</h3>
                        <p>{f.text}</p>
                    </div>
                </div>
            </article>
        {/each}
    </div>
</section>
