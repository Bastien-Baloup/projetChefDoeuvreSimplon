import React from 'react'
import axios from 'axios'

const apiUrl = 'http://localhost:3030'

const handleSubmit = (e) => {
  e.preventDefault()
  const form = e.target

  const article = {
    title: form[0].value,
    admin_id: form[1].value,
    date: form[2].value,
    content: form[3].value,
    excerpt: form[4].value,
    imgSrc: form[5].value
  }

  axios.post(apiUrl + '/article/', { article })
    .then(
      res => {
        console.log(res)
        console.log(res.data)
      },
      error => console.log(error)
    )
}

const Articles = () => {
  return (
    <div>
      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='title'>title</label>
        <input type='text' name='title' id='title' />
        <label htmlFor='admin_id'>admin_id</label>
        <input type='text' name='admin_id' id='admin_id' />
        <label htmlFor='date'>date</label>
        <input type='date' name='date' id='date' />
        <label htmlFor='content'>content</label>
        <input type='text' name='content' id='content' />
        <label htmlFor='excerpt'>excerpt</label>
        <input type='text' name='excerpt' id='excerpt' />
        <label htmlFor='imgSrc'>img</label>
        <input type='text' name='imgUrl' id='imgUrl' />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Articles
