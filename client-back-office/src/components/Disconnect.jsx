import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const apiUrl = window.localStorage.getItem('apiUrl')

const Disconnect = () => {
  axios.get(apiUrl + '/auth/disconnect')
    .then(
      res => {},
      error => console.log(error.response.data.message)
    )
  return (<Redirect to='/' />)
}

export default Disconnect
