import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles['welcome-section']}>
      <img
        src="https://c4.wallpaperflare.com/wallpaper/26/58/362/animales-corre-hierba-perro-wallpaper-preview.jpg"
        alt="Bienvenidos a la app de Dogs"
        className={styles['background-image']}
      />
      <div className={styles['content']}>
        <h1>Bienvenidos a la app de Dogs</h1>
      </div>
      
    </div>
  );
};

export default LandingPage;