<script>
    import { onMount } from "svelte";
    import "./app.css";
    import { refreshOnLoad } from "./lib/motion.js";
    import NavBar from "./components/NavBar.svelte";
    import Hero from "./components/Hero.svelte";
    import PoductViewer from "./components/PoductViewer.svelte";
    import Showcase from "./components/Showcase.svelte";
    import Performance from "./components/Performance.svelte";
    import Features from "./components/Features.svelte";
    import Highlights from "./components/Highlights.svelte";
    import Footer from "./components/Footer.svelte";
    import DemoBadge from "./components/DemoBadge.svelte";

    onMount(refreshOnLoad);
</script>

<main>
    <NavBar />
    <Hero />
    <PoductViewer />
    <Showcase />
    <Performance />
    <Features />
    <Highlights />
    <Footer />
</main>

<DemoBadge />
