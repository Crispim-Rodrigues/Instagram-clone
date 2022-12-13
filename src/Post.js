import './App.css';
import {db} from './firebase.js';
import {addDoc, collection, doc} from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import {orderBy, onSnapshot, query } from 'firebase/firestore';
import {serverTimestamp} from "firebase/firestore";

function Post(props){
  const [comentarios, setComentario] = useState([])

  useEffect(()=>{
    const Snapshot = async()=>{
      const q = query(collection(db, 'posts',props.id,'comentarios'), orderBy("timestamp", 'desc'));
      onSnapshot(q, (querySnapshot) => {
          const post = []
          querySnapshot.forEach((doc) => {
            post.push({id:doc.id, info:doc.data()});
          });
          setComentario(post);
        });     
    };
    Snapshot()
    },[])






  async function EnviarComentario(id, e){
    e.preventDefault();
    let coment = document.querySelector('#coment'+id).value;
    await addDoc(collection(db, 'posts',id,'comentarios'), {
       user: props.user,
       comentario: coment,
       timestamp: serverTimestamp()
    });
    document.querySelector('#coment'+id).value = ''
  }
    return(
        <div className='postsingle'>
          <p><b>{props.info.username}</b></p>
          <img src={props.info.image}/>
          <p><b>{props.info.username}</b>: {props.info.titulo}</p>
          {
            comentarios.map((val)=>{
              return(
                <div className='cc'>
                  <span><b>{val.info.user}: </b>{val.info.comentario}</span>
                </div>
              )
            })
          }
          <form onSubmit={(e)=>EnviarComentario(props.id, e)}>
            <textarea id={'coment'+props.id}></textarea>
            <input type="submit" value='Comentar!'/>
          </form>
        </div>
      )
}

export default Post