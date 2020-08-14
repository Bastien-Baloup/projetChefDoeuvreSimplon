import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import Header from './components/Header'
import Articles from './pages/Articles'
import Products from './pages/Products'
import Login from './pages/Login'
import Disconnect from './components/Disconnect'
import Spinner from './components/Spinner'

window.localStorage.setItem('apiUrl', 'http://localhost:3030')
const apiUrl = window.localStorage.getItem('apiUrl')

const App = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState()
  axios.defaults.headers.common.Authorization = window.localStorage.getItem('token')
  if (!isChecked) {
    axios.get(apiUrl + '/auth/admin/checkLogin')
      .then(
        response => {
          if (response.status === 200 || response.status === 304) {
            window.localStorage.setItem('isLoggedIn', true)
            setIsChecked(true)
          }
        },
        error => {
          if (error.response !== undefined && error.response.status === 401) {
            window.localStorage.setItem('isLoggedIn', false)
            setIsChecked(true)
          } else {
            console.log(error)
            setIsChecked(true)
            setError(new Error('Le serveur est indisponible ou injoignable'))
          }
        }
      )
  }
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status === 401) {
        window.localStorage.setItem('token', null)
        window.localStorage.setItem('isLoggedIn', false)
        axios.defaults.headers.common.Authorization = null
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
            {isChecked ? (
              window.localStorage.getItem('isLoggedIn') === 'true'
                ? (
                  error ? (
                    <div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>
                  ) : (
                    <>
                      <Route exact path='/' component={Home} />
                      <Route path='/articles' component={Articles} />
                      <Route path='/products' component={Products} />
                      <Route path='/login' key='login' component={Login} />
                      <Route path='/disconnect' component={Disconnect} />
                    </>
                  )
                ) : (
                  <Route path='/' component={Login} />
                )
            ) : (
              <Spinner />
            )}
          </Switch>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
