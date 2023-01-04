import React, { useState } from 'react';
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { EmailAtual, UsuarioAtual } from '../src/server';
import Axios from 'axios';

function Login() {   
  document.title = "Interdisciplinar";
  var history = useHistory();

  function  FazerLogin()
  {
    var NomeDigitado = document.getElementById('nome2').value;
    var SenhaDigitado = document.getElementById('senha').value;

    if(NomeDigitado == '' || SenhaDigitado == '') alert("Preencha os campos!");
    else
    {
    Axios.post('http://localhost:3001/login', {
    Senha: SenhaDigitado,
    Email: NomeDigitado,
    }).then((response) => {
      if(response.data.message)
      {
        alert(response.data.message);
      }
      else{
        UsuarioAtual(response.data[0].Nome, response.data[0].Senha, response.data[0].Email, response.data[0].Telefone, response.data[0].Tipo, response.data[0].Cpf);

        document.getElementById('nome2').value = '';
        document.getElementById('senha').value = '';

        history.push("/home");
      }
    });
    }
  }
      
    return (  
            <div className="login">
                    <img
                    className="login__logo"
                    src="https://image.flaticon.com/icons/png/512/48/48963.png" 
                    alt=""
                    /> 
    
                <div className="login__container">
                    <h1>Login</h1>
                    <form>  
                        <h5>Email:</h5>
                        <input type="text" name="nome" id = "nome2"/>
                        <h5>Senha:</h5>   
                        <input type="password" name="password" id = "senha"/>
                        
                        <button type = "button" onClick={FazerLogin} className="login__signInButton">Entrar</button>    
                    </form>
                    <div className="login__registerButton">
                    <Link to="/register">    
                        <button type = "button" className="register__registerButton">Novo?</button>
                    </Link>
                    </div>
                </div>
            </div>
    );
} 


export default Login;
