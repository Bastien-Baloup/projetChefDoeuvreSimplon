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
        res => window.location.assign('/article'),
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
        res => window.location.assign('/article'),
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

  var content = []

  if (!title) {
    content.push(
      <>
        <h3 className='subtitle'>Cr&eacute;ation d'un article</h3>
        <form action='' key='create' onSubmit={handleSubmit}>
          <div className='field is-horizontal'>
            <label htmlFor='title' className='label column'>titre</label>
            <input type='text' name='title' id='title' className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='admin_id' className='label column'>Auteur</label>
            <input type='text' name='admin' id='admin' className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='date' className='label column'>date</label>
            <input type='date' name='date' id='date' className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='content' className='label column'>contenu</label>
            <textarea name='content' id='content' className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='excerpt' className='label column'>extrait</label>
            <input type='text' name='excerpt' id='excerpt' className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='imgSrc' className='label column'>img</label>
            <input type='text' name='imgUrl' id='imgUrl' className='control column' />
          </div>
          <div className='control column'>
            <button type='submit' className='button'>submit</button>
          </div>
        </form>
      </>
    )
  } else if (isLoaded) {
    var date = new Date(article.date)
    content.push(
      <>
        <h3 className='subtitle'>Modification de l'article {article.title}</h3>
        <form action='' key='modify' onSubmit={handleModify}>
          <div className='field is-horizontal'>
            <label htmlFor='title' className='label column'>titre</label>
            <input type='text' name='title' id='title' defaultValue={article.title} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='admin_id' className='label column'>Auteur</label>
            <input type='text' name='admin' id='admin' defaultValue={article.admin} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='date' className='label column'>date</label>
            <input type='date' name='date' id='date' defaultValue={date.toLocaleDateString('en-CA')} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='content' className='label column'>contenu</label>
            <textarea name='content' id='content' defaultValue={article.content} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='excerpt' className='label column'>extrait</label>
            <input type='text' name='excerpt' id='excerpt' defaultValue={article.excerpt} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='imgSrc' className='label column'>img</label>
            <input type='text' name='imgUrl' id='imgUrl' defaultValue={article.imgSrc} className='control column' />
          </div>
          <div className='control column'>
            <button type='submit' className='button'>submit</button>
          </div>
        </form>
      </>
    )
  } else {
    content.push(<Spinner key='spinner' />)
  }
  if (error) {
    content.push(<div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>)
  }
  return (
    <>{content}</>
  )
}

export default ArticleForm
