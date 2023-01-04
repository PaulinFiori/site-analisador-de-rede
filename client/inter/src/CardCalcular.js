import React from 'react';
import "./CardCalcular.css";

function CardCalcular() {
 
    return (
        <div className = "card__calcular">
            <div className = "card__info__calcular">
                <h1>Insira Dados!</h1>
                <label> Taxa de chegada: &nbsp;
                    <input type="text" name="y" id="y"/>
                </label><br></br><br></br>
                <label> Taxa de serviço: &nbsp;
                    <input type="text" name="u" id="u"/>
                </label><br></br><br></br>
                <label> Servidores: &nbsp;
                    <input type="text" name="m" id="m"/>
                </label><br></br><br></br>
                <label> Numeros de usuários: &nbsp;
                    <input type="text" name="n" id="n"/>
                </label><br></br><br></br>
                <label> População: &nbsp;
                    <input type="text" name="k" id="k"/>
                </label><br></br><br></br>
                <label> Capacidade: &nbsp;
                    <input type="text" name="b" id="b"/>
                </label><br></br><br></br>
                <label> Probabilidade de não exisitir usuário no sistema: &nbsp;
                    <input type="text" name="b" id="po"/>
                </label><br></br><br></br>
            </div>            
        </div>
    )
}

export default CardCalcular
