import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';

import './AdminPage.css'

type Signout = {
          signout: () => void;
}


const AdminPage:React.FC<Signout> = (props) => {
          const params = useLocation();
          

          return (
                    <div className="page-container">
                              <h1>Admin Panel</h1>
                              <p>You should only be here if you have logged in</p>

                              <ul className='admin-sections'>
                                        <li key='users'>
                                                  <Link to={`/admin/users`}>Users</Link>
                                        </li>

                                        <li key='products'>
                                                  <Link to={`/admin/products`}>Products</Link>
                                        </li>
                              </ul>

                              <Outlet />

                              {
                                        params.pathname === '/admin' && (
                                                  <button onClick={() =>props.signout()}>
                                                            Signout
                                                  </button>
                                        )
                              }
                    </div>
          )
}


export default AdminPage