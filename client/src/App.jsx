import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './assets/css/styles.min.css'

import Home from './pages/Home'
import Header from './components/Header'
import News from './pages/News'
import Categories from './pages/Categories'
import SearchPage from './pages/SearchPage'
import Article from './pages/Article'

window.localStorage.setItem('apiUrl', 'http://192.168.0.222:3030')
// const apiUrl = window.localStorage.getItem('apiUrl')

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/actualites' component={News} />
            <Route path='/categorie/:categoryName' component={Categories} />
            <Route path='/recherche' component={SearchPage} />
            <Route path='/article/:title' component={Article} />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
