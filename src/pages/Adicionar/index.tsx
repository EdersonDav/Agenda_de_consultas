import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./style.css"

const Adicionar = () => {
  const [informacoes, setInformacoes] = useState({
    id: 0,
    nome: "",
    especialidade: "",
    inicioConsulta: "",
    fimConsulta: "",
    descricao: ""
  });

  const [message, setMessage] = useState("")

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "inicioConsulta" || event.target.name === "fimConsulta") {
      let horaDigitada = `2020-07-15T${event.target.value}:00`
      setInformacoes({ ...informacoes, [event.target.name]: horaDigitada })
      return
    }
    setInformacoes({ ...informacoes, [event.target.name]: event.target.value })
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInformacoes({ ...informacoes, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const { id, nome, especialidade, inicioConsulta, fimConsulta, descricao } = informacoes
    const data = {
      id,
      nome,
      especialidade,
      inicioConsulta,
      fimConsulta,
      descricao
    };
    await axios.post('/Consultas', data).then(res => {
      if (res.status === 200) {
        setMessage("Edição salva com sucesso")
        setInformacoes({
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

  function cancelar() {
    setInformacoes({
      id: 0,
      nome: "",
      especialidade: "",
      inicioConsulta: "",
      fimConsulta: "",
      descricao: ""
    })
  }

  return (
    <div className="container">
      <Link to="/" className="btn btnHome" type="submit">Home</Link>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite o nome do profissional de saúde"
              onChange={handleInputChange}
              value={informacoes.nome}
            />
          </div>
          <div className="field">
            <label htmlFor="especialidade">Especialidade</label>
            <input type="text"
              name="especialidade"
              id="especialidade"
              placeholder="Digite a especialidade"
              onChange={handleInputChange}
              value={informacoes.especialidade} />
          </div>
          <div className="fieldTime">
            <label htmlFor="inicioConsulta">Início</label>
            <div className="time">
              <input
                type="time"
                name="inicioConsulta"
                id="inicioConsulta"
                onChange={handleInputChange} />
              <span>horas</span>
            </div>
          </div>
          <div className="fieldTime">
            <label htmlFor="fimConsulta">Fim</label>
            <div className="time">
              <input
                type="time"
                name="fimConsulta"
                id="fimConsulta"
                onChange={handleInputChange}
              />
              <span>horas</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="descricao">Descrição</label>
            <textarea name="descricao" id="descricao"
              onChange={handleChange}
              value={informacoes.descricao}
            >

            </textarea >
          </div>
        </div>
        <div className="btnsCadastro">
          <Link to="/" type="reset" className="btn btnCancelar" onClick={cancelar}>Cancelar</Link>
          <button className="btn btnSalvar" type="submit">Salvar</button>
        </div>
        <h2>{message}</h2>
      </form>
    </div>
  )
}

export default Adicionar;