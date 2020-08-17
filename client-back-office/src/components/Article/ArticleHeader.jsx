import React from 'react'
import { NavLink } from 'react-router-dom'

const ArticleHeader = () => {
  return (
    <nav className='navbar  has-background-grey-lighter'>
      <ul className='navbar-start'>
        <li className='navbar-item'>
          <NavLink to='/articles'>Liste des articles</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/articles/new'>Nouvel article</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ArticleHeader
