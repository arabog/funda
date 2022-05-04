import React from 'react'
import { useParams } from 'react-router-dom'

import { adminUsersData, User } from './AdminUsers'

interface Users {
          user: User[];
}


const AdminUser:React.FC<Users> = () => {
          let params:any = useParams();

          let id = params.id;
          
          const newId = parseInt(id);
                    
          let singleUser = adminUsersData.filter(u => u.id === newId)
          // }

          console.log(singleUser);

          let userH: any;

          for (const key in singleUser) {
                    userH = singleUser[key]
          }

          // console.log(userH.isAdmin);

          return (
                    <div>
                              <div>
                                        <b>Id: </b>
                                        <span>{userH.id}</span>
                              </div>

                              <div>
                                        <b>Name: </b>
                                        <span>{userH.name}</span>
                              </div>

                              <div>
                                        <b>IsAdmin: </b>
                                        <span>{userH.isAdmin ? 'true' : 'false'}</span>
                              </div>
                    </div>
          )
}

export default AdminUser