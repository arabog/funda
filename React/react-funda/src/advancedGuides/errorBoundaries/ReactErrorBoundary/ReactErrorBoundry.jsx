
export const ErrorHandler = ({error}) => {


          return (
                    <div role='alert'>
                              <p>An error occurred:</p>

                              <pre> {error.message} </pre>          
                    </div>
          )
}


export const City = ({name}) => {


          return (
                    <div>
                              Hello, visit {name.toUpperCase()}
                    </div>
          )
}


export const Country = ({capital}) => {


          return (
                    <div>
                              Hello, visit {capital.toUpperCase()}
                    </div>
          )
}