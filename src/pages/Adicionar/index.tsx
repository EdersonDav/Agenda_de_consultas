import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'

const Adicionar = () => {
  const [informacoes, setInformacoes] = useState({
    id: 0,
    nome: "",
    especialidade: "",
    inicioConsulta: "",
    fimConsulta: "",
    descricao: ""
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
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
    await axios.post('/Consultas', data)
    //queryApi()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input type="text" name="nome" id="nome" onChange={handleInputChange} />
          </div>
          <div className="field">
            <label htmlFor="especialidade">Especialidade</label>
            <input type="text" name="especialidade" id="especialidade" onChange={handleInputChange} />
          </div>
          <div className="field">
            <label htmlFor="inicioConsulta">Início</label>
            <input type="text" name="inicioConsulta" id="inicioConsulta" onChange={handleInputChange} />
          </div>
          <div className="field">
            <label htmlFor="fimConsulta">Fim</label>
            <input type="text" name="fimConsulta" id="fimConsulta" onChange={handleInputChange} />
          </div>
          <div className="field">
            <label htmlFor="descricao">Descrição</label>
            <input type="text" name="descricao" id="descricao" onChange={handleInputChange} />
          </div>
        </div>
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  )
}

export default Adicionar;