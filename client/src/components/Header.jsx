import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  render (_props) {
    var listCategories = this.props.categories.map(category =>
      <li key={category.id}>
        <NavLink to={'/categorie/' + category}>{category}</NavLink>
      </li>
    )
    return (
      <header>
        <div className='header'>
          <h1>Bienvenue sur mon application React !</h1>
          <nav className='headerNav'>
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
}

export default Header
