import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { io } from 'socket.io-client'
import { Container } from '@mui/material';
const Home = () => {
    const [socket, setSocket] = useState();
    const { name } = useParams()
    const [rel,setRel]=useState(name)
    const [doc, setDoc] = useState();
    const nav = useNavigate()
    useEffect(() => {
        const socketserver = io("https://worddocument-api.onrender.com");
        setSocket(socketserver);
        return () => {
            socketserver.disconnect();
        }
    }, [])
    console.log(socket)
    useEffect(() => {
        const handlefun = (doc) => {
            setDoc(doc)
        }
        if (socket === null) return;
        socket && socket.emit('send-doc', name)
        socket && socket.on("get_doc", handlefun)
        return () => {
            socket && socket.off('get_doc', handlefun)
        }

    }, [socket,rel])
    const handleClick = (i) => {
        nav(`/files/${name}/${i.docId}`)
        setRel(name)
    }
    const handleDelete=(id)=>{
        console.log(id)
        socket && socket.emit('del-doc',id);
        setRel(id)

    }
    return (
        <div>
            <div className='navbar'>
            <h1 className='name'>
              Welcome "    {name} "
            </h1>
            <button className='btn' onClick={() => { nav(`/files/${name}/${uuid()}`) }}>New</button>

            </div>
            <Container>
                {doc? 
                doc.map((i, ind) => (
                    <div className='box' key={ind} >
                    <h1 className='doc' onClick={() => handleClick(i)}>Document {ind + 1}</h1>
                    <button className='delete' onClick={()=>handleDelete(i.docId)}>delete</button>
                    </div>
                    ))
                    :"No Documents Found"}
            </Container>
        </div>

    )
}

export default Home