import React from 'react'
import axios from 'axios'

const apiUrl = window.localStorage.getItem('apiUrl')

const Disconnect = () => {
  axios.get(apiUrl + '/auth/disconnect')
    .then(
      res => {},
      error => console.log(error.response.data.message)
    )
  return (<div />)
}

export default Disconnect
