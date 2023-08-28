import { prisma } from "$lib/utils";
import type { ServerLoad } from "@sveltejs/kit";

export const POST: ServerLoad = async ({ request }) => {
    const body = await request.json();
    try {
        const data = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: body.password,
                url: body.pfp,
                type: "USER"
            }
        })
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e }), { status: 500 })
    }
}
