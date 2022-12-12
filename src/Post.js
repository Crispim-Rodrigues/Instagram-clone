import './App.css';

function Post(props){
  function EnviarComentario(e){
    e.preventDefault();
    alert('comentario enviado '+props.id)
  };



    return(
        <div className='postsingle'>
          <p><b>{props.info.username}</b></p>
          <img src={props.info.image}/>
          <p><b>{props.info.username}</b>: {props.info.titulo}</p>
          <form onSubmit={(e)=>EnviarComentario(e)}>
            <textarea></textarea>
            <input type="submit" value='Comentar!'/>
          </form>
        </div>
      )
}

export default Post