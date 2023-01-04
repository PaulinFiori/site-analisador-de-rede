import React from 'react';
import "./CardPrint.css";

function CardPrint() {
 
    return (
        <div className = "card__print">
            <div className = "card__info__print">
                <form> 
                    <h1>Resultado</h1>
                    <p id="AnaliseCalculada"></p>
                </form>
            </div>            
        </div>
    )
}

export default CardPrint
