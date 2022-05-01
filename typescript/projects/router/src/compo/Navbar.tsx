import React from 'react'
import logo from '../logo.svg'

import { Link } from 'react-router-dom'

import './Navbar.css'


const Navbar: React.FC = () => {


          return (
                    <header className="header">
                              <img src={logo} className="header-logo" alt="logo" />

                              <h1 className="header-title">React Shop</h1>

                              <nav>
                                        <Link to= "/" className="header-link">Home</Link>
                                        <Link to= "/pros" className="header-link">Products</Link>
                                        <Link to= "/admin" className="header-link">Admin</Link>
                              </nav>
                    </header>

          )
}


export default Navbar