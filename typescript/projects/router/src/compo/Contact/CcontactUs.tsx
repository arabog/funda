import React from 'react'


interface IProps {
          name: string,
          handleName: React.Dispatch<React.SetStateAction<any>>

          email: string,
          handleEmail: React.Dispatch<React.SetStateAction<any>>
          
          reason: string,
          handleReason: React.Dispatch<React.SetStateAction<any>>
          
          notes: string,
          handleNotes: React.Dispatch<React.SetStateAction<any>>
}


const ContactUs: React.FC<IProps> = (props) => {

          const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const name = e.target.value;

                    props.handleName(name);
          }

          return (
                    <form className='form' noValidate={true}>
                              <div className='form-group'>
                                        <label htmlFor='name'>Your name</label>
                                        <input 
                                                  type='text' 
                                                  id='name' 
                                                  
                                                  value={props.name} 
                                                  onChange={handleNameChange}
                                        />
                              </div>
                    </form>
          )
}


export default ContactUs