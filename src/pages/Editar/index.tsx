import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

interface EditProps {
  id: number
}

const Editar: React.FC<EditProps> = (props) => {
  const [consulta, setConsulta] = useState({
    id: 0,
    nome: "",
    especialidade: "",
    inicioConsulta: "",
    fimConsulta: "",
    descricao: ""
  });

  useEffect(() => {
    edit(props.id)
  }, [])

  function editarConsulta(event: ChangeEvent<HTMLInputElement>) {
    setConsulta({ ...consulta, [event.target.name]: event.target.value })
    console.log(consulta);

  }

  async function editConsulta(event: FormEvent) {
    event.preventDefault()
    const { id, nome, especialidade, inicioConsulta, fimConsulta, descricao } = consulta
    const data = {
      id,
      nome,
      especialidade,
      inicioConsulta,
      fimConsulta,
      descricao
    };
    await axios.put(`/Consultas`, data)
    //queryApi()
  }

  async function edit(id: number) {
    if (id) {
      await axios.get(`/Consultas/id/${id}`).then(response => {
        setConsulta(response.data);
      })
    }
  }

  return (
    <div>
      <form onSubmit={editConsulta}>
        <div className="inputs">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input type="text" name="nome" id="nome" onChange={editarConsulta}
              value={consulta?.nome !== "" ? consulta?.nome : ""} />
          </div>
          <div className="field">
            <label htmlFor="especialidade">Especialidade</label>
            <input type="text" name="especialidade" id="especialidade" onChange={editarConsulta}
              value={consulta?.especialidade !== "" ? consulta?.especialidade : ""} />
          </div>
          <div className="field">
            <label htmlFor="inicioConsulta">Início</label>
            <input type="text" name="inicioConsulta" id="inicioConsulta" onChange={editarConsulta}
              value={consulta?.inicioConsulta !== "" ? consulta?.inicioConsulta : ""} />
          </div>
          <div className="field">
            <label htmlFor="fimConsulta">Fim</label>
            <input type="text" name="fimConsulta" id="fimConsulta" onChange={editarConsulta}
              value={consulta?.fimConsulta !== "" ? consulta?.fimConsulta : ""} />
          </div>
          <div className="field">
            <label htmlFor="descricao">Descrição</label>
            <input type="text" name="descricao" id="descricao" onChange={editarConsulta}
              value={consulta?.descricao !== "" ? consulta?.descricao : ""} />
          </div>
        </div>
        <input type="submit" value="Editar" />
      </form>
    </div>
  )
}

export default Editar;