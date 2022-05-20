import React, { useState } from 'react'
import ContactUs from './CcontactUs'


interface IState {
          name: string,
          email: string,
          reason: string,
          notes: string
}


const ContactPg: React.FC<IState> = () => {
          const [name, setName] = useState();
          const [email, setEmail] = useState();
          const [notes, setNotes] = useState();
          const [reason, setReason] = useState();


          return (
                    <div className='page-container'>
                              <h1>Contact Us</h1>

                              <p> If you enter your details we'll get back to you as soon as we can. </p>

                              <ContactUs 
                                        name ={name}
                                        handleName = {setName}
                                        
                                        email ={email}
                                        handleEmail = {setEmail}
                                        
                                        notes = {notes}
                                        handleNotes  = {setNotes}
                                        
                                        reason = {reason}
                                        handleReason = {setReason}
                              />
                    </div>
          )
}


export default ContactPg