import React, { useState } from 'react';
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import Axios from 'axios';

function Register() {
  document.title = "Registrar - Interdisciplinar";
  var history = useHistory();

  function FazerRegistro()
  {
    var nomeDigitado = document.getElementById('Nome').value;
    var senhaDigitado = document.getElementById('senha').value;
    var emailDigitado = document.getElementById('email').value;
    var telefoneDigitado = document.getElementById('telefone').value;
    var tipo = document.getElementById('Tipo');
    var valuetipo = tipo.options[tipo.selectedIndex].value;
    var cpfDigitado = document.getElementById('cpf').value;
  
  
    Axios.post('http://localhost:3001/register', {
      Nome: nomeDigitado,
      Senha: senhaDigitado,
      Email: emailDigitado,
      Telefone: telefoneDigitado,
      Tipo: valuetipo,
      Cpf: cpfDigitado,
    }).then((response) => {
      if(response.data.message)
      {
        alert(response.data.message);
      }
      else{
        alert("Cadastrado com sucesso!");
        history.push('/');
      }
    });
  }

    return (
        <div className="register">
            <img
                className="register__logo"
                src="https://image.flaticon.com/icons/png/512/48/48963.png" 
                alt=""
                /> 
            <div className="register__container">
                <h1>Registrar</h1>
                <form>  
                    <h5>Nome:</h5>
                    <input type="test" id = "Nome"/>
                    <h5>E-mail:</h5>
                    <input 
                    type="email" id = "email"/>
                    <h5>Senha:</h5>   
                    <input type="password" id = "senha"/>
                    <h5>Telefone:</h5>
                    <input type="telefone" id = "telefone"/>
                    <h5>Tipo:</h5>
                    <select id = "Tipo">
                      <option value = "Pessoa">Pessoa</option>
                      <option value = "Empresa">Empresa</option>
                    </select><br></br>
                    <h5>Cpf/Cpnj:</h5>
                    <input type="cpf" id = "cpf"/>

                    <button type = "button" onClick={FazerRegistro} className="register__registerButton">Cria a sua conta</button>
                    
                    <Link to="/">    
                        <button type = "button" className="register__registerButton">Voltar ao login</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register
