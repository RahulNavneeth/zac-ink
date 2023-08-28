<script lang="ts">
    import { goto } from "$app/navigation";
    import { BASE_URL } from "$lib/constant";
    import axios from "axios";
    import { user } from "../../../stores/user";

    let email = "";
    let password = "";

    async function login() {
        if (!!!email || !!!password) {
            alert("Please fill in all fields");
            return;
        } else {
            try {
                const { data } = await axios.post(
                    BASE_URL + "/api/auth/login",
                    {
                        email,
                        password,
                    },
                    {
                        withCredentials: true,
                    }
                );
                user.set(data);
                alert("Logged in successfully");
                goto("/");
            } catch (e) {
                alert("Invalid email or password");
            }
        }
    }
</script>

<div class="h-full flex flex-col justify-center items-center bg-gray-100">
    <div class="p-8 rounded-lg w-[90%] sm:w-[30%]">
        <h2 class="text-2xl text-center font-semibold mb-4">Login</h2>
        <div class="mb-4">
            <label for="email" class="block mb-1 font-semibold">Email</label>
            <input
                type="email"
                id="email"
                bind:value={email}
                class="w-full py-2 px-4 border-2 border-black rounded"
            />
        </div>
        <div class="mb-6">
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
        <button
            class="bg-blue-500 text-white px-4 py-2 rounded w-full"
            on:click={login}>Login</button
        >
        <a class="text-end" href="/auth/register">Don't have account?</a>
    </div>
</div>
