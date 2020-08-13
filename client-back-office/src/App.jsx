import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import Header from './components/Header'
import Articles from './pages/Articles'
import Products from './pages/Products'
import Login from './pages/Login'
import Disconnect from './components/Disconnect'

window.localStorage.setItem('apiUrl', 'http://localhost:3030')
const apiUrl = window.localStorage.getItem('apiUrl')

const App = () => {
  var isLoggedIn = window.localStorage.getItem('isLoggedIn')
  axios.defaults.headers.common.Authorization = window.localStorage.getItem('token')
  axios.get(apiUrl + '/auth/admin/checkLogin')
    .then(
      response => {
        if (response.status === 200) window.localStorage.setItem('isLoggedIn', true)
      },
      error => {
        if (error.response.status === 401) window.localStorage.setItem('isLoggedIn', false)
      }
    )
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status === 401) {
        window.localStorage.setItem('token', null)
        window.localStorage.setItem('isLoggedIn', false)
        axios.defaults.headers.common.Authorization = null
        window.location.assign('/')
      }
      return Promise.reject(error)
    }
  )
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Switch>
            {
              isLoggedIn === 'true'
                ? (
                  <>
                    <Route exact path='/' component={Home} />
                    <Route path='/articles' component={Articles} />
                    <Route path='/products' component={Products} />
                    <Route path='/login' key='login' component={Login} />
                    <Route path='/disconnect' component={Disconnect} />
                  </>
                ) : (
                  <Route path='/' component={Login} />
                )
            }
          </Switch>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
