import React from 'react';
import './404Page.css';

function NoMatch({history}) {
    return (
        <div className="NoMatch__404Page">
            <h1>Erro 404</h1>
            <p>Redirecionando para <span onClick={() => history.push('/')}>Pagina de Login</span></p>
        </div>
    )
}

export default NoMatch
