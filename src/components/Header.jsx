import React from 'react'
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
  render (_props) {
    var listCategories = this.props.categories.map(category =>
      <li key={category.id}>
        <NavLink to={'/categorie/' + category}>{category}</NavLink>
      </li>
    )
    return (
      <header>
        <h1>Bienvenue sur mon application React !</h1>
        <nav>
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
