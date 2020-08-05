import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { Route, BrowserRouter } from 'react-router-dom'
// import Editar from '../Editar/index'

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

  return (
    <div>
      <ul>
        {consultas.map(con => (
          <li key={con.id}>
            {con.descricao}<button onClick={() => { deleteConsulta(con.id) }}>Del</button>
            <Link to="/editar-consulta" onClick={() => { props.getId(con.id) }}><span>Editar</span></Link>
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default Listar;