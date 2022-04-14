import React from 'react';
import loader from '../assets/images/loader.gif'

export default function Loader() {
  return (
    <figure className='loader-wrapper'>
        <img src={loader} alt="Loader" />
    </figure>
  )
}