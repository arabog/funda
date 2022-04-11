import React, { Suspense } from 'react'


const OtherComponent = React.lazy(() => import('./OtherComponent'));


const MyComponent = () => {

          
          return (
                    <div>
                              <Suspense fallback={<div>Loading...</div>}>
                                        <OtherComponent />
                              </Suspense>
                    </div>
          )
}


export default MyComponent