import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Card from './Card'
import Spinner from './Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ArticleList = (props) => {
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
    content = <ul>{articles.map(article => <li key={article}><Card article={article} /></li>)}</ul>
  } else {
    content = <Spinner />
  }

  return (
    <div className='cardWrapper'>
      {content}
    </div>
  )
}

export default ArticleList
