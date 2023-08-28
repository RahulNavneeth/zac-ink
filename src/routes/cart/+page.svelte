<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { user } from "../../stores/user";
    // @ts-ignore
    import QrCode from "svelte-qrcode";
    import { uls } from "../../stores/updateLs";
    type cart = Array<{
        id: number;
        name: string;
        price: number;
        quantity: number;
        ItemImage: Array<{ url: string }>;
    }>;

    let cartItems: cart = [];

    onMount(async () => {
        if (!$user) {
            goto("/auth/login");
        } else {
            const r = window.localStorage.getItem("zac_cart");
            if (r) {
                cartItems = JSON.parse(r);
            }
        }
    });

    $: total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    function removeItem(item: any) {
        cartItems = cartItems.filter((cartItem) => cartItem !== item);
        window.localStorage.setItem("zac_cart", JSON.stringify(cartItems));
        total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    let openModal: boolean = false;

    let uri: string = "";

    const checkout = () => {
        const url = "upi://pay";
        let upi = {
            pa: "srivarivenkat22@okicici",
            pn: "Zac Clothings",
            tn: `${$user?.username} Payment for Zac Clothings`,
            am: total.toString(),
            cu: "INR",
        };
        let upiLink = new URLSearchParams(upi).toString();
        uri = `${url}?${upiLink}`;
        openModal = true;
    };

    $: if (cartItems.length > 0)
        window.localStorage.setItem("zac_cart", JSON.stringify(cartItems));
</script>

<div class="h-full bg-gray-100">
    {#if openModal}
        <div
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <div class="bg-white rounded-lg p-12">
                <h2 class="text-2xl font-semibold mb-4">Checkout QR</h2>
                <p class="text-gray-600 mb-4">
                    Total:{" "}
                    {total.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                    })}
                </p>
                <QrCode value={uri} />
                <button
                    class="bg-red-500 text-white px-4 py-2 rounded w-full"
                    on:click={() => {
                        openModal = false;
                    }}>Cancel</button
                >
            </div>
        </div>
    {/if}
    <div class="max-w-3xl mx-auto py-8 px-4">
        <h1 class="text-2xl font-semibold mb-4">Your Cart</h1>
        <div class="p-4 rounded-lg">
            {#each cartItems as item}
                <div
                    class="bg-white flex items-center border-2 border-black shadow-md p-4 mb-4"
                >
                    <div class="flex-shrink-0 w-16 h-16">
                        <img
                            src={item.ItemImage[0].url}
                            alt="Item Image"
                            class="w-full h-full object-cover rounded"
                        />
                    </div>
                    <div class="flex-grow pl-4">
                        <h2 class="text-lg font-semibold">{item.name}</h2>
                        <p class="text-gray-600">
                            {item.price.toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                            })}
                        </p>
                        <div class="mt-2">
                            <input
                                type="number"
                                min="1"
                                bind:value={item.quantity}
                                class="w-16 p-1 border border-gray-300 rounded"
                            />
                            <button
                                class="bg-red-500 text-white px-4 py-2 rounded"
                                on:click={() => {
                                    uls.update((v) => v + 1);
                                    removeItem(item);
                                }}>Remove</button
                            >
                        </div>
                    </div>
                </div>
            {:else}
                <div class="text-center text-xl bg-white rounded p-4">
                    <div>Your cart is empty</div>
                    <button
                        on:click={() => goto("/")}
                        class="mt-2 bg-blue-500 text-sm text-white px-4 py-2 rounded"
                        >Shop</button
                    >
                </div>
            {/each}
            <div class="mt-4 text-right">
                <p class="text-lg font-semibold">
                    Total: {total.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                    })}
                </p>
                <button
                    on:click={checkout}
                    class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >Checkout</button
                >
            </div>
        </div>
    </div>
</div>
