import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import Spinner from '../components/Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const Article = () => {
  const { title } = useParams()
  const [article, setArticle] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    axios.get(apiUrl + '/article/byTitle/' + title)
      .then(
        res => {
          setArticle(res.data)
          setIsLoaded(true)
        },
        error => setError(error)
      )
  }, [title])

  var content = []
  if (error) content.push(<div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>)
  else if (isLoaded) {
    content.push(
      <div key='article' className='article'>
        <h2>{article.title}</h2>
        <span id='admin'>{article.admin}</span>
        <span id='date'>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
        <div className='imgWrapper'>
          <img src={article.imgSrc} alt='' />
        </div>

        <ReactMarkdown source={article.content} />
      </div>
    )
  } else {
    content.push(<Spinner key='loading' />)
  }
  return (
    <div className='container'>
      {content}
    </div>
  )
}

export default Article
