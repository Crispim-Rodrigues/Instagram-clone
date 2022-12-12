import './App.css';
import postar from './postagem-no-instagram.png';

function Footer(){
    function abrirup(e){
        e.preventDefault();
        let modalup = document.querySelector('.FormUp')
        modalup.style.display = 'block'
    } 
    return(
            <footer className='footer'>
                <div className='navbar'>
                    <img onClick={(e)=>{abrirup(e)}} draggable="false" src={postar}></img>
                </div>
            </footer>
    )
}

export default Footer