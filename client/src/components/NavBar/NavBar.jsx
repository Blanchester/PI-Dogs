import React from 'react'
import "./NavBar.css"
import {Link} from "react-router-dom"
import SearchBar from '../SearchBar/SearchBar'

export const NavBar = () => {
  return (
    <div className='nav-container '>
      <div className='img-container'>
        <Link to="/">
        <img src="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ" alt="logo food" />
        </Link>
      </div>
      <div className='link-container'>
        <Link to="/home">Home</Link>
        <Link to="/create">Create</Link>
      </div>
      <SearchBar/>
    </div>
  )
}