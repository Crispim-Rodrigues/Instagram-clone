import logo from './logo.png';
import seta from './seta-para-baixo.png';
import './App.css';
import {useEffect, useState} from 'react';
import {auth} from './firebase.js';
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";

function Header(props){
    useEffect(()=>{
    },[])
    onAuthStateChanged(auth, (user) => {
        if (user) {
          props.setUser(user.displayName)
        }})

    function CriarConta(e){
        e.preventDefault();
        let email1 = document.getElementById('email-cadastro');
        let username = document.getElementById('username-cadastro');
        let password1 = document.getElementById('password-cadastro');
        // Criar conta 
        createUserWithEmailAndPassword(auth,email1.value, password1.value)
        .then((authUser)=>{
           updateProfile(authUser.user, {displayName: username.value})
           let criarForm = document.querySelector('.FormCadastro');
           criarForm.style.display = 'none';
           email1.value = ''
           username.value = ''
           password1.value = ''
           alert('Conta criada com sucesso')
        }).catch((error)=>{
            alert(error.message)
        });
    }

    function Logar(e){
        let email = document.getElementById('email-login').value
        let password = document.getElementById('password-login').value
        signInWithEmailAndPassword(auth, email, password)
        .then((authsign)=>{
            props.setUser(authsign.user.displayName)
            alert("Logado com Sucesso")
        }).catch((error)=>{
            alert(error.message)
        })
    }   


    function FazerConta(e){
        var criarForm = document.querySelector('.FormCadastro');
        e.preventDefault();
        criarForm.style.display = 'flex'
    }
    function FazerLogin(e){
        var criarForm = document.querySelector('.FormCadastro');
        
        e.preventDefault(); 
        criarForm.style.display = 'none'
    }
    function logout(e){
        signOut(auth).then(()=>{
            alert('deslogado com sucesso')
            props.setUser(null)
        }).catch((error)=>{
            alert(error.message)
        })
    }

    return(
        <div className='header'>
            <div className='center'>
                <div className='header_logo'>
                    <img draggable="false" className='logo' src={logo}></img><img draggable="false" className='seta' src={seta}></img>
                </div>
                {
                    (props.user)?
                    <div className='Header_logado'>
                        <span>Olá, <b>{props.user}</b></span>
                        <a draggable="false" onClick={(e)=>{logout(e)}} href='#'>Sair!</a>
                    </div>
                    :
                    <div className='header_loginForm'>
                        <div draggable="false" className='FormLogin'>
                            <a href='#'><img draggable="false" className='logo1' src={logo}></img></a>
                            <input id='email-login' type='text' placeholder='Telefone, nome de usuário ou email'/>
                            <input id='password-login' type='password' placeholder='Senha'/>
                            <input onClick={(e)=>Logar(e)} type='submit' name='acao' className='acao' value='Entrar' />
                            <span>Não tem a conta? <a onClick={(e)=>FazerConta(e)} href='#'>Cadastre-se</a></span>
                        </div>
                        <form className='FormCadastro'>
                            <a href='#'><img draggable="false" className='logo1'  src={logo}></img></a>
                            <input id='email-cadastro' type='text' placeholder='Email...'/>
                            <input id='username-cadastro' type='text' placeholder='Nome de Usuario...'/>
                            <input id='password-cadastro' type='password' placeholder='Senha'/>
                            <input onClick={(e)=>CriarConta(e)} type='submit' name='Criar' className='acao' value='Criar Conta' />
                            <span>Ja tem a conta? <a onClick={(e)=>FazerLogin(e)} href='#'>Faça Login</a></span>
                        </form>

                    </div>
                }
            </div> 
        </div>
    )
};

export default Header
