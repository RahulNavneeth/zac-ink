import type { Handle } from "@sveltejs/kit";
import axios from "axios";
import * as dotenv from "dotenv"
import { BASE_URL } from "$lib/constant";
dotenv.config()

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get("zac_token");
    if (!session) {
        return await resolve(event)
    }
    try {
        const { data } = await axios.get(BASE_URL + "/api/me?token=" + session)
        event.locals.user = data;
    } catch (e) {
        console.log(e)
    }
    return await resolve(event)
}
