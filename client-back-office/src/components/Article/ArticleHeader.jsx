import React from 'react'
import { NavLink } from 'react-router-dom'

const ArticleHeader = () => {
  return (
    <nav>
      <li><NavLink to='/articles'>Liste des articles</NavLink></li>
      <li><NavLink to='/articles/new'>Nouvel article</NavLink></li>
    </nav>
  )
}

export default ArticleHeader
