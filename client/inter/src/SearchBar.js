import React from 'react';
import "./SearchBar.css";
import Axios from 'axios';

function Fazer_Pesquisar()
{
  var PesquisaStatus;

  var NomeDigitado = document.getElementById('nome').value;

  var tipo = document.getElementById('tipo');
  var valuetipo = tipo.options[tipo.selectedIndex].value;

  var fila = document.getElementById('fila');
  var valuefila = fila.options[fila.selectedIndex].value;

  if(NomeDigitado == '' && valuetipo == 'Nenhum' && valuefila == 0) alert("Preencha pelo menos um campo!");
  else
  {
  Axios.post('http://localhost:3001/Pesquisar', {
    Id_Analise: valuefila,
    Nome_Usuario: NomeDigitado,
    Tipo: valuetipo,
  }).then((response) => {
    if(response.data.message)
    {
      PesquisaStatus = response.data.message;
      alert(PesquisaStatus);
      document.getElementById('ResultadoPesquisa').innerHTML = "";
    }
    else{
      PesquisaStatus = response.data;

      for(let i = 0; i < PesquisaStatus.length; i++)
      {
        if(i == 0) 
        {
          document.getElementById('ResultadoPesquisa').innerHTML = "";
          document.getElementById('ResultadoPesquisa').innerHTML += "Nome da Análise: " + response.data[i].Nome_Analise + "<br/> Nome de quem fez:  " + response.data[i].Nome_Usuario + "<br/> Tipo: " + response.data[i].Tipo + "<br/> " + response.data[i].Dados + response.data[i].Resultado;
        }
        document.getElementById('ResultadoPesquisa').innerHTML += "<br/><br/>Nome da Análise: " + response.data[i].Nome_Analise + "<br/> Nome de quem fez:  " + response.data[i].Nome_Usuario + "<br/> Tipo: " + response.data[i].Tipo + "<br/> " + response.data[i].Dados + response.data[i].Resultado;
      }
    }
  });
  }
}

function SearchBar() {
  document.title = "Pesquisa - Interdisciplinar";

    return (
        <div className="searchBar">
            <form>
        <label> Tipo: &nbsp;
        </label>
        <select id = "tipo">
          <option value="Nenhum">Nenhum</option>
          <option value="Pessoa">Pessoa</option>
          <option value="Empresa">Empresa</option>
        </select>&nbsp;

        <label> Fila: &nbsp;
        </label>
        <select id = "fila">
        <option  value="0">Nenhuma</option>
          <option  value="1">Sistema classico</option>
          <option  value="2">M-servidores</option>
          <option  value="3">Infintos servidores</option>
          <option  value="4">Capacidade finita</option>
          <option  value="5">M-servidores com capacidade infinita</option>
          <option  value="6">População finita com um servidor</option>
          <option  value="7">População finita com infinitos servidores</option>
          <option  value="8">M-servidores com capacidade e população finitos</option>
        </select>&nbsp;

        <label> Nome: &nbsp;
        <input type="text" name="nome" id = "nome"/>
        </label> &nbsp;
        <button type = "button" id ="Pesquisa" onClick = {Fazer_Pesquisar}>Pesquisar</button>
        </form> <br/><br/>

        <div id= "Dados">
            <h1 id = "centralizado">Resultado</h1>
            <p id= "ResultadoPesquisa"></p>
        </div>
        </div>
    ) 
}

export default SearchBar
