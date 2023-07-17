import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import styles from "./Detail.module.css";


export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myDog = useSelector((state) => state.detail);
  // console.log(myDog);
  return (
    <div className={styles.container}>
      {myDog.length > 0 ? (
        <div>
          <h1 className={styles.title}>Soy {myDog[0].name}</h1>
          <img src={myDog[0].image} alt="Not found" className={styles.image} />
          <h2 className={styles.info}>height: {myDog[0].height}</h2>
          <h2 className={styles.info}>weight: {myDog[0].weight}</h2>
          <h2 className={styles.info}>life span: {myDog[0].life_span}</h2>
          <h4 className={styles.temperaments}>Temperaments: {myDog[0].temperament ? myDog[0].temperament  :
      
           myDog[0].temperaments.map(obj => 
            obj.name
            ).join(', ')}</h4>
        </div>
      ) : (
        <p className={styles.loading}>... Loading</p>
      )}
      <Link to="/home" className={styles.link}>Volver</Link>
    </div>
  );
}