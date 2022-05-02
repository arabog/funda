import React from 'react'

type loginProp = {
          login: () => void;
}


const Login:React.FC<loginProp> = (props) => {


          return (
                    <div className="page-container">
                              <h1>Login</h1>
                              <p>You need to login ...</p>

                              <button onClick={() => props.login()}>Login</button>
                    </div>
          )
}

export default Login