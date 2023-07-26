import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getDogs, filterCreated, orderByName, getTemperaments, FilterByTemperament } from "../../actions/index";
import Card from "../Card/Card";
import { Paginado } from '../Paginado/Paginado';
import styles from "./Home.module.css";



export default function Home() {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temps = useSelector((state) => state.temps);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(12);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const [orden, setOrden] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments())
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs())
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(FilterByTemperament(e.target.value));
  };

  return (
    <div>
      <div className={styles.headerContainer} >
        <div className={styles.header}>
          <h1>Welcome to Dog Encyclopedia</h1>
        </div>
        <div className={styles.filters}>
          <div className={styles.sortFilter}>
            <p>Sort by Name:</p>
            <select onChange={handleSort}>
              <option disabled selected defaultValue>
                Select an option
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className={styles.sortFilter}>
            <p>Filter by Weight:</p>
            <select>
              <option disabled selected defaultValue>
                Select an option
              </option>
              <option value="max_weight">Max</option>
              <option value="min_weight">Min</option>
            </select>
          </div>
          <div className={styles.sortFilter}>
            <p>Filter by Origin:</p>
            <select onChange={handleFilterCreated}>
              <option value="all">All</option>
              <option value="originals">Originals</option>
              <option value="created">Created</option>
            </select>
          </div>
          <div className={styles.sortFilter}>
            <p>Filter by Temperament:</p>
            <select onChange={handleFilterByTemperament}>
              <option disabled selected defaultValue>
                Select a temperament
              </option>
              <option value="Todos">All</option>
              {temps?.map((temp) => (
                <option value={temp.name} key={temp.id}>
                  {temp.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleClick}>Reload Dogs</button>

      </div>
      <div className={styles.container}>
        <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
        <div className={styles.cardGrid}>
          {currentDogs.map((dog) => (
            <Link to={`/dogs/${dog.id}`} key={dog.id} className={styles.links}>
              <Card name={dog.name} image={dog.image} temperament={dog?.temperaments} id={dog.id} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};