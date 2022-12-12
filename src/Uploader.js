import './App.css';
import React from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import {useEffect, useState} from 'react';
import {db, storage} from './firebase.js';
import {ref, getDownloadURL,uploadBytesResumable, uploadBytes,} from "firebase/storage";
import {serverTimestamp } from "firebase/firestore";


function Postar(props){
    const [prograss, Setprograss] = useState(0);

    const [file, setFile] = useState(null);

    function uploadPost(a){
        a.preventDefault();
        const Titulopost = document.getElementById('Titulo-upload').value;
        const storageRef = ref(storage, `images/${file.name}`)
        uploadBytes(storageRef, file).then((snapshot)=>{  
        })
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            Setprograss(progress)
        },(error)=>{

        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => { 
                    await addDoc(collection(db, 'posts'), {
                        titulo: Titulopost,
                        image: downloadURL,
                        username: props.user,
                        timestamp: serverTimestamp()  
                    });
              });
              Setprograss(0);
              setFile('')
              alert('enviado com sucesso')
              let reset1 = document.querySelector('.FormUp')
              reset1.style.display = 'none'
              document.getElementById('file').value = ''
              document.getElementById('Titulo-upload').value = ''
            }
        )
       
    }

    function fecharup(e){
        e.preventDefault();
        let modalup = document.querySelector('.FormUp')
      
        modalup.style.display = 'none'
    }  


    return(
        <div draggable="false" className='FormUp'>
            <div onClick={(e)=>fecharup(e)} draggable="false" className='fecharUp'><span className='pointer'>X</span></div>
            <form className='FormUploader'>
                <h3>Criar nova publicação</h3>
                <progress id='prograssupload' value={prograss}></progress>
                <textarea id='Titulo-upload' type='text' placeholder='Titulo do post...'></textarea>
                <input onChange={(e)=>setFile(e.target.files[0])} id='file' className='EnviarArquivo' name='file' type='file'></input>
                <a onClick={(a)=>uploadPost(a)} id='Criarpost' className='Criarpost'>Criar post..</a>
            </form>
        </div>
    )
} 

export default Postar