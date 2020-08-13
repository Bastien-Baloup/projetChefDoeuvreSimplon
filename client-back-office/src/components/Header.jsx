import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  var isLoggedIn = window.localStorage.getItem('isLoggedIn')
  return (
    <header>
      <Link to='/'><FontAwesomeIcon icon={faDiceD20} /><h1>slicedice</h1></Link>
      <nav>
        <ul>
          <li>
            <NavLink to='/articles'>Articles</NavLink>
          </li>
          <li>
            <NavLink to='/products'>Produits</NavLink>
          </li>
          <li>
            <NavLink to='/orders'>Commandes</NavLink>
          </li>
          <li>
            <NavLink to='/clients'>Clients</NavLink>
          </li>
          <li>
            <NavLink to='/admins'>Administrateurs</NavLink>
          </li>
          {isLoggedIn === 'true' && <li><NavLink to='/disconnect'>Se Déconnecter</NavLink></li>}
        </ul>
      </nav>
    </header>
  )
}

export default Header
