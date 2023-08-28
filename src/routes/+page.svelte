<script lang="ts">
    import { uls } from "../stores/updateLs";

    export let data: any;

    type item = {
        id: number;
        name: string;
        price: number;
        ItemImage: Array<{ url: string }>;
    };

    const items: Array<item> = data.items;

    const scrollTo = () => {
        const el = document.getElementById("shop");
        el?.scrollIntoView({ behavior: "smooth" });
    };
</script>

<body class="bg-gray-100">
    <div class="min-h-screen flex flex-col justify-between">
        <main class="flex-grow bg-gray-100">
            <section
                class="h-screen flex items-center justify-center bg-cover bg-center border-b-2 border-black"
            >
                <div class="container mx-auto px-4 text-center text-white">
                    <h2 class="text-4xl font-bold mb-4 text-black">
                        Welcome to ZAC Clothing
                    </h2>
                    <p class="text-lg mb-8 text-slate-400">
                        Discover the latest in fashion trends.
                    </p>
                    <button
                        on:click={scrollTo}
                        class="bg-blue-500 text-white px-6 py-3 rounded-full inline-block font-semibold hover:bg-blue-600"
                        >Shop Now</button
                    >
                </div>
            </section>
            <section id="shop" class="py-12 bg-white">
                <div class="container mx-auto px-4">
                    <h2 class="text-2xl font-bold mb-4">BEST SELLER</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {#each items as item, idx}
                            <div
                                class="bg-gray-200 p-6 rounded-md border-2 border-gray-600"
                            >
                                <img
                                    class="w-full h-48 object-contain mb-4 bg-black"
                                    src={item.ItemImage[0].url}
                                    alt="Dress 1"
                                />
                                <h3 class="text-xl font-semibold mb-2">
                                    {item.name}
                                </h3>
                                <p class="text-gray-600 mb-2">
                                    {item.price.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                        style: "currency",
                                        currency: "INR",
                                    })}
                                </p>
                                <button
                                    class="bg-blue-500 text-white px-4 py-2 rounded"
                                    on:click={() => {
                                        const r =
                                            window.localStorage.getItem(
                                                "zac_cart"
                                            );
                                        if (r) {
                                            const cart = JSON.parse(r);
                                            if (
                                                cart.find(
                                                    // @ts-ignore
                                                    (i) => i.id === item.id
                                                )
                                            ) {
                                                return;
                                            }
                                            cart.push({ ...item, quantity: 1 });
                                            window.localStorage.setItem(
                                                "zac_cart",
                                                JSON.stringify(cart)
                                            );
                                        } else {
                                            window.localStorage.setItem(
                                                "zac_cart",
                                                JSON.stringify([
                                                    { ...item, quantity: 1 },
                                                ])
                                            );
                                        }
                                        uls.update((v) => v + 1);
                                    }}>Add to Cart</button
                                >
                            </div>
                        {/each}
                    </div>
                </div>
            </section>
            <section class="py-12 bg-gray-200">
                <div class="container mx-auto px-4">
                    <h2 class="text-2xl font-bold mb-4">Categories</h2>
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <div
                            class="bg-white p-4 rounded-md border-2 border-gray-600"
                        >
                            <a href="#" class="text-blue-600 font-semibold"
                                >Tshirt</a
                            >
                        </div>
                        <div
                            class="bg-white p-4 rounded-md border-2 border-gray-600"
                        >
                            <a href="#" class="text-blue-600 font-semibold"
                                >Shirt</a
                            >
                        </div>
                        <div
                            class="bg-white p-4 rounded-md border-2 border-gray-600"
                        >
                            <a href="#" class="text-blue-600 font-semibold"
                                >Sweater</a
                            >
                        </div>
                        <div
                            class="bg-white p-4 rounded-md border-2 border-gray-600"
                        >
                            <a href="#" class="text-blue-600 font-semibold"
                                >Hoodies</a
                            >
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-12 bg-white">
                <div class="container mx-auto px-4">
                    <h2 class="text-2xl font-bold mb-4">New Arrivals</h2>
                    <p>Explore our latest collection of trendy clothing.</p>
                </div>
            </section>
            <section class="py-12 bg-gray-200">
                <div class="container mx-auto px-4">
                    <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
                    <p>
                        Have questions? Reach out to our friendly support team.
                    </p>
                </div>
            </section>
        </main>
        <footer class="bg-white border-t-2 border-black py-4">
            <div class="container mx-auto px-4">
                <p>&copy; 2023 ZAC Clothing. All rights reserved.</p>
            </div>
        </footer>
    </div>
</body>
