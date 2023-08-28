<script lang="ts">
    import { goto } from "$app/navigation";
    import { BASE_URL } from "$lib/constant";
    import axios from "axios";

    let username: string = "";
    let email: string = "";
    let password: string = "";
    let c_password: string = "";
    let pfp: string = "";

    async function register() {
        if (!!!username || !!!email || !!!password || !!!c_password || !!!pfp) {
            alert("Please fill in all fields");
            return;
        } else if (password !== c_password) {
            alert("Password and Confirm Password must be the same");
            return;
        } else {
            try {
                await axios.post(BASE_URL + "/api/auth/register", {
                    username,
                    email,
                    password,
                    pfp,
                });
                alert("Registered successfully");
                goto("/auth/login");
            } catch (e) {
                alert("Username or email already exists");
            }
        }
    }
</script>

<div class="h-full flex flex-col justify-center items-center bg-gray-100">
    <div class="p-8 rounded-lg w-[90%] sm:w-[30%]">
        <h2 class="text-2xl text-center font-semibold mb-4">Register</h2>
        <div class="mb-4">
            <label for="email" class="block mb-1 font-semibold">Email</label>
            <input
                type="email"
                id="email"
                bind:value={email}
                class="w-full py-2 px-4 border-2 border-black rounded"
            />
        </div>
        <div class="mb-4">
            <label for="user" class="block mb-1 font-semibold">Username</label>
            <input
                type="text"
                id="username"
                bind:value={username}
                class="w-full py-2 px-4 border-2 border-black rounded"
            />
        </div>
        <div class="mb-4">
            <label for="password" class="block mb-1 font-semibold"
                >Password</label
            >
            <input
                type="password"
                id="password"
                bind:value={password}
                class="w-full py-2 px-4 border-2 border-black rounded"
            />
        </div>
        <div class="mb-4">
            <label for="password" class="block mb-1 font-semibold"
                >confirm password</label
            >
            <input
                type="password"
                id="password"
                bind:value={c_password}
                class="w-full py-2 px-4 border-2 border-black rounded"
            />
        </div>
        <div class="mb-6">
            <label for="pfp" class="block mb-1 font-semibold"
                >Profile picture URL</label
            >
            <input
                type="text"
                id="pfp"
                bind:value={pfp}
                placeholder="https://example.com/pfp.png"
                class="w-full py-2 px-4 border-2 border-black rounded"
            />
        </div>
        <button
            class="bg-blue-500 text-white px-4 py-2 rounded w-full"
            on:click={register}>Register</button
        >
        <a class="text-end" href="/auth/login">Have account?</a>
    </div>
</div>
