import React from 'react';
import "./banner.css";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Banner() {  
    return (
          <div className="banner">
            <div className="banner__info">
                <h1>InterDisciplinar - Análise de Filas</h1>
                <h5>Projeto Unitri</h5>
                <Link to="/analise" className="banner__info">
                <Button variant="contained">
                  Analisar Fila
                </Button>
                </Link>              
            </div>   
          </div>

    );
  }
export default Banner
