import React from 'react'
import './Confirm.css'


interface Props {
          title: string;
          content: string;
          cancelCaption?: string;
          okCaption?: string;
}


const Confirm: React.FC<Props> = (props) => {


          return (
                    <div className="confirm-wrapper confirm-visible">
                              <div className="confirm-container">
                                        <div className="confirm-title-container">
                                                  <span> {props.title} </span>
                                        </div>

                                        <div className="confirm-content-container">
                                                  <p> {props.content} </p>
                                        </div>

                                        <div className="confirm-buttons-container">
                                                  <button className="confirm-cancel">{props.cancelCaption}</button>
                                                  <button className="confirm-ok">{props.okCaption}</button>
                                        </div>
                              </div>
                    </div>          
          )
}


Confirm.defaultProps = {
          cancelCaption: 'Cancel',
          okCaption: 'OK'
}


export default Confirm