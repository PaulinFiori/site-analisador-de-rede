import React from 'react';
import "./CardSelecionar.css";
import { HabilitaInputs } from './Analise';

function CardSelecionar() {
    return (
        <div className="card">
            <div className="frase">
                    <h1>Seleciona Tipo de Fila</h1>
                </div>
            <div>
                <form>
                    <select className="card__selecionar" id="Fila" onChange = {HabilitaInputs}>
                            <option value="0">Nenhum</option>
                            <option value="1">Sistema classico</option>
                            <option value="2">M-servidores</option>
                            <option value="3">Infintos servidores</option>
                            <option value="4">Capacidade finita</option>
                            <option value="5">M-servidores com capacidade infinita</option>
                            <option value="6">População finita com um servidor</option>
                            <option value="7">População finita com infinitos servidores</option>
                            <option value="8">M-servidores com capacidade e população finitos</option>
                    </select>
                </form>
            </div>
        </div>)
}

export default CardSelecionar
