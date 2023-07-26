import React from 'react'
import "./NavBar.css"
import { Link } from "react-router-dom"
import SearchBar from '../SearchBar/SearchBar'
import imageDogo from '../../assets/dogo-argentino.png'

export const NavBar = () => {
  return (
    <div className='navbar-stk'>
      <div className='nav-container '>
        <div className='nav-link-container'>
          <div className='img-container'>
            <Link to="/">
              <img className='icon-image' src={imageDogo} alt="logo food" />
            </Link>
          </div>
          <div className='link-container'>
            <Link to="/home">Home</Link>
          </div>
          <div className='link-container'>
            <Link to="/create">Create</Link>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}