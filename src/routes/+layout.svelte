<script lang="ts">
    import { onMount } from "svelte";
    import "../app.css";
    import Header from "../lib/components/header/index.svelte";
    import { page } from "$app/stores";
    import { user } from "../stores/user";

    onMount(async () => {
        if ($page.data.user) {
            user.set($page.data.user);
        }
    });
</script>

<div class="w-screen h-screen font-primary">
    {#if $page.data.user && !$user}
        <div
            class="w-full h-full flex flex-col items-center justify-center text-[64px] font-black bg-white"
        >
            ZAC CLOTHING
        </div>
    {:else}
        <Header />
        <div class="w-full h-full pt-[55px]">
            <slot />
        </div>
    {/if}
</div>
