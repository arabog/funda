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

          const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const email = e.target.value;

                    props.handleEmail(email)
          }

          const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                    const reason = e.target.value;

                    props.handleReason(reason)
          }

          const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const notes = e.target.value;

                    props.handleNotes(notes)
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

                              <div className="form-group">
                                        <label htmlFor="email">Your email address</label>
                                        <input 
                                                  type="email" 
                                                  id="email" 
                                                  value={props.email}
                                                  onChange={handleEmailChange} 
                                        />
                              </div>

                              <div className="form-group">
                                        <label htmlFor="reason">Reason you need to contact us</label>
                                        <select 
                                                  id="reason" 
                                                  value={props.reason}

                                                  onChange={handleReasonChange}
                                        >
                                                  <option value="Marketing">Marketing</option>
                                                  <option selected value="Support">Support</option>
                                                  <option value="Feedback">Feedback</option>
                                                  <option value="Jobs">Jobs</option>
                                                  <option value="Other">Other</option>
                                        </select>
                              </div>

                              <div className="form-group">
                                        <label htmlFor="notes">Additional notes</label>
                                        <textarea 
                                                  id="notes" 
                                                  value={props.notes}
                                                  onChange={handleNotesChange} />
                                        </div>
                    </form>
          )
}


export default ContactUs