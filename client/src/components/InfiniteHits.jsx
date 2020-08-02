import React, { useEffect } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import Card from '../components/Card'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InfiniteHits = ({ hits, hasPrevious, hasMore, refinePrevious, refineNext }) => {
  const Hit = (hit) => <Card product={hit} />

  const handleScroll = () => {
    var scrollHeight = document.body.scrollHeight
    var scrollPosition = window.scrollY + window.innerHeight
    if (hasMore && ((scrollHeight - 370) <= scrollPosition)) {
      refineNext()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <div className='infiniteHits'>
      <ul>
        {hits.map(hit => (
          <li key={hit.objectID}>{Hit(hit)}</li>
        ))}
      </ul>
      {
        hasMore
          ? <FontAwesomeIcon icon={faDiceD20} className='spinner' />
          : <p>Pas d&apos;autres r&eacute;sultats</p>
      }
    </div>
  )
}

const MyInfiniteHits = connectInfiniteHits(InfiniteHits)

export default MyInfiniteHits
