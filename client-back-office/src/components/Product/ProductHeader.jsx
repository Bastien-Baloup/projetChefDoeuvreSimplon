import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductHeader = () => {
  return (
    <nav className='navbar has-background-grey-lighter'>
      <ul className='navbar-start'>
        <li className='navbar-item'>
          <NavLink to='/products'>Liste des produits</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/products/new'>Nouveau produit</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/products/categories'>Gestion des catégories</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ProductHeader
