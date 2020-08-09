import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Articles from './pages/Articles'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <>
        <main>
          <Switch>
            <Route
              exact path='/'
              component={Home}
            />
            <Route exact path='/articles' component={Articles} />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
