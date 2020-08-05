import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'
const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Agenda de consultas</h1>
      <div className="btns">
        <Link className="btn btnAdd" to="/adicionar-consulta"><span>Adicionar Consulta</span></Link>
        <Link className="btn btnList" to="/listar-consultas"><span>Listar Consultas</span></Link>
      </div>
    </div>
  )
}

export default Home;