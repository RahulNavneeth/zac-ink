import { prisma } from "$lib/utils";
import type { ServerLoad } from "@sveltejs/kit";

export const GET: ServerLoad = async () => {
    const data = await prisma.item.findMany({
        include: {
            ItemImage: true,
        }
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export const POST: ServerLoad = async ({ request }) => {
    const { name, price, image } = await request.json();
    const data = await prisma.item.create({
        data: {
            name,
            price,
            ItemImage: {
                createMany: {
                    data: image
                }
            }
        },
        include: {
            ItemImage: true,
        }
    })
    return new Response(JSON.stringify(data), { status: 200 });
}
