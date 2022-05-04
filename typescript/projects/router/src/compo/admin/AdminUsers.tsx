import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export interface User {
          id: number;
          name: string;
          isAdmin: boolean;
}

export const adminUsersData: User[] = [
          { id: 1, name: "Fred", isAdmin: true },
          { id: 2, name: "Bob", isAdmin: false },
          { id: 3, name: "Jane", isAdmin: true }
];


const AdminUsers:React.FC = () => {


          return (
                    <div>
                              <ul style={{display: 'flex', justifyContent: 'center', listStyle: 'none'}}>
                                        {
                                                  adminUsersData.map(user => (
                                                            <li key={user.id} style={{padding: '0 5px'}}>
                                                                      <Link to={`/admin/users/${user.id}`}>{user.name}</Link>
                                                            </li>
                                                  ))
                                        }

                              </ul>

                              <Outlet />
                    </div>
          )
}

export default AdminUsers