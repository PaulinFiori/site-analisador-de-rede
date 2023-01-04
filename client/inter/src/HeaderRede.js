import React from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import PersonIcon from '@material-ui/icons/Person';
import WifiIcon from '@material-ui/icons/Wifi';
import { NomeAtual } from '../src/server';

function Header() {
    return (
        <div className="header">  
            <div className="header__left">
            </div>
                    <div className="header__center">
                <Link to="/home" className="header__link">
                        <div className="header__option">
                            <HomeIcon fontSize="large"/>
                        </div>
                    </Link>          
                <Link to="/rede" className="header__link">
                        <div className="header__option header__option--active">
                            <WifiIcon fontSize="large" />
                        </div>
                    </Link>   
                <Link to="/fila" className="header__link">     
                        <div className="header__option">
                            <BubbleChartIcon fontSize="large" />
                        </div>                
                    </Link>        
                <Link to="/search" className="header__link">
                        <div className="header__option">
                            <SearchIcon fontSize="large" />
                        </div>
                </Link>      
                </div>
            <div className="header__right">
            <Link to="/perfil" className="header__link">    
                <div className="header__info">
                    <PersonIcon fontSize="large" />
                </div>
                </Link>
                <div className="header__info">
                    <h4 id = "User" >{NomeAtual}</h4>
                </div>
            </div>      
        </div>
    )
}

export default Header

/*
pages 
- Home
- Login
- pesquisa
- calcular
- perfil

*/