import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ArticleForm = () => {
  const title = useParams().title
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [article, setArticle] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const article = {
      title: form[0].value,
      admin: form[1].value,
      date: form[2].value,
      content: form[3].value,
      excerpt: form[4].value,
      imgSrc: form[5].value
    }

    axios.post(apiUrl + '/article/', { article })
      .then(
        res => {},
        error => setError(error)
      )
  }

  const handleModify = (e) => {
    e.preventDefault()
    const form = e.target

    var article = {
      title: form[0].value,
      admin: form[1].value,
      date: form[2].value,
      content: form[3].value,
      excerpt: form[4].value,
      imgSrc: form[5].value,
      _id: form[6].value
    }

    axios.put(apiUrl + '/article/' + article._id, { article })
      .then(
        res => {},
        error => setError(error)
      )
  }

  useEffect(() => {
    if (title) {
      axios.get(apiUrl + '/article/byTitle/' + title)
        .then(
          res => {
            setArticle(res.data)
            setIsLoaded(true)
          },
          error => setError(error)
        )
    }
  }, [])

  var content = 'erreur incconue'

  if (!title) {
    content =
      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='title'>titre</label>
        <input type='text' name='title' id='title' />
        <label htmlFor='admin_id'>Auteur</label>
        <input type='text' name='admin' id='admin' />
        <label htmlFor='date'>date</label>
        <input type='date' name='date' id='date' />
        <label htmlFor='content'>contenu</label>
        <textarea name='content' id='content' />
        <label htmlFor='excerpt'>extrait</label>
        <input type='text' name='excerpt' id='excerpt' />
        <label htmlFor='imgSrc'>img</label>
        <input type='text' name='imgUrl' id='imgUrl' />
        <button type='submit'>submit</button>
      </form>
  } else if (error) {
    content = <div className='error'>Error: {error.response ? error.response.data.message : error.message}</div>
  } else if (isLoaded) {
    var date = new Date(article.date)
    content =
      <form action='' onSubmit={handleModify}>
        <label htmlFor='title'>titre</label>
        <input type='text' name='title' id='title' defaultValue={article.title} />
        <label htmlFor='admin_id'>Auteur</label>
        <input type='text' name='admin' id='admin' defaultValue={article.admin} />
        <label htmlFor='date'>date</label>
        <input type='date' name='date' id='date' defaultValue={date.toLocaleDateString('en-CA')} />
        <label htmlFor='content'>contenu</label>
        <textarea name='content' id='content' defaultValue={article.content} />
        <label htmlFor='excerpt'>extrait</label>
        <input type='text' name='excerpt' id='excerpt' defaultValue={article.excerpt} />
        <label htmlFor='imgSrc'>img</label>
        <input type='text' name='imgUrl' id='imgUrl' defaultValue={article.imgSrc} />
        <input type='text' name='id' id='id' hidden readOnly value={article._id} />
        <button type='submit'>submit</button>
      </form>
  } else {
    content = <Spinner />
  }
  return (
    <>{content}</>
  )
}

export default ArticleForm
