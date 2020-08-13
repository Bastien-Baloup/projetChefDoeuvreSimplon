import React from 'react'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Spinner = () => {
  return (
    <div className='spinnerWrapp'><FontAwesomeIcon icon={faDiceD20} className='spinner' /></div>
  )
}

export default Spinner
