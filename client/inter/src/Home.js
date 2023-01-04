import React from 'react';
import Header from "./Header.js";
import Info from "./Info.js";
import Footer from "./Footer.js";


function Home() {    
    document.title = "Home - Interdisciplinar";
    return (
        <div>
           <Header />
           <Info />
           <Footer />      
        </div>
        );
}

export default Home

            