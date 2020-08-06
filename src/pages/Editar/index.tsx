import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import "../Adicionar/style.css"

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

  const [message, setMessage] = useState("")

  useEffect(() => {
    edit(props.id)
  }, [])

  function editarConsulta(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "inicioConsulta" || event.target.name === "fimConsulta") {
      let horaDigitada = `2020-07-15T${event.target.value}:00`
      setConsulta({ ...consulta, [event.target.name]: horaDigitada })
      return
    }
    setConsulta({ ...consulta, [event.target.name]: event.target.value })

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
    await axios.put(`/Consultas`, data).then(res => {
      if (res.status === 200) {
        setMessage("Edição salva com sucesso")
        setConsulta({
          id: 0,
          nome: "",
          especialidade: "",
          inicioConsulta: "",
          fimConsulta: "",
          descricao: ""
        })
      }
    }).catch(error => {
      if (error) {
        setMessage("Algo deu errado, verifique os campos e salve novamente")
      }
    })
  }

  async function edit(id: number) {
    if (id) {
      await axios.get(`/Consultas/id/${id}`).then(response => {
        setConsulta(response.data);
      })
    }
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setConsulta({ ...consulta, [event.target.name]: event.target.value })
  }

  function cancelar() {
    setConsulta({
      id: 0,
      nome: "",
      especialidade: "",
      inicioConsulta: "",
      fimConsulta: "",
      descricao: ""
    })
  }

  function editarHoras(hr: string) {
    let horaMinSec = hr.split("T")[1].split(":")
    return `${horaMinSec[0]}:${horaMinSec[1]}`
  }

  return (
    <div className="container">
      <h1>Edição</h1>
      <Link to="/listar-consultas" className="btn btnHome" type="submit">Lista</Link>
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
          <div className="fieldTime">
            <label htmlFor="inicioConsulta">Início</label>
            <div className="time">
              <input type="time" name="inicioConsulta" id="inicioConsulta" onChange={editarConsulta}
                value={consulta?.inicioConsulta !== "" ? editarHoras(consulta?.inicioConsulta) : ""} />
              <span>horas</span>
            </div>
          </div>
          <div className="fieldTime">
            <label htmlFor="fimConsulta">Fim</label>
            <div className="time">
              <input type="time" name="fimConsulta" id="fimConsulta" onChange={editarConsulta}
                value={consulta?.fimConsulta !== "" ? editarHoras(consulta?.fimConsulta) : ""} />
              <span>horas</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="descricao">Descrição</label>
            <textarea name="descricao" id="descricao" onChange={handleChange}
              value={consulta?.descricao !== "" ? consulta?.descricao : ""} ></textarea>
          </div>
        </div>
        <div className="btnsCadastro">
          <Link to="/listar-consultas" type="reset" className="btn btnCancelar" onClick={cancelar}>Cancelar</Link>
          <button className="btn btnSalvar" type="submit">Salvar</button>
        </div>
        <h2>{message}</h2>
      </form>
    </div>
  )
}

export default Editar;