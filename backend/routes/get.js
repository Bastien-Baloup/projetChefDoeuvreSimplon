const express = require('express')
const router = express.Router()

router.get('/categories',
  (req, res) => {
    const categories = [
      { id: 1, name: 'Cell Phones' },
      { id: 2, name: 'Cell Phone Accessories' },
      { id: 3, name: 'Cell Phone Cases & Clips' },
      { id: 4, name: 'iPhone Accessories' }
    ]
    res.status(200).json(categories)
  }
)

router.get('/newAndSales',
  (req, res) => {
    const newAndSales = [
      {
        name: 'Samsung - Galaxy S7 32GB - Black Onyx (Verizon)',
        price: 679.99,
        image: 'https://cdn-demo.algolia.com/bestbuy-0118/4893100_sb.jpg'
      },
      {
        name: 'Samsung - Galaxy J3 (2016) 4G LTE with 16GB Memory Cell Phone (Unlocked) - White',
        price: 179.99,
        sale: 50,
        image: 'https://cdn-demo.algolia.com/bestbuy-0118/5320800_sb.jpg'
      },
      {
        name: 'Samsung - Galaxy S7 edge 32GB - Blue Coral (Verizon)',
        price: 779.99,
        image: 'https://cdn-demo.algolia.com/bestbuy-0118/5705352_sb.jpg'
      },
      {
        name: 'Samsung - Galaxy S7 32GB - Gold Platinum (Verizon)',
        price: 679.99,
        image: 'https://cdn-demo.algolia.com/bestbuy-0118/4893300_sb.jpg'
      },
      {
        name: 'Samsung - Galaxy S7 32GB - Black Onyx (AT&T)',
        price: 694.99,
        image: 'https://cdn-demo.algolia.com/bestbuy-0118/4897502_sb.jpg'
      },
      {
        name: 'Samsung - Galaxy S7 32GB - Black Onyx (Sprint)',
        price: 699.99,
        image: 'https://cdn-demo.algolia.com/bestbuy-0118/4894100_sb.jpg'
      },
      {
        name: 'Samsung - Galaxy S7 edge 4G LTE with 32GB Memory Cell Phone (Unlocked) - Titanium Silver',
        price: 769.99,
        image: 'https://cdn-demo.algolia.com/bestbuy-0118/5286507_sb.jpg'
      }
    ]
    res.status(200).json(newAndSales)
  }
)

router.get('/lastArticles',
  (req, res) => {
    const lastArticles = [
      {
        name: 'article1',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/0/300/400'
      },
      {
        name: 'article2',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/160/300/400'
      },
      {
        name: 'article3',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/119/300/400'
      },
      {
        name: 'article4',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/120/300/400'
      },
      {
        name: 'article5',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/130/300/400'
      },
      {
        name: 'article6',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/161/300/400'
      },
      {
        name: 'article7',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/162/300/400'
      },
      {
        name: 'article8',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/163/300/400'
      },
      {
        name: 'article9',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/164/300/400'
      },
      {
        name: 'article10',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/165/300/400'
      },
      {
        name: 'article11',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/166/300/400'
      },
      {
        name: 'article12',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/167/300/400'
      },
      {
        name: 'article13',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/168/300/400'
      },
      {
        name: 'article14',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/169/300/400'
      },
      {
        name: 'article15',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/170/300/400'
      },
      {
        name: 'article16',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/171/300/400'
      },
      {
        name: 'article17',
        excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
        img: 'https://picsum.photos/id/172/300/400'
      }
    ]
    res.status(200).json(lastArticles)
  }
)

module.exports = router
