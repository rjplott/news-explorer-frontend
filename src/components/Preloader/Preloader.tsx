import './Preloader.css';
import * as React from 'react';

export default function Preloader(): JSX.Element {
  return (
    <div className='preloader'>
      <i className='preloader__circle-icon'></i>
      <p className='preloader__text'>Searching for news...</p>
    </div>
  );
}
