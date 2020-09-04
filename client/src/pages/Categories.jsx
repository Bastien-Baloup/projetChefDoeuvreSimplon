import React from 'react'
import { useParams } from 'react-router-dom'
import Search from '../components/Search'

const Categories = () => {
  var { categoryName } = useParams()
  return (
    <div className='container-5'>
      <h2>Catégorie : {categoryName}</h2>
      <Search category={categoryName} />
    </div>
  )
}

export default Categories
