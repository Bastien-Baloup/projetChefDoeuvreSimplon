import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Carousel extends Component {
  render (_props) {
    var { items } = this.props
    return (
      <div className='carouselContainer'>
        <AliceCarousel
          mouseTrackingEnabled
          responsive={
            {
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
          }
          stagePadding={{ paddingLeft: 0, paddingRight: 0 }}
          infinite={false}
          preservePosition
          buttonsDisabled
          controlsStrategy='responsive'
          items={items}
          ref={(el) => (this.Carousel = el)}
        />
        <button onClick={() => this.Carousel.slidePrev()}><FontAwesomeIcon icon={faCaretLeft} /></button>
        <button onClick={() => this.Carousel.slideNext()}><FontAwesomeIcon icon={faCaretRight} /></button>
      </div>
    )
  }
}

export default Carousel
