import { prisma } from "$lib/utils";
import type { ServerLoad } from "@sveltejs/kit";

export const DELETE: ServerLoad = async ({ params }) => {
    const id = Number(params.id);
    await prisma.itemImage.deleteMany({
        where: {
            itemId: id
        }
    });

    const data = await prisma.item.delete({
        where: {
            id
        },
    });
    return new Response(JSON.stringify(data), { status: 200 });
};
