// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { mahasiswa, jurusan } = req.body;

        const result = await prisma.mahasiswa.create({
            data: {
                email: mahasiswa + '@email.com',
                nama: mahasiswa,
                jurusanId: jurusan
            }
        });
        res.json(result);
    }
}
