import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const CategoryList = () => {
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [categories, setCategories] = useState()
  const [modified, setModified] = useState()

  const handleDel = (e, id) => {
    e.preventDefault()
    axios.delete(apiUrl + '/category/' + id)
      .then(
        res => {
          setIsDeleted(true)
          loadCategoriesList()
        },
        error => {
          setError(error)
          console.log(error)
        }
      )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const category = {
      name: form[0].value
    }

    axios.post(apiUrl + '/category', { category })
      .then(
        res => loadCategoriesList(),
        error => {
          setError(error)
          console.log(error)
        }
      )
  }

  const handleModify = (e) => {
    e.preventDefault()
    const form = e.target
    const category = {
      name: form[0].value
    }

    axios.put(apiUrl + '/category/' + modified._id, { category })
      .then(
        res => {
          setModified(null)
          loadCategoriesList()
        },
        error => {
          setError(error)
        }
      )
  }

  const loadCategoriesList = () => {
    setIsLoaded(false)
    setError(null)
    axios.get(apiUrl + '/category')
      .then(
        res => {
          setCategories(res.data)
          setIsLoaded(true)
        },
        error => {
          setError(error)
        }
      )
  }
  useEffect(() => {
    loadCategoriesList()
  }, [])

  var form = ''
  if (modified) {
    form =
      <form action='' key='modify' onSubmit={handleModify}>
        <label htmlFor='name'>Modifier catégorie</label>
        <input type='text' name='name' id='name' defaultValue={modified.name} />
        <button type='submit'>créer</button>
      </form>
  } else {
    form =
      <form action='' key='create' onSubmit={handleSubmit}>
        <label htmlFor='name'>Nouvelle catégorie</label>
        <input type='text' name='name' id='name' defaultValue='' />
        <button type='submit'>créer</button>
      </form>
  }

  var contents = []
  if (isLoaded) {
    if (isDeleted) {
      contents.push(<div className='success' key='delete'>La catégorie à été supprimé</div>)
    }
    contents.push(
      <table key='categoryList'>
        <thead>
          <tr>
            <th>Nom</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(
            category =>
              <tr key={category.name}>
                <td>{category.name}</td>
                <td><a href='' onClick={(e) => { setModified(category); e.preventDefault() }}><FontAwesomeIcon icon={faEdit} /></a><a href='' onClick={(e) => handleDel(e, category._id)}><FontAwesomeIcon icon={faTrash} /></a></td>
              </tr>
          )}
        </tbody>
      </table>
    )
    contents.push(form)
  } else {
    contents.push(<Spinner key='spinner' />)
  }
  if (error) {
    contents.push(<div className='error' key='error'>Error: {error.response ? error.response.data.message : error.message}</div>)
  }

  return (
    <>
      {contents}
    </>
  )
}

export default CategoryList
