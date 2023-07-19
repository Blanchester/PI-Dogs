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

  function handleClick(e){
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
      <div>
        <h1>Estamos en el componente Home</h1>
      </div>
      <button onClick={e=>handleClick(e)}>Volver a cargar</button>
      <div>
        <p>A-Z / Z-A</p>
        <select onChange={e => handleSort(e)}>
          <option disabled selected defaultValue>
                  Filter by Name
                </option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select >
                <option disabled selected defaultValue>
                  Filter by weight
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>
        <p>Filtro Creados</p>
        <select onChange={e => handleFilterCreated(e)}>
          <option value="all">Todos</option>
          <option value="originals">Originals</option>
          <option value="created">Created</option>
        </select>
        <select onChange={handleFilterByTemperament}>
          <option disabled selected defaultValue>Temperaments</option>
          <option value="Todos">All</option>
            {
              temps?.map(temp => (
                <option value={temp.name}  key={temp.id}>{temp.name}</option>
                ))
            }
          </select>

        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        
        <div className={styles.cardGrid}> 
          {currentDogs.map((dog) => (
            <Link to={`/dogs/${dog.id}`}>
            <Card
              name={dog.name}
              image={dog.image}
              temperament={dog?.temperaments}
              id={dog.id}
              key={dog.id}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};