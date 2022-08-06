// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    if (req.method === 'DELETE') {
        const id = req.query.id;
        const jurusan = await prisma.jurusan.delete({
            where: {id: parseInt(id)}
        });
        res.json(jurusan);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}
