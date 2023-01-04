import React from 'react';
import "./redes.css";
import CardSelecionar__rede from "./CardSelecionar__rede";
import CardCalcular__rede from "./CardCalcular__rede";
import CardPrint__rede from "./CardPrint__rede";
import BannerRede from "./BannerRede";

function Rede() {
    return (
        <div className="rede">
            <BannerRede/>
            <div className = "cards">
            <CardSelecionar__rede/>
            <CardCalcular__rede/>
            <CardPrint__rede/>
            </div>
        </div>
    )
}

export default Rede
