import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductHeader = () => {
  return (
    <nav>
      <li><NavLink to='/products'>Liste des produits</NavLink></li>
      <li><NavLink to='/products/new'>Nouveau produit</NavLink></li>
      <li><NavLink to='/products/categories'>Gestion des catégories</NavLink></li>
    </nav>
  )
}

export default ProductHeader
