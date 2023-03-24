import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <>
      <h1>No se encontró la página. 😿</h1>
  
      <section className='error-container'>
        <span className='four'>
          <span className='screen-reader-text'>4</span>
        </span>
        <span className='zero'>
          <span className='screen-reader-text'>0</span>
        </span>
        <span className='four'>
          <span className='screen-reader-text'>4</span>
        </span>
      </section>
      <div className='link-container'>
        <Link className='more-link' to='/'>
          Regresar a la pagina de inicio
        </Link>
      </div>
    </>
  );
};
