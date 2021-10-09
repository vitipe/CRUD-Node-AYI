import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  
  const [usuarios, setUsuarios] = useState([]);

  const hacerPedidoGet = () => {
    fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(data => setUsuarios(data))
  }
  
  const guardarNombre = (e) => {
    setNombre(e.target.value)
  }

  const enviarDataPorPost = () => {
    fetch('http://localhost:3000/usuarios', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({nombre})
    })
    .then(res => res.json())
    .then(data => setUsuarios(data))
  }

  return (
    <>
    <div>
      <input type="text" placeholder="nombre"></input>
      <button onClick={guardarNombre}>Enviar usuario</button>
    </div>
    <button onClick={hacerPedidoGet}>GET</button>
    <ul>
      {
        usuarios.length 
        ? usuarios.map(usuario => <li>{usuarios.nombre}</li>)
        : <li>No hay usuarios</li>
      }
    </ul>
    </>
  )
}

export default App;

