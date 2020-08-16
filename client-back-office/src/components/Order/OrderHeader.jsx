import React from 'react'
import { NavLink } from 'react-router-dom'

const OrderHeader = () => {
  return (
    <nav>
      <li><NavLink to='/orders'>Liste des Commandes</NavLink></li>
    </nav>
  )
}

export default OrderHeader
