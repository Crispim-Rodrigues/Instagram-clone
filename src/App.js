import './App.css';
import Header from './Header';
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';
import {useEffect, useState} from 'react';
import Footer from './Footer';
import Postar from './Uploader.js';
import {db} from './firebase.js';
import Post from './Post.js';

function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
  const Snapshot = async()=>{
    const q = query(collection(db, "posts"), orderBy("timestamp", 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const post = []
      querySnapshot.forEach((doc) => {
        post.push({id:doc.id, info:doc.data()});
      });
    setPosts(post);
    });      
  };
  Snapshot()
  },[])
  return (
    <div className='app'> 
      <Footer></Footer>
      <Header setUser={setUser} user={user}></Header>
      {(user)?<Postar setUser={setUser} user={user}></Postar>:<></>}
      {(user)?<div className='centerpost'>{posts.map((val)=>{return(<Post user={user} info={val.info} id={val.id}></Post>)})}</div>:<></>}
    </div>
  );
}

export default App;