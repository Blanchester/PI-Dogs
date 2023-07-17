import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import useTempsArray from "../../customeHook/useTempsArray";

export default function Card({ name, image, temperament }) {
const temperaments = useTempsArray(temperament)


  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.cardTitle}>{name.toUpperCase()}</h3>
      <div className={styles.imageContainer}>
        <img className={styles.cardImage} src={image} alt="Image not found" />
      </div>
      <h5 className={styles.cardText}>Temperament: {temperaments}</h5>
    </div>
  );
}