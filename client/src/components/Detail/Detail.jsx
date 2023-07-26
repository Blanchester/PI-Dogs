import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import styles from "./Detail.module.css";
import spinner from '../../assets/actualizar.png'


export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myDog = useSelector((state) => state.detail);
  // console.log(myDog);
  return (
    <div className={styles.container}>
      <div className={styles.cardDetail}>
        {myDog.length > 0 ? (
          <> 
            <img src={myDog[0].image} alt="Not found" className={styles.image} />
            <div className={styles.description}>
              {console.log(myDog[0])}
              <h1 className={styles.title}>Soy {myDog[0].name}</h1>
              <div>
                <div className={styles.dataDetail}>
                  <span className={styles.info}>Height min: {myDog[0].height[0]}</span>
                  <span className={styles.info}>Height max: {myDog[0].height[1]}</span>
                </div>
                <div className={styles.dataDetail}>
                  <span className={styles.info}>Weight min: {myDog[0].weight[0]}</span>
                  <span className={styles.info}>Weight max: {myDog[0].weight[1]}</span>
                </div>
              <span className={styles.info}>Life span: {myDog[0].life_span}</span>
              </div>
              <span className={styles.temperaments}>Temperaments:{" "}
                {typeof myDog[0].temperaments === "object" && myDog[0].temperaments !== null
                  ? myDog[0].temperaments.map((temperament, index) => (
                    <span key={index}>
                    {index > 0 ? ", " : ""}{temperament.name}
                  </span>
                    ))
                  : myDog[0].temperaments}</span>
            </div>
            <Link to="/home" className={styles.link}>Volver</Link>
          </>
        ) : (
          <div>
            <p className={styles.loading}>
            <img className={styles.spinner} src={spinner} alt="logo food" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}