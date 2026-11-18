import { mount } from 'svelte'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import './app.css'
import App from './App.svelte'

// Inicia la descarga de las fuentes antes de montar la app para que las
// animaciones por línea (SplitText) midan el texto con la tipografía final.
document.fonts?.load('400 1em Inter')
document.fonts?.load('500 1em Inter')
document.fonts?.load('600 1em Inter')

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
