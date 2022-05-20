import logo from '../../logo.svg'
import './Navbar.css'

import { Link } from 'react-router-dom'


const Navbar: React.FC = () => {


          return (
                    <header className="header">

                              <img src={logo} className="header-logo" alt="logo" />

                              <h1 className="header-title">React Shop</h1>

                              <nav style={{display: 'flex', justifyContent: 'center'}}>
                                        <Link to= "/" className="header-link">Home</Link>
                                        <Link to= "/pros" className="header-link">Products</Link>
                                        <Link to= "/admin" className="header-link">Admin</Link>
                                        <Link to='/contact'className='header-link'>Contact</Link>
                              </nav>

                    </header>
          )
}


export default Navbar