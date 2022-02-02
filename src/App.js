import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Upload from './app/pages/uploadPage/upload'
import './app/global/style.sass'

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Upload}/>
        <Redirect to="/"/>
      </Switch>
    </>
  )
}

export default App
