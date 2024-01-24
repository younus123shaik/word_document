import React, { useEffect, useState } from 'react'
import Quill from 'quill'
import'quill/dist/quill.snow.css'
import styled from '@emotion/styled'
import {io } from 'socket.io-client'
import {Box, Container} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
const Component = styled.div`
background : #F5F5F5;`
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      
    [{ 'indent': '-1'}, { 'indent': '+1' }],          
    [{ 'direction': 'rtl' }],                         
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link'],
    ['clean']                                       
  ];
const TextEditor = () => {
    const [quill,setQuill]=useState();
    const [socket,setSocket]=useState();
    const id=useParams();
    const nav=useNavigate()
    useEffect(()=>{
      const quillserver=  new Quill('#container',{theme:'snow',modules:{toolbar:toolbarOptions}});
      quillserver.disable();
        quillserver.setText('Loading the document...')
      setQuill(quillserver);
    },[]);
    useEffect(()=>{
        const socketserver = io.connect('https://worddocument-api.onrender.com');
        setSocket(socketserver)
        return()=>{
            socketserver.disconnect();
        }
    },[])
    useEffect(()=>{
        if(quill === null || socket=== null) return;
        const handleChange = (delta , oldDelta,source)=>{
            if (source!=='user')return;
            socket.emit('send-changes',delta);
        }
        quill && quill.on('text-change',handleChange)
        return ()=>{
            quill && quill.off('text-change',handleChange)
        }
    },[socket,quill])
    useEffect(()=>{
        if (socket === null) return;
        const handleChange = (delta)=>{
    
            quill.updateContents(delta)
        }
        socket && socket.on('receive-changes',handleChange);
        return ()=>{
            socket && socket.off('receive-changes',handleChange)
        }
    },[socket,quill])
    useEffect(() => {
        if (quill === null || socket === null) return;

        socket && socket.once('load-document', document => {
          
          quill.setText(document);
          quill.enable();
        })

        socket && socket.emit('get-document', id);
    },  [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null ||(quill&&quill.getContents()=== undefined)) return;

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    }, [socket, quill]);
  return (
    <Component>
      <div className='back'>
        <button className='backbtn' onClick={()=>{nav(`/home/${id.name}`)}}>Back</button>
      </div>
        <Box className='container' id='container'>TextEditor</Box>
    </Component>
  )
}

export default TextEditor