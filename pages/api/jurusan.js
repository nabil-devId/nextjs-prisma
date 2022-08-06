// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { jurusan } = req.body;

    const result = await prisma.jurusan.create({
        data: {
            namaJurusan: jurusan
        }
    });
    res.json(result);
}
