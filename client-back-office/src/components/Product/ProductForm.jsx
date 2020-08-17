import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ProductForm = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isPLoaded, setIsPLoaded] = useState(false)
  const [isCLoaded, setIsCLoaded] = useState(false)
  const [_product, setProduct] = useState()
  const [categories, setCategories] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const product = {
      name: form[0].value,
      price: form[1].value,
      sale: form[2].value,
      imgSrc: form[3].value,
      description: form[4].value,
      brand: form[5].value,
      tags: form[6].value.split(','),
      categories: form[7].value,
      stock: form[8].value
    }

    axios.post(apiUrl + '/product/', { product })
      .then(
        res => window.location.assign('/products'),
        error => setError(error)
      )
  }

  const handleModify = (e) => {
    e.preventDefault()
    const form = e.target

    var product = {
      name: form[0].value,
      price: form[1].value,
      sale: form[2].value,
      imgSrc: form[3].value,
      description: form[4].value,
      brand: form[5].value,
      tags: form[6].value.split(','),
      categories: form[7].value,
      stock: form[8].value
    }

    axios.put(apiUrl + '/product/' + _product._id, { product })
      .then(
        res => window.location.assign('/products'),
        error => setError(error)
      )
  }

  useEffect(() => {
    if (id) {
      axios.get(apiUrl + '/product/' + id)
        .then(
          res => {
            setProduct(res.data)
            setIsPLoaded(true)
          },
          error => setError(error)
        )
    }
    axios.get(apiUrl + '/category')
      .then(
        res => {
          setCategories(res.data)
          setIsCLoaded(true)
        },
        error => {
          setError(error)
        }
      )
  }, [])

  var content = []

  if (isCLoaded) {
    if (!id) {
      content.push(
        <form action='' key='create' onSubmit={handleSubmit}>
          <label htmlFor='name'>nom</label>
          <input type='text' name='name' id='name' />
          <label htmlFor='price'>prix</label>
          <input type='text' name='price' id='price' />
          <label htmlFor='sale'>Promotion (en %)</label>
          <input type='text' name='sale' id='sale' />
          <label htmlFor='imgSrc'>img</label>
          <input type='text' name='imgSrc' id='imgSrc' />
          <label htmlFor='description'>description</label>
          <textarea name='description' id='description' />
          <label htmlFor='brand'>marque</label>
          <input type='text' name='brand' id='brand' />
          <label htmlFor='tags'>mots-clés</label>
          <input type='text' name='tags' id='tags' />
          <label htmlFor='categories'>catégorie</label>
          <select name='categories' id='categories'>
            {categories.map(category => <option key={category.name} value={category.name}>{category.name}</option>)}
          </select>
          <label htmlFor='stock'>Qte. en stock</label>
          <input type='text' name='stock' id='stock' />
          <div className='control'>
            <button type='submit' className='button'>submit</button>
          </div>
        </form>
      )
    } else if (isPLoaded) {
      content.push(
        <form action='' key='modify' onSubmit={handleModify}>
          <label htmlFor='name'>nom</label>
          <input type='text' name='name' id='name' defaultValue={_product.name} />
          <label htmlFor='price'>prix</label>
          <input type='text' name='price' id='price' defaultValue={_product.price} />
          <label htmlFor='sale'>Promotion (en %)</label>
          <input type='text' name='sale' id='sale' defaultValue={_product.sale} />
          <label htmlFor='imgSrc'>img</label>
          <input type='text' name='imgSrc' id='imgSrc' defaultValue={_product.imgSrc} />
          <label htmlFor='description'>description</label>
          <textarea name='description' id='description' defaultValue={_product.description} />
          <label htmlFor='brand'>marque</label>
          <input type='text' name='brand' id='brand' defaultValue={_product.brand} />
          <label htmlFor='tags'>mots-clés (si plusieurs, séparer par une virgule)</label>
          <input type='text' name='tags' id='tags' defaultValue={_product.tags.toString()} />
          <label htmlFor='categories'>catégorie</label>
          <select name='categories' id='categories' defaultValue={_product.categories}>
            {categories.map(category => <option key={category.name} value={category.name}>{category.name}</option>)}
          </select>
          <label htmlFor='stock'>Qte. en stock</label>
          <input type='text' name='stock' id='stock' defaultValue={_product.stock} />
          <div className='control'>
            <button type='submit' className='button'>submit</button>
          </div>
        </form>
      )
    } else {
      content.push(<Spinner key='spinner' />)
    }
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

export default ProductForm
