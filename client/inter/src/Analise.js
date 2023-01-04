import React from 'react';
import "./analise.css";
import CardSelecionar from "./CardSelecionar.js";
import CardCalcular from "./CardCalcular.js";
import CardPrint from "./CardPrint.js";
import BannerAnalise from "./BannerAnalise.js";
import { ReceberDados, Print, FazerPrint , Nome_da_fila, GuardarDados, GuardarResultado} from "./FazerAnalise";
import { EmailAtual, NomeAtual, TipoAtual } from '../src/server';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export function HabilitaInputs()
{
  var select = document.getElementById('Fila');
  var value = select.options[select.selectedIndex].value;

  if(value <= 3)
    {
      document.getElementById('k').disabled = true;
      document.getElementById('b').disabled = true;
      document.getElementById('po').disabled = true;

      document.getElementById('k').value = 0;
      document.getElementById('b').value = 0;
      document.getElementById('po').value = 0;
    }

  else if(value <= 5 && value >= 4)
    {
      document.getElementById('b').disabled = false;
      document.getElementById('k').disabled = true;
      document.getElementById('po').disabled = true;

      document.getElementById('k').value = 0;
      document.getElementById('b').value = '';
      document.getElementById('po').value = 0;
    }

  else if(value <= 7)
    {
      document.getElementById('k').disabled = false;
      document.getElementById('b').disabled = true;
      document.getElementById('po').disabled = true;

      document.getElementById('k').value = '';
      document.getElementById('b').value = 0;
      document.getElementById('po').value = 0;
    }

  else if(value == 8)
    {
      document.getElementById('k').disabled = false;
      document.getElementById('b').disabled = false;
      document.getElementById('po').disabled = false;

      document.getElementById('k').value = '';
      document.getElementById('b').value = '';
      document.getElementById('po').value = '';
    }
}


function ApertaBotao()
{
  var Fila = document.getElementById('Fila');
  var valuefila = Fila.options[Fila.selectedIndex].value;
  var AnaliseStatus;

  var Y = document.getElementById('y').value;
  var U = document.getElementById('u').value;
  var M = document.getElementById('m').value;
  var N = document.getElementById('n').value;
  var K = document.getElementById('k').value;
  var B = document.getElementById('b').value;
  var P0 = document.getElementById('po').value;
    
  if(Y == '' || U == '' || M == '' || N == '' || K == '' || B == '') alert("Insira dados!");
  else
  {
    ReceberDados(Y, U, N, M, K, B, P0);

  Print(valuefila);

  document.getElementById("AnaliseCalculada").innerHTML = FazerPrint();

  var NomeFila = Nome_da_fila();
  var Dado = GuardarDados();
  var resultado = GuardarResultado();

  Axios.post('http://localhost:3001/FazerAnalise', {
    Id_Analise: valuefila,
    Email_Usuario: EmailAtual,
    Nome_Usuario: NomeAtual,
    Nome_Analise: NomeFila,
    Tipo: TipoAtual,
    Dados: Dado,
    Resultado: resultado,
  }).then((response) => {
    if(response.data.message)
    {
      AnaliseStatus = response.data.message;
      alert(AnaliseStatus);
    }
    else{
      alert("Cadastrado com sucesso!");
    }
  });
  }
}

function Analise() {
  document.title = "Analise - Interdisciplinar";
    return (
        <div className = "analise">
            <BannerAnalise/>
            <div className = "cards">
            <CardSelecionar/>
            <CardCalcular/>
            <CardPrint /><br></br><br></br><br></br>
            <label>
                <input type = "button" id = "print" value = "Calcular" onClick={ApertaBotao}></input>
            </label>
            </div>
       </div>
    
    )
}

export default Analise
