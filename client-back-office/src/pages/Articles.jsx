import React from 'react'

const apiUrl = 'http://localhost:3030'

const Articles = () => {
  return (
    <div>
      <form action={apiUrl + '/article/new'} method='post'>
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
        <input type='submit' value='test' />
      </form>
    </div>
  )
}

export default Articles
