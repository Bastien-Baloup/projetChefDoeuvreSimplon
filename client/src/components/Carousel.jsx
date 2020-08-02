import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Carousel = ({ items }) => {
  const breakpoints = {
    0: {
      items: 1
    },
    592: {
      items: 2
    },
    888: {
      items: 3
    },
    1184: {
      items: 4
    },
    1480: {
      items: 5
    },
    1776: {
      items: 6
    },
    2072: {
      items: 7
    },
    2368: {
      items: 8
    },
    2664: {
      items: 9
    },
    2960: {
      items: 10
    },
    3256: {
      items: 11
    },
    3552: {
      items: 12
    },
    3848: {
      items: 13
    }
  }

  const [carousel, setCarousel] = useState()

  const slideNext = () => {
    const { currentIndex, items, slides } = carousel.state
    var next = currentIndex + items
    if (next >= (slides.length - items)) {
      next = slides.length - items
    }
    carousel.slideTo(next)
  }

  const slidePrev = () => {
    const { currentIndex, items } = carousel.state
    var prev = currentIndex - items
    if (prev < 0) {
      prev = 0
    }
    carousel.slideTo(prev)
  }

  return (
    <div className='carouselContainer'>
      <AliceCarousel
        mouseTrackingEnabled
        responsive={breakpoints}
        stagePadding={{ paddingLeft: 0, paddingRight: 0 }}
        infinite={false}
        preservePosition
        buttonsDisabled
        controlsStrategy='responsive'
        items={items}
        ref={(element) => setCarousel(element)}
      />
      <button className='prev' onClick={() => slidePrev()}><FontAwesomeIcon icon={faCaretLeft} /></button>
      <button className='next' onClick={() => slideNext()}><FontAwesomeIcon icon={faCaretRight} /></button>
    </div>
  )
}

export default Carousel
