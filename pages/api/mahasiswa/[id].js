// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    if (req.method === 'DELETE') {
        const idUser = req.query.id;
        const mahasiswa = await prisma.mahasiswa.delete({
            where: {idUser: parseInt(idUser)}
        });
        res.json(mahasiswa);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}
