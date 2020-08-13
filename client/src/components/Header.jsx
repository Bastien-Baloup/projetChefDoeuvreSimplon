import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faShoppingCart, faDiceD20 } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../components/Spinner'

const apiUrl = 'http://localhost:3030'

const Header = () => {
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const [categories, setCategories] = useState()
  useEffect(() => {
    axios.get(apiUrl + '/get/categories')
      .then(
        res => {
          setCategories(res.data)
          setIsLoaded(true)
        },
        error => setError(error)
      )
  }, [])

  var listCategories = null
  if (!error && isLoaded) {
    listCategories = categories.map(category =>
      <li key={category.id}>
        <NavLink to={'/categorie/' + category.name}>{category.name}</NavLink>
      </li>
    )
  } else if (!error) {
    listCategories = <li><Spinner /></li>
  } else {
    listCategories = <div className='error'>Error: {error.message}</div>
  }
  return (
    <header>
      <div className='header'>
        <Link to='/'><FontAwesomeIcon icon={faDiceD20} /><h1>slicedice</h1></Link>
        <nav>
          <ul>
            <li>
              <NavLink to='/recherche'><FontAwesomeIcon icon={faSearch} /><p>recherche</p></NavLink>
            </li>
            <li>
              <NavLink to='/client'><FontAwesomeIcon icon={faUser} /><p>mon compte</p></NavLink>
            </li>
            <li>
              <NavLink to='/panier'><FontAwesomeIcon icon={faShoppingCart} /><p>panier</p></NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <nav className='mainNav'>
        <ul>
          <li>
            <NavLink exact to='/'>Accueil</NavLink>
          </li>
          <li>
            <NavLink to='/actualites'>Actualites</NavLink>
          </li>
          {listCategories}
        </ul>
      </nav>
    </header>
  )
}

export default Header
