import React from 'react'
import { useParams } from 'react-router-dom'
import Search from '../components/Search'

const Categories = () => {
  var { categoryName } = useParams()
  return (
    <>
      <h2>Catégories</h2>
      <h2>requested category {categoryName}</h2>
      <Search category={categoryName} />
    </>
  )
}

export default Categories
