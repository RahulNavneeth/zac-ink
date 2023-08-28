<script lang="ts">
    import { BASE_URL } from "$lib/constant";
    import axios from "axios";

    type item = {
        id: number;
        name: string;
        price: number;
        ItemImage: Array<{ url: string }>;
    };

    export let data: any;
    let items: Array<item> = data.items;

    let newItem: item = {
        id: 0,
        name: "",
        price: 0,
        ItemImage: [{ url: "" }],
    };

    async function addItem() {
        const { data }: { data: item } = await axios.post(
            BASE_URL + "/api/items",
            {
                name: newItem.name,
                price: newItem.price,
                image: newItem.ItemImage,
            }
        );
        items = [...items, data];
        newItem = { id: 0, name: "", price: 0, ItemImage: [] };
    }

    async function removeItem(index: number) {
        await axios.delete(BASE_URL + "/api/items/" + index);
        items = items.filter((i) => i.id !== index);
    }
</script>

<div class="h-full bg-gray-100">
    <div class="max-w-3xl mx-auto py-8 px-4">
        <h1 class="text-2xl font-semibold mb-4">Admin Dashboard</h1>

        <!-- Add Item Form -->
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 class="text-lg font-semibold mb-2">Add New Item</h2>
            <input
                type="text"
                placeholder="Item Name"
                bind:value={newItem.name}
                class="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                placeholder="Price"
                bind:value={newItem.price}
                class="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            {#each newItem.ItemImage as _, idx}
                <div class="flex flex-row justify-center items-center mb-2">
                    <input
                        type="text"
                        bind:value={newItem.ItemImage[idx].url}
                        class="w-full mr-2 p-2 border border-gray-300 rounded"
                        placeholder="Image URL {idx + 1}"
                    />
                    <button
                        on:click={() =>
                            (newItem.ItemImage = newItem.ItemImage.filter(
                                (_, i) => i !== idx
                            ))}
                        class="bg-red-500 text-white px-4 py-2 rounded"
                        >Remove</button
                    >
                </div>
            {:else}
                <p class="text-gray-500 mb-2">No Image Selected</p>
            {/each}
            <button
                class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                on:click={() =>
                    (newItem.ItemImage = [...newItem.ItemImage, { url: "" }])}
                >Add Image</button
            >
            <button
                class="bg-blue-500 text-white px-4 py-2 rounded"
                on:click={addItem}>Add Item</button
            >
        </div>

        <!-- Item List -->
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-2">Items List</h2>
            {#each items as item}
                <div class="border-b border-gray-300 py-4">
                    <input
                        type="text"
                        bind:value={item.name}
                        class="w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        bind:value={item.price}
                        class="w-20 p-2 border border-gray-300 rounded mr-2"
                    />
                    <div class="flex flex-row gap-4 my-2">
                        {#each item.ItemImage as img}
                            <img
                                src={img.url}
                                alt="Item Photo"
                                class="w-16 h-16 object-cover rounded mr-2"
                            />
                        {/each}
                    </div>
                    <button
                        class="bg-red-500 text-white px-4 py-2 rounded"
                        on:click={() => removeItem(item.id)}>Delete</button
                    >
                </div>
            {/each}
        </div>
    </div>
</div>
