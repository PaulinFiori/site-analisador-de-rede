import React from 'react';
import "./Perfil.css"; 
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { Link, useHistory } from 'react-router-dom';
import { NomeAtual, SenhaAtual, EmailAtual, TelefoneAtual, TipoAtual, CpfAtual, UsuarioAtual, LogOut } from '../src/server';
import Axios from 'axios';

export function Mostrar_Perfil()
{
    Axios.post('http://localhost:3001/MostrarPerfil', {
    Email: EmailAtual,
  }).then((response) => {
    if(response.data.message)
    {
      alert(response.data.message);
    }
    else{
      UsuarioAtual(response.data[0].Nome, response.data[0].Senha, response.data[0].Email, response.data[0].Telefone, response.data[0].Tipo, response.data[0].Cpf);
      document.getElementById('nome2').value = NomeAtual;
      document.getElementById('senha').value = SenhaAtual;
      document.getElementById('telefone').value = TelefoneAtual;
      document.getElementById('Tipo2').value = TipoAtual;
      document.getElementById('cpf').value = CpfAtual;
    }
  });

}

function Mudar_Perfil()
{
    var NomeDigitado = document.getElementById('nome2').value;
    var SenhaDigitado = document.getElementById('senha').value;
    var TelefoneDigitado = document.getElementById('telefone').value;
    var select = document.getElementById('Tipo2');
    var value = select.options[select.selectedIndex].value;
    var CpfDigitado = document.getElementById('cpf').value;
    var PerfilStatus;

    if(NomeDigitado == '' || SenhaDigitado == '' || TelefoneDigitado == '' || CpfDigitado == '') alert("Preencha os campos!");
    else
    {
      Axios.post('http://localhost:3001/MudarPerfil', {
      Nome: NomeDigitado,
      Senha: SenhaDigitado,
      Telefone: TelefoneDigitado,
      Tipo: value,
      Cpf: CpfDigitado,
      Email: EmailAtual,
      }).then((response) => {
      if(response.data.message)
      {
        alert("Perfil Atualizado!");
        Mostrar_Perfil();
      }
      else{
        alert("Não foi possível atualizar!");
      }
    });
  }
}

function Perfil() {
  document.title = "Perfil - Interdisciplinar";
  var history = useHistory();

  function Sair()
  {
    var sair = window.confirm("Tem certeza?");

    if(sair == true)
    {
      LogOut();
      history.push('/');
    }
  }
    return (
        <div className="perfil">
            <div className="perfil__center">
                <form>  
                    <h1>Perfil</h1>
                    <h5>Nome:</h5>
                    <input type="nome" id = "nome2"/>
                    <h5>Password:</h5>   
                    <input type="senha" id = "senha"/>
                    <h5>Telefone:</h5>
                    <input type="telefone" id = "telefone"/>
                    <h5>Tipo:</h5>
                    <select id = "Tipo2">
                      <option value = "Pessoa">Pessoa</option>
                      <option value = "Empresa">Empresa</option>
                    </select><br></br>
                    <h5>Cpf/Cnpj:</h5>
                    <input type="cpf" id = "cpf"/>
                   <button type = 'button' className="register__registerButton" onClick = {Mostrar_Perfil}>Mostrar Perfil</button>
                   <button type = 'button'  className="register__registerButton" onClick = {Mudar_Perfil}>Editar Perfil</button>
                   <button type = 'button' className="register__registerButton" onClick = {Sair}>Sair</button>
                </form>
            </div>
        </div>
    )
}

export default Perfil
