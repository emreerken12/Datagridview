import React from 'react';
import image from './imgs/index_logo.png';

function Picture() {
  return (
    <div className='Picture'>
      <h4>Burkon Turizm Kongre</h4>
      <img src={image} alt='Örnek Fotoğraf' />
    </div>
  );
}

export default Picture;
