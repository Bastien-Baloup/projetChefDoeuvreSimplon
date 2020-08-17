import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ArticleDel = () => {
  const title = useParams().title
  const [error, setError] = useState()
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    axios.get(apiUrl + '/article/byTitle/' + title)
      .then(
        res => {
          var article = res.data
          if (article) {
            axios.delete(apiUrl + '/article/' + article._id)
              .then(
                res => setIsDeleted(true),
                error => {
                  setError(error)
                  console.log(error.response.data.message)
                }
              )
          } else {
            setError(new Error("l'article " + title + " n'existe pas"))
          }
        },
        error => setError(error)
      )
  }, [])

  var content = 'Une erreur inconnue est survenue'
  if (error) {
    content = <div className='error'>Error: {error.response ? error.response.data.message : error.message}</div>
  } else if (isDeleted) {
    content = <div className='success'>L'article à été supprimé</div>
  } else {
    content = <Spinner />
  }
  return (
    <>
      <h3 className='subtitle'>Suppression d'un article</h3>
      {content}
    </>
  )
}

export default ArticleDel
