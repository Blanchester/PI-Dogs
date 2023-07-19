import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import {postDog, getTemperaments} from "../../actions/index"
import {useDispatch, useSelector} from "react-redux"
import styles from './Create.module.css';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (!input.image) {
    errors.image = "Se requiere una imagen";
  } else if (!input.height || input.height < 0 || input.height > 85) {
    errors.height = "Se requiere un peso mayor a 0 y menor a 85";
  } else if (!input.weight || input.weight < 0 || input.weight > 200) {
    errors.weight = "Se requiere una altura mayor a 0 y menor a 200";
  } else if (!input.life_span || input.life_span < 0 || input.life_span > 30) {
    errors.life_span = "Se requiere un numero mayor a 0 y menor a 30";
  } else if (!input.temperament[0]) {
    errors.temperament = "Debe seleccionar al menos un temperamento";
  }
  return errors;
}


export const Create = () => {
const dispatch = useDispatch()
const temps = useSelector((state) => state.temps)
const [errors, setErrors] = useState({})

const [input, setInput] = useState({
  name: "",
  image:"",
  height:0,
  weight:0,
  life_span: 0,
  temperament:[],
})

useEffect(() =>{
  dispatch(getTemperaments());
},[])

const handleChange =(e)=>{
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
}

const handleSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    });
    setErrors({
      ...errors,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(input);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    dispatch(postDog(input));
    alert("Perrito creado");
    setInput({
      name: "",
      image: "",
      height: 0,
      weight: 0,
      life_span: 0,
      temperament: [],
    });
  };


  return (
    <div className={styles['form-container']}>
      <Link to= "/home">Volver</Link>
      <h1>Crea tu Perrito!</h1>
      <div className={styles['form-box']}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input 
          type="text" 
          value={input.name} 
          name="name" 
          onChange={handleChange} />
          {errors.name && (
            <p className={styles['error-message']}>{errors.name}</p>
          )}
        </div>
        <div>
          <label>Imagen: </label>
          <input type="text" value={input.image} name="image" onChange={handleChange} />
          {errors.image && (
            <p className={styles['error-message']}>{errors.image}</p>
          )}
        </div>
        <div>
          <label>Height: </label>
          <input type="number" value={input.height} name="height" onChange={handleChange} min="0" max="85" />
          {errors.height && (
            <p className={styles['error-message']}>{errors.height}</p>
          )}
        </div>
        <div>
          <label>Weight: </label>
          <input type="number" value={input.weight} name="weight" onChange={handleChange} min="0" max="200" />
          {errors.weight && (
            <p className={styles['error-message']}>{errors.weight}</p>
          )}
        </div>
        <div>
          <label>Life Span: </label>
          <input type="number" value={input.life_span} name="life_span" onChange={handleChange} min="0" max="30" />
          {errors.life_span && (
            <p className={styles['error-message']}>{errors.life_span}</p>
          )}
        </div>
        <select onChange={handleSelect} >
          {temps.map((t, index)=>(
            <option key={index} value={t.name}>{t.name.toUpperCase()}</option>
          ))}
        </select>
        {errors.temperament && (
            <p className={styles['error-message']}>{errors.temperament}</p>
          )}
        <div>
  <label>Temperamentos seleccionados:</label>
  <ul>
    {input.temperament.map((el, index) => (
      <li key={index}>{el}</li>
    ))}
  </ul>
</div>
        <button type='submit'>Crear Perrito</button>
      </form>
      </div>
    </div>
  )
}