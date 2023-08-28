import { prisma } from "$lib/utils";
import jwt from "jsonwebtoken";
import type { ServerLoad } from "@sveltejs/kit";
import * as dotenv from "dotenv"
dotenv.config()

export const POST: ServerLoad = async ({ request, cookies }) => {
    const body = await request.json();
    const data = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password,
        }
    })
    if (data) {
        const token = jwt.sign(data.email, process.env.JWT_PASS || "");
        cookies.set("zac_token", token, { path: "/" })
        return new Response(JSON.stringify(data), { status: 200 })
    } else return new Response(JSON.stringify({ error: "INVALID CRED" }), { status: 500 })
}
