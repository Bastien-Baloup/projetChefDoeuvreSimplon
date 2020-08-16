import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ArticleList = () => {
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const [articles, setArticles] = useState()

  useEffect(() => {
    axios.get(apiUrl + '/article')
      .then(
        res => {
          setArticles(res.data)
          setIsLoaded(true)
        },
        error => setError(error)
      )
  }, [])

  var content = <div />

  if (error) {
    content = <div className='error'>Error: {error.message}</div>
  } else if (isLoaded) {
    content =
      <table className='table is-hoverable'>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Extrait</th>
            <th>Publication</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(
            article =>
              <tr key={article.title}>
                <td>{article.title}</td>
                <td>{article.admin}</td>
                <td>{article.excerpt}</td>
                <td>{new Date(article.date).toLocaleDateString('fr-FR')}</td>
                <td>
                  <Link to={'/articles/modify/' + article.title}>
                    <span className='icon'>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </Link>
                  <Link to={'/articles/delete/' + article.title}>
                    <span className='icon has-text-danger'>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </Link>
                </td>
              </tr>
          )}
        </tbody>
      </table>
  } else {
    content = <Spinner />
  }

  return (
    <>
      {content}
    </>
  )
}

export default ArticleList
