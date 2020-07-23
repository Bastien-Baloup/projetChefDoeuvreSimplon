import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './assets/css/styles.min.css'

import Home from './pages/Home'
import Header from './components/Header'
import News from './pages/News'
import Categories from './pages/Categories'

const App = () => {
  var categories = ['Apple', 'Samsung', 'Incipio', 'OtterBox']

  return (
    <BrowserRouter>
      <Header categories={categories} />

      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/actualites' component={News} />
          <Route path='/categorie' component={Categories} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
