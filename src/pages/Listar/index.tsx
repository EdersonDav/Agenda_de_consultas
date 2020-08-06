import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './style.css'

interface Consulta {
  "id": number,
  "nome": string,
  "especialidade": string,
  "inicioConsulta": string,
  "fimConsulta": string,
  "descricao": string
}

interface EditProps {
  getId: Function
}

const Listar: React.FC<EditProps> = (props) => {
  const [consultas, setConsultas] = useState<Consulta[]>([])

  useEffect(() => {
    queryApi()
  }, []);

  useEffect(() => {
    console.log(consultas);
  }, [consultas]);

  async function queryApi() {
    await axios.get('/Consultas').then(response => {
      setConsultas(response.data)
    })
  }

  async function deleteConsulta(id: number) {
    await axios.delete(`/Consultas/id/${id}`)
    queryApi()
  }

  function separaHoras(horas: string) {
    let horaMinSec = horas.split("T")[1].split(":")
    return `${horaMinSec[0]}:${horaMinSec[1]}h`
  }

  return (
    <div className="container">
      <Link to="/" className="btn btnHome" type="submit">Home</Link>
      <h1>Consultas agendadas</h1>
      <ul>
        {consultas.map(con => (
          <li className="card" key={con.id}>
            <ul>
              <li><h4>Nome</h4><p>{con.nome}</p></li>
              <li><h4>Especialidade</h4><p>{con.especialidade}</p></li>
              <li><h4>Inicio</h4><p>{separaHoras(con.inicioConsulta)}</p></li>
              <li><h4>Fim</h4><p>{separaHoras(con.fimConsulta)}</p></li>
            </ul>
            <div><h4>Descrição</h4><p>{con.descricao}</p></div>
            <div className="icons">
              <FaTrashAlt color="red" onClick={() => { deleteConsulta(con.id) }}></FaTrashAlt>
              <Link to="/editar-consulta" onClick={() => { props.getId(con.id) }}><FaEdit /></Link>
            </div>
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default Listar;