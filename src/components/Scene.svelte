<script lang="ts">
    import { macbookStore } from "../store";
    import { T, useThrelte } from "@threlte/core";
    import { useGltf, useDraco, OrbitControls } from "@threlte/extras";
    const base = import.meta.env.BASE_URL;
    const { invalidate } = useThrelte();
    // Decodificador Draco servido desde public/draco (sin depender de un CDN externo)
    const dracoLoader = useDraco(`${base}draco/`);
    const gltf = useGltf(`${base}models/macbook-14.glb`, {
        dracoLoader,
    });

    // Tiñe el chasis según el color elegido. Se conservan las partes con
    // textura (pantalla, teclado) y las casi negras. "Space Gray" restaura
    // el color original del modelo.
    const SILVER = "#adb5bd";
    function applyColor(scene, color) {
        scene.traverse((o) => {
            if (!o.isMesh || !o.material || o.material.map) return;
            const m = o.material;
            m.userData.original ??= {
                color: m.color.clone(),
                metalness: m.metalness,
                roughness: m.roughness,
            };
            const o0 = m.userData.original;
            if (o0.color.r < 0.05) return;
            if (color === SILVER) {
                // Sin mapa de entorno, un metal puro se ve negro: se suaviza para que el tono plateado se note.
                m.color.set(SILVER);
                m.metalness = Math.min(o0.metalness, 0.25);
                m.roughness = Math.max(o0.roughness, 0.45);
            } else {
                m.color.copy(o0.color);
                m.metalness = o0.metalness;
                m.roughness = o0.roughness;
            }
        });
    }
    // Threlte renderiza bajo demanda: hay que invalidar tras mutar materiales.
    $: gltf.then(({ scene }) => {
        applyColor(scene, $macbookStore.color);
        invalidate();
    });
</script>

<T.PerspectiveCamera
    makeDefault
    position={[1, 20, 30]}
    fov={100}
    near={1}
    far={100}
>
    <OrbitControls enableZoom={false} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 10, 5]} intensity={1} />
<T.AmbientLight intensity={0.5} />

{#await gltf}
    <!-- Placeholder mientras carga -->
    <T.Mesh position={[0, 0.5, 0]} scale={10 * $macbookStore.scale}>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial color={$macbookStore.color} />
    </T.Mesh>
{:then { scene }}
    <!-- Tu modelo cargado -->
    <T is={scene} position={[0, 0.5, 0]} scale={10 * $macbookStore.scale} />
{/await}
