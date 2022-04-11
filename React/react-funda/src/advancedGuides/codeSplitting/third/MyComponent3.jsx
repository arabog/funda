import React, { Suspense, useState, useTransition } from 'react'


import Tabs from './Tabs'
import Glimmer from './Glimmer'

const Comments = React.lazy(() => import('./Comments'));
const Photo = React.lazy(() => import('./Photo'));


// it didnt work bcos useTransition is a React18 hook
const MyComponent2 = () => {
          const [tab, setTab] = useState('photo');
          const [isPending, startTransition] = useTransition({timeoutMs: 3000});

          const handleTabSelect = (tab) => {
                    startTransition(() => {
                              setTab(tab)
                    })
          }


          return (
                    <div>
                              <Tabs onTabSelect={handleTabSelect} />

                              <Suspense fallback={ <Glimmer /> }>
                                        {tab === 'photo' ? <Photo /> : <Comments />}
                              </Suspense>

                              {
                                        isPending ? 'Pending' : null
                              }
                    </div>
          )
}


export default MyComponent2