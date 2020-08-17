import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-start'>
        <li className='navbar-item'>
          <NavLink to='/admins'>Liste des administateurs</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/admins/new'>Nouveau compte administrateur</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/admins/myAccount'>Mon compte</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AdminHeader
