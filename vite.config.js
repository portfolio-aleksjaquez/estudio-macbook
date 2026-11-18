import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
    // Subruta de GitHub Pages: https://portfolio-aleksjaquez.github.io/estudio-macbook/
    base: '/estudio-macbook/',
    plugins: [tailwindcss(), svelte()],
});
