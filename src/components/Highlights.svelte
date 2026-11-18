<script>
    import { onMount } from "svelte";
    import { gsap, ScrollTrigger, MQ, revealLines, useMotion } from "../lib/motion.js";

    const base = import.meta.env.BASE_URL;
    let root;

    onMount(() =>
        useMotion(root, (mm) => {
        const cards = gsap.utils.toArray(".masonry > div > div", root);

        const enter = (distance) => {
            gsap.set(cards, { opacity: 0, y: distance });
            ScrollTrigger.batch(cards, {
                start: "top 90%",
                once: true,
                onEnter: (batch) =>
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.15,
                        ease: "power3.out",
                    }),
            });
            revealLines(root.querySelectorAll(".reveal"));
        };

        mm.add(MQ.desktop, () => enter(60));
        mm.add(MQ.mobile, () => enter(30));

        }),
    );
</script>

<section id="highlights" bind:this={root}>
    <h2 class="reveal">There's never been a better time to upgrade.</h2>
    <h3 class="reveal">Here's why.</h3>

    <div class="masonry">
        <div class="left-column">
            <div>
                <img src="{base}laptop.png" alt="" width="106" height="106" />
                <p>Fast, fluid and ready for demanding work.</p>
            </div>
            <div>
                <img src="{base}sun.png" alt="" width="87" height="113" />
                <p>A bright display that holds up in daylight.</p>
            </div>
        </div>

        <div class="right-column">
            <div class="apple-gradient">
                <img src="{base}ai.png" alt="" width="78" height="100" />
                <p>Built for <span>intelligent tools</span>.</p>
            </div>
            <div>
                <img src="{base}battery.png" alt="" width="93" height="106" />
                <p>All-day <span class="green-gradient">battery life</span>.</p>
            </div>
        </div>
    </div>
</section>
