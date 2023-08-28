import { BASE_URL } from "$lib/constant";
import axios from "axios";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const { data } = await axios.get(BASE_URL + "/api/items");
    return {
        items: data
    }
}
