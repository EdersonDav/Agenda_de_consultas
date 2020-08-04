import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './App.css';
import axios from 'axios'

interface Consulta {
  "id": number,
  "nome": string,
  "especialidade": string,
  "inicioConsulta": string,
  "fimConsulta": string,
  "descricao": string
}

function App() {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [consulta, setConsulta] = useState({
    id: 0,
    nome: "",
    especialidade: "",
    inicioConsulta: "",
    fimConsulta: "",
    descricao: ""
  });
  const [informacoes, setInformacoes] = useState({
    id: 0,
    nome: "",
    especialidade: "",
    inicioConsulta: "",
    fimConsulta: "",
    descricao: ""
  });

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
    queryApi()
  }

  async function deleteQuery(id: number) {
    await axios.delete(`/Consultas/id/${id}`)
    queryApi()
  }

  async function edit(id: number) {
    await axios.get(`/Consultas/id/${id}`).then(response => {
      setConsulta(response.data);
    })
  }

  async function editQuery(event: FormEvent) {
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
    queryApi()
  }
  function editarConsulta(event: ChangeEvent<HTMLInputElement>) {
    setConsulta({ ...consulta, [event.target.name]: event.target.value })
    console.log(consulta);

  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
        <ul>
          {consultas.map(con => (
            <li key={con.id}>
              {con.descricao}<button onClick={() => { deleteQuery(con.id) }}>Del</button>
              <button onClick={() => { edit(con.id) }}>Edit</button>
            </li>
          )
          )}
        </ul>
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


        <form onSubmit={editQuery}>
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
      </header>
    </div>
  );
}

export default App;
