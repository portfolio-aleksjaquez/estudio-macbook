<script>
    import { onMount } from "svelte";

    // Video decorativo que no se descarga hasta estar cerca de la pantalla,
    // se pausa al salir de ella y no se reproduce con prefers-reduced-motion.
    let { src, poster, label = "", class: klass = "" } = $props();
    let el;

    onMount(() => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduce) return; // solo se muestra el póster
        let loaded = false;
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        if (!loaded) {
                            el.src = src;
                            el.load();
                            loaded = true;
                        }
                        el.play().catch(() => {});
                    } else if (loaded) {
                        el.pause();
                    }
                }
            },
            { rootMargin: "200px 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    });
</script>

<video
    bind:this={el}
    class={klass}
    {poster}
    muted
    loop
    playsinline
    preload="none"
    aria-label={label}
></video>
