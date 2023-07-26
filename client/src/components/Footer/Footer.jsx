import React from 'react';
import styles from './Footer.module.css';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} Dog Encyclopedia. All rights reserved.</p>
        <div className={styles.socialIcons}>
          <a href="www.instagram.com" target="" rel="">
            <img src={"https://w7.pngwing.com/pngs/681/55/png-transparent-camera-instagram-social-media-instagram-logo-social-media-circle-icon.png"} alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;