import React, { useState } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Principal'
import Adicionar from './pages/Adicionar'
import Listar from './pages/Listar'
import Editar from './pages/Editar'

const Routes = () => {
  const [id, setId] = useState<number[]>([])

  function getId(id: number) {
    setId([id])
  }
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route component={Adicionar} path="/adicionar-consulta" />
      <Route path="/listar-consultas" render={(props) => <Listar {...props} getId={getId} />} />
      <Route path="/editar-consulta" render={(props) => <Editar {...props} id={id[0]} />} />
    </BrowserRouter>
  )
}

export default Routes;