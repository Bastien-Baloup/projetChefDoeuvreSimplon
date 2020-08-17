import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  var isLoggedIn = window.localStorage.getItem('isLoggedIn')
  return (
    <header className='navbar'>
      <Link to='/' className='navbar-brand'>
        <FontAwesomeIcon icon={faDiceD20} className='icon is-large has-text-black-ter my-2 mx-3' />
        <h1 className='title is-1 has-text-black-ter my-1'>slicedice - CMS</h1>
      </Link>
      <nav className='navbar-menu'>
        <ul className='navbar-end'>
          <li className='navbar-item'>
            <NavLink to='/articles'>Articles</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/products'>Produits</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/orders'>Commandes</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/clients'>Clients</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/admins'>Administrateurs</NavLink>
          </li>
          {isLoggedIn === 'true' && <li className='navbar-item'><NavLink to='/disconnect'>Se Déconnecter</NavLink></li>}
        </ul>
      </nav>
    </header>
  )
}

export default Header
