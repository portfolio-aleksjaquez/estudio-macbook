<!-- Etiqueta fija y discreta: indica que esta página es un estudio no oficial. -->
<aside class="demo-badge" lang="es" aria-label="Aviso sobre este proyecto">
    <span>Estudio de interfaz</span>
    <span class="sep" aria-hidden="true">·</span>
    <span>Recreación no oficial con fines de práctica</span>
    <span class="sep" aria-hidden="true">·</span>
    <span>No afiliado a Apple</span>
</aside>

<style>
    .demo-badge {
        position: fixed;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: fit-content;
        bottom: max(8px, env(safe-area-inset-bottom));
        z-index: 9999;
        box-sizing: border-box;
        max-width: calc(100vw - 16px);
        padding: 5px 12px;
        border-radius: 9999px;
        background: rgba(29, 29, 31, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.14);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        color: #d2d2d7;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        font-size: 11px;
        line-height: 1.35;
        text-align: center;
        letter-spacing: 0.01em;
        /* No intercepta clics: no estorba a los controles de debajo */
        pointer-events: none;
    }

    .demo-badge span {
        display: inline-block;
    }

    .sep {
        margin: 0 4px;
        opacity: 0.6;
    }

    @media (max-width: 640px) {
        .demo-badge {
            font-size: 10px;
            padding: 4px 10px;
            border-radius: 14px;
        }
    }
</style>
