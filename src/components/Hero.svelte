<script>
import { onMount } from 'svelte'
const base = import.meta.env.BASE_URL
let playBackRate = 2
let video

// Con prefers-reduced-motion el video del hero no se reproduce
onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.removeAttribute('autoplay')
        video.pause()
    }
})
</script>

<section id="hero">
    <div>
        <h1>Macbook Pro</h1>
        <img src="{base}title.png" alt="Macbook Title">
    </div>

    <video bind:this={video} bind:playbackRate={playBackRate} src="{base}videos/hero.mp4" autoPlay muted playsinline > </video>

    <button>Buy</button>
    <p>From $1599 or $133/mo for 12 months </p>
</section>