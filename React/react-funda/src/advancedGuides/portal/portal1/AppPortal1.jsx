import React, { useState } from 'react'
import ModalPortal1 from './ModalPortal1';

import './ModalPortal1.css'



const AppPortal1 = () => {
          const [showModal, setShowModal] = useState(false);

          const handleShow = () => {
                    setShowModal(!showModal)
          }


          const modal = showModal ? (
                    <ModalPortal1>
                              <div className="modal">
                                        <div>
                                                  With a portal, we can render content into a different
                                                  part of the DOM, as if it were any other React child.
                                        </div>

                                        This is being rendered inside the #modal-container div.
                                        
                                        <button onClick={handleShow}>Hide modal</button>
                              </div>
                    </ModalPortal1>
          ) : null;


          return (
                    <div className="app">
                              This div has overflow: hidden.

                              <button onClick={handleShow}>Show modal</button>

                              {modal}
                    </div>
          )
}


export default AppPortal1