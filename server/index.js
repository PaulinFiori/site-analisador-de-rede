//dependencies
const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

//security
const bcrypt = require("bcrypt");
const saltRounds = 10;

//middlewares
const app = express();

app.use(express.json());
app.use(cors());

//database connection
const bd = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456pf",
  database: "login",
});


// Routes
app.post('/register', (req, res)=> {
    const Nome = req.body.Nome;
    const Senha = req.body.Senha;
    const Email = req.body.Email;
    const Telefone = req.body.Telefone;
    const Tipo = req.body.Tipo;
    const Cpf = req.body.Cpf;

    
    bd.query( 'INSERT INTO Usuario (Nome, Senha, Email, Telefone, Tipo, Cpf) VALUES (?,?,?,?,?,?)', [Nome, Senha, Email, Telefone, Tipo, Cpf], (err, result) => { 
        if(err)
        {
            res.send({message: "Não foi possível fazer registro!"});
        }
    
        res.send(result);
    }); 
});

app.post('/login', (req, res)=> {
  const Email = req.body.Email;
  const Senha = req.body.Senha;

  bd.query("SELECT * FROM Usuario WHERE Senha = ? AND Email = ?", [Senha, Email], (err, result) => {
    if(err)
    {
        res.send({message: err});
    }
    
    if(result.length > 0)
    {
        res.send(result);
    }

    else
    {
        res.send({message: "Usuário/Senha inválido!"});
    }
  }); 
});

app.post('/MostrarPerfil', (req, res) =>{
  const Email = req.body.Email;

  bd.query("SELECT * FROM Usuario WHERE Email = ?", Email, (err, result) => {
      if(err)
      {
          res.send({erro: err});
      }
      
      if(result.length > 0)
      {
          res.send(result);
      }

      else
      {
          res.send({message: "Não foi possivel achar!"});
      }
  });
});

app.post('/MudarPerfil', (req, res) =>{
  const Nome = req.body.Nome;
  const Senha = req.body.Senha;
  const Telefone = req.body.Telefone;
  const Tipo = req.body.Tipo;
  const Cpf = req.body.Cpf;
  const Email = req.body.Email;

  bd.query("UPDATE Usuario SET Nome = ?, Senha = ?, Telefone = ?, Tipo = ?, Cpf = ? WHERE Email = ?", [Nome, Senha, Telefone, Tipo, Cpf, Email], (err, result) => {
      if(err) throw err;
      else res.send(result);
  });
});

app.post('/FazerAnalise', (req, res) =>{
    const Id_Analise = req.body.Id_Analise;
    const Email_Usuario = req.body.Email_Usuario;
    const Nome_Usuario = req.body.Nome_Usuario;
    const Nome_Analise = req.body.Nome_Analise;
    const Tipo = req.body.Tipo;
    const Dados = req.body.Dados;
    const Resultado = req.body.Resultado;

    bd.query("INSERT INTO Analise (Id_Analise, Email_Usuario, Nome_Usuario, Nome_Analise, Tipo, Dados, Resultado) VALUES (?,?,?,?,?,?,?)", [Id_Analise, Email_Usuario, Nome_Usuario, Nome_Analise, Tipo, Dados, Resultado], (err, result) => {
        if(err)
        {
            res.send({message: "Não foi possível guarda a análise!"});
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

app.post('/Pesquisar', (req, res) =>{ 
    const Id_Analise = req.body.Id_Analise;
    const Nome_Usuario = req.body.Nome_Usuario;
    const Tipo = req.body.Tipo;

    if(Id_Analise != 0 && Nome_Usuario != '' && Tipo != 'Nenhum')
    {
        bd.query("SELECT * FROM Analise WHERE Id_Analise = ? AND Nome_Usuario = ? AND Tipo = ?", [Id_Analise, Nome_Usuario, Tipo], (err, result, fields) => {
            if(err)
            {
                res.send({message: "Não foi possivel buscar!"});
            }

            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({message: "Não foi achado a(s) fila(s)!"});
            }
        });
    }
    else if(Id_Analise == 0 && Nome_Usuario != '' && Tipo != 'Nenhum')
    {
        bd.query("SELECT * FROM Analise WHERE Nome_Usuario = ? AND Tipo = ?", [Nome_Usuario, Tipo], (err, result, fields) => {
            if(err)
            {
                res.send({message: "Não foi possivel buscar!"});
            }
            
            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({message: "Não foi achado a(s) fila(s)!"});
            }
        });
    }
    else if(Nome_Usuario == '' && Id_Analise != 0 && Tipo != 'Nenhum')
    {
        bd.query("SELECT * FROM Analise WHERE Id_Analise = ? AND Tipo = ?", [Id_Analise, Tipo], (err, result, fields) => {
            if(err)
            {
                res.send({message: "Não foi possivel buscar!"});
            }
            
            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({message: "Não foi achado a(s) fila(s)!"});
            }
        });
    }
    else if(Tipo == 'Nenhum' && Id_Analise != 0 && Nome_Usuario != ''){
        bd.query("SELECT * FROM Analise WHERE Id_Analise = ? AND Nome_Usuario = ?", [Id_Analise, Nome_Usuario], (err, result, fields) => {
            if(err)
            {
                res.send({message: "Não foi possivel buscar!"});
            }
            
            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({message: "Não foi achado a(s) fila(s)!"});
            }
        });
    }
    else if(Id_Analise == 0 && Nome_Usuario == '' && Tipo != 'Nenhum')
    {
        bd.query("SELECT * FROM Analise WHERE Tipo = ?", Tipo, (err, result, fields) => {
            if(err)
            {
                res.send({message: "Não foi possivel buscar!"});
            }
            
            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({message: "Não foi achado a(s) fila(s)!"});
            }
        });
    }
    else if(Tipo == 'Nenhum' && Nome_Usuario == '' && Id_Analise != 0)
    {
        bd.query("SELECT * FROM Analise WHERE Id_Analise = ?", Id_Analise, (err, result, fields) => {
            if(err)
            {
                res.send({message: "Não foi possivel buscar!"});
            }
            
            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({message: "Não foi achado a(s) fila(s)!"});
            }
        });
    }
    else if(Tipo == 'Nenhum' && Id_Analise == 0 && Nome_Usuario != '')
    {
        bd.query("SELECT * FROM Analise WHERE Nome_Usuario = ?", Nome_Usuario, (err, result, fields) => {
            if(err)
            {
                res.send({message: "Não foi possivel buscar!"});
            }
            
            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({message: "Não foi achado a(s) fila(s)!"});
            }
        });
    }
});

app.listen(3001, () => {
  console.log("Rodando o servidor...");
})

/* 
Nodemon starting script

In package json:

{
  "name": "abc",
  "version": "0.0.1",
  "description": "my server",
  "scripts": {
    "start": "nodemon my_file.js"
  },
  "devDependencies": {
    "nodemon": "~1.3.8",
  },
  "dependencies": {

  }
}
Then from the terminal you can use npm start

Dependencies in backend

    "axios": "^0.20.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.6"


*/