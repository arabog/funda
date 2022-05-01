import React from 'react'
import Greeting from '../greeting/Greeting';
import './Confirm.css'


interface Props {
          open: boolean;
          cancel: boolean;
          title: string;
          content: string;
          cancelCaption?: string;
          okCaption?: string;
          onOkClick: () => void;
          onCancelClick: () => void;
}


const Confirm: React.FC<Props> = (props): JSX.Element => {
          console.log("Confirm rendering");
          
          const handleCancelClick = () => {
                    props.onCancelClick();
                    console.log(props.cancel);

                    // alert('We look forward to seeing you again!')
          };

          const handleOkClick = () => {
                    props.onOkClick();

                    <Greeting />
          };


          return (
                    <div className= {props.open && props.cancel ? "confirm-wrapper confirm-visible" : "confirm-wrapper"}>
                              <div className="confirm-container">
                                        <div className="confirm-title-container">
                                                  <span> {props.title} </span>
                                        </div>

                                        <div className="confirm-content-container">
                                                  <p> {props.content} </p>
                                        </div>

                                        <div className="confirm-buttons-container">
                                                  <button 
                                                            className="confirm-cancel"
                                                            onClick={handleCancelClick}
                                                  >
                                                            {props.cancelCaption}
                                                  </button>

                                                  <button 
                                                            className="confirm-ok"
                                                            onClick={handleOkClick}
                                                  >
                                                            {props.okCaption}
                                                  </button>
                                        </div>
                              </div>
                    </div>          
          )
}


Confirm.defaultProps = {
          cancelCaption: 'Cancel',
          okCaption: 'OK'
}

const ConfirmMemo = React.memo(Confirm)

export default ConfirmMemo