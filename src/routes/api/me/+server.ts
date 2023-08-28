import { prisma } from "$lib/utils";
import type { ServerLoad } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"
dotenv.config()

export const GET: ServerLoad = async ({ url }) => {

    const token = url.searchParams.get("token") || "";

    const email = jwt.verify(token, process.env.JWT_PASS || "");

    if (!email) { return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 }); }

    const data = await prisma.user.findUnique({
        where: {
            email: email as string
        },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

