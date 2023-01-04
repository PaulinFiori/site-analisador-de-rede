import React, { useEffect, useState } from 'react';
import Footer from "./Footer";
import {  BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import Perfil from "./Perfil";
import Login from "./Login";
import Register from "./Register";
import "./App.css";
import Home from './Home.js';
import Analise from './Analise.js';
import NoMatch from './404Page.js';
import HeaderAnalise from './HeaderFila';
import HeaderPesquisa from './HeaderSearch';
import HeaderPerfil from './HeaderPerfil';

function App() {
  document.title = "Interdisciplinar";
    return (
        <Router>
          <Switch>
             {/* Home */}
             <Route path="/home">
            <Home/>
            </Route>
            {/* Search */}
            <Route path="/pesquisa">
              <HeaderPesquisa/> 
              <Search />
             <Footer />
            </Route>
            {/* Perfil*/}
            <Route path="/perfil">
              <HeaderPerfil/>
              <Perfil/>
             <Footer/>
            </Route>
            {/* analise*/}
            <Route path="/analise">    
            <HeaderAnalise/> 
              <Analise/>
             <Footer />
           </Route>
           {/* Register */}
           <Route path="/register" component={Register}>
            </Route>
           {/* Login */}
           <Route path="/" component={Login}>
            </Route>
          </Switch>
      </Router>
    );
}

export default App;
