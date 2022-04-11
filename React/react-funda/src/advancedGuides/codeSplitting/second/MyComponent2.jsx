import React, { Suspense, useState } from 'react'


import Tabs from './Tabs'
import Glimmer from './Glimmer'

const Comments = React.lazy(() => import('./Comments'));
const Photo = React.lazy(() => import('./Photo'));


const MyComponent2 = () => {
          const [tab, setTab] = useState('photo');

          const handleTabSelect = (tab) => {
                    setTab(tab)
          }


          return (
                    <div>
                              <Tabs onTabSelect={handleTabSelect} />

                              <Suspense fallback={ <Glimmer /> }>
                                        {tab === 'photo' ? <Photo /> : <Comments />}
                              </Suspense>
                    </div>
          )
}


export default MyComponent2