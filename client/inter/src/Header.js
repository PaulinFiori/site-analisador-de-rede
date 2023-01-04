import React from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import PersonIcon from '@material-ui/icons/Person';
import { NomeAtual } from '../src/server';

function Header() {
    return (
        <div className="header">  
            <div className="header__left">
            </div>
                    <div className="header__center">
                <Link to="/home" className="header__link">
                        <div className="header__option
                        header__option--active">
                            <HomeIcon fontSize="large" />
                            <div className="header__info">
                               <h4 id = "nomeheader" >Home</h4>
                            </div>
                        </div>
                    </Link>        
                <Link to="/analise" className="header__link">     
                        <div className="header__option">
                            <BubbleChartIcon fontSize="large" />
                            <div className="header__info">
                               <h4 id = "nomeheader" >Analise</h4>
                            </div>
                        </div>                
                    </Link>        
                <Link to="/pesquisa" className="header__link">
                        <div className="header__option">
                            <SearchIcon fontSize="large" />
                            <div className="header__info">
                               <h4 id = "nomeheader" >Pesquisa</h4>
                            </div>
                        </div>
                </Link>      
                </div>
            <div className="header__right">
            <Link to="/perfil" className="header__link">    
                <div className="header__info">
                    <PersonIcon fontSize="large" />
                    <div className="header__info">
                    <h4 id = "User" >{NomeAtual}</h4>
                </div>
                </div>
                </Link>
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