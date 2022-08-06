import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import {useRouter} from "next/router";

const prisma = new PrismaClient();
const addMahasiswaFunc = async () => {

}
export default function Home(props) {
  const [mahasiswa, setMahasiswa] = useState('');
  const router = useRouter();
  const [jurusan, setJurusan] = useState(props.jurusan[0].id);
  const createMahasiswa = async () =>{
      try {
          await fetch('/api/mahasiswa', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({mahasiswa, jurusan}),
          });
          await router.replace(router.asPath);
      } catch (error) {
          console.error(error);
      }
  }
    const createJurusan = async () =>{
        try {
            await fetch('/api/jurusan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({jurusan: jurusan}),
            });
            await router.replace(router.asPath);
        } catch (error) {
            console.error(error);
        }
    }
    const deleteMahasiswa = async id =>{
        try {
            await fetch('/api/mahasiswa/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            await router.replace(router.asPath);
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
        <input type="text" onChange={(e) => setMahasiswa(e.target.value)}/>
        <select name="jurusan" id="jurusan" onChange={e => setJurusan(e.target.value)} value={jurusan}>
            {props.jurusan.map(jurusan => <option key={jurusan.id} value={jurusan.id}>{jurusan.namaJurusan}</option>)}
        </select>
        <button onClick={createMahasiswa}>Add mahasiswa</button>

        <input type="text" onChange={(e) => setJurusan(e.target.value)}/>
        <button onClick={() => createJurusan()}>Add Jurusan</button>
        <h1>Mahasiswa</h1>
        <ul>
            {props.mahasiswa.map(mahasiswa => <li key={mahasiswa.idUser}>{mahasiswa.nama} <a href="#" style={{color: 'blue'}} onClick={() => deleteMahasiswa(mahasiswa.idUser)}>Delete</a></li>)}
        </ul>
    </div>
  )
}
export async function getServerSideProps(context) {
    const mahasiswa = await prisma.mahasiswa.findMany();
    const jurusan = await prisma.jurusan.findMany();
    return {
        props: {
            mahasiswa,
            jurusan
        }
    }
}
