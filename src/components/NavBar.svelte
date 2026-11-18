<script>
    import { navLinks } from "../constants";

    const base = import.meta.env.BASE_URL;

    

</script>

<header>
    <nav>
        <img src="{base}logo.svg" alt="Apple Logo">
        <ul>
            {#each navLinks as {label} (label)}
                <li><a href={base}>{label}</a></li>
            {/each}
        </ul>
        <div class="flex-center gap-3">
            <button>
                <img src="{base}search.svg" alt="Search">
            </button>
            <button>
                <img src="{base}cart.svg" alt="Cart">
            </button>
        </div>
    </nav>
</header>