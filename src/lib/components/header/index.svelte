<script lang="ts">
    import { uls } from "../../../stores/updateLs";
    import { user } from "../../../stores/user";
    const r = window.localStorage.getItem("zac_cart");
    let cartItems = r ? JSON.parse(r) : [];

    $: if ($uls) {
        const n = window.localStorage.getItem("zac_cart");
        cartItems = n ? JSON.parse(n) : [];
    }
</script>

<div
    class="fixed w-full h-[55px] flex flex-row items-center justify-between px-4 border-b-2 border-black bg-white z-[1000]"
>
    <div class="w-1/3 flex flex-row items-center justify-start" />
    <a
        href="/"
        class="w-1/3 flex flex-row items-center justify-center font-bold text-xl"
    >
        ZAC
    </a>
    <div class="w-1/3 flex flex-row items-center justify-end">
        <a href="/cart">
            <div class="mx-4">
                <span class="text-xl font-bold relative">
                    {#if cartItems.length > 0}
                        <div
                            class="absolute -top-1 -right-1 text-[8px] w-[15px] h-[15px] flex items-center justify-center bg-red-500 rounded-full text-white font-bold"
                        >
                            {cartItems.length}
                        </div>
                    {/if}
                    <img
                        class="w-[25px] h-[25px] rounded-full"
                        src="https://www.iconpacks.net/icons/2/free-shopping-cart-icon-3045-thumb.png"
                        alt="place_profile_pic"
                    />
                </span>
            </div>
        </a>
        {#if !$user}
            <a href="/auth/login">
                <img
                    class="w-[25px] h-[25px] rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    alt="place_profile_pic"
                />
            </a>
        {:else}
            <img
                class="w-[25px] h-[25px] rounded-full"
                src={$user.url}
                alt="place_profile_pic"
            />
        {/if}
    </div>
</div>
