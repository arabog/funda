import React from 'react'
import Content from './Content'
import Sidebar from './Sidebar'


const Layout = () => {

          
          return (
                    <div style={{display: 'flex', justifyContent: 'space-btween', width: '100vw'}}>
                              <Sidebar />

                              <Content />
                    </div>
          )
}


export default Layout