import React from 'react'
import axios from 'axios'

const apiUrl = window.localStorage.getItem('apiUrl')

const Disconnect = () => {
  axios.get(apiUrl + '/auth/disconnect')
  return (<></>)
}

export default Disconnect
