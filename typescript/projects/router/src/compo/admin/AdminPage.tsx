import React from 'react'

type Signout = {
          signout: () => void;
}


const AdminPage:React.FC<Signout> = (props) => {

          return (
                    <div className="page-container">
                              <h1>Admin Panel</h1>
                              <p>You should only be here if you have logged in</p>

                              <button onClick={() =>props.signout()}>Signout</button>
                    </div>
          )
}


export default AdminPage