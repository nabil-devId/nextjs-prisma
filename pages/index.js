import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import {useRouter} from "next/router";

const prisma = new PrismaClient();
const addMahasiswaFunc = async () => {

}
export default function Home(props) {
  const [mahasiswa, setMahasiswa] = useState('');
  const router = useRouter();
  const [jurusan, setJurusan] = useState(props.jurusan[0]?? null);
  const [loading, setLoading] = useState(false);
  if (loading){
      return <div>Loading...</div>;
  }
  const createMahasiswa = async () =>{
      setLoading(true);
      try {
          await fetch('/api/mahasiswa', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({mahasiswa, jurusan}),
          });
          await router.replace(router.asPath);
          await setLoading(false);
      } catch (error) {
          setLoading(false);
          console.error(error);
      }
  }
    const createJurusan = async () =>{
        setLoading(true);
        try {
            await fetch('/api/jurusan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({jurusan: jurusan}),
            });
            await router.replace(router.asPath);
            await setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    const deleteMahasiswa = async id =>{
        setLoading(true);
        try {
            await fetch('/api/mahasiswa/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            await router.replace(router.asPath);
            await setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const jurusanOnChange = e => {
        const data = props.jurusan.find(jrsn => jrsn.id === parseInt(e.target.value));
        setJurusan(data);
    }

  const deleteJurusan = async id => {
      setLoading(true);
      try {
          await fetch('/api/jurusan/' + id, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
          });
          await router.replace(router.asPath);
          await setLoading(false);
      } catch (error) {
          setLoading(false);
          console.error(error);
      }
  }

  return (
    <div style={{width: '100%', paddingLeft: 200, paddingRight: 200, paddingTop: 50}}>
        <input type="text" onChange={(e) => setMahasiswa(e.target.value)}/>
        <br/>
        <select name="jurusan" id="jurusan" onChange={jurusanOnChange} defaultValue={props.jurusan[0]??null}>
            {props.jurusan.map(jurusan2 => <option key={jurusan2.id} value={jurusan2.id}>{jurusan2.namaJurusan}</option>)}
        </select>
        <br/>
        <button onClick={createMahasiswa}>Add mahasiswa</button>
        <hr/>
        <input type="text" onChange={(e) => setJurusan(e.target.value)}/>
        <br/>
        <button onClick={() => createJurusan()}>Add Jurusan</button>
        <br/>
        <h1>Mahasiswa</h1>
        <ul>
            {props.mahasiswa.map(mahasiswa => <li key={mahasiswa.idUser}>{mahasiswa.nama} - {mahasiswa.jurusan.namaJurusan} <a href="#" style={{color: 'blue'}} onClick={() => deleteMahasiswa(mahasiswa.idUser)}>Delete</a></li>)}
        </ul>

        <h1>Jurusan</h1>
        <ul>
            {props.jurusan.map(jurusan => <li key={jurusan.id}>{jurusan.namaJurusan} <a href="#" style={{color: 'blue'}} onClick={() => deleteJurusan(jurusan.id)}>Delete</a></li>)}
        </ul>
    </div>
  )
}
export async function getServerSideProps(context) {
    const mahasiswa = await prisma.mahasiswa.findMany({
        include: {
            jurusan: true
        }
    });
    const jurusan = await prisma.jurusan.findMany();
    return {
        props: {
            mahasiswa,
            jurusan
        }
    }
}
