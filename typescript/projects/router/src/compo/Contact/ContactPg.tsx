import React from 'react'
import ContactUs from './CcontactUs'

interface IState {
          name: string,
          email: string,
          reason: string,
          notes: string
}

const ContactPg: React.FC<IState> = () => {


          return (
                    <div className='page-container'>
                              <h1>Contact Us</h1>

                              <p> If you enter your details we'll get back to you as soon as we can. </p>

                              <ContactUs />
                    </div>
          )
}


export default ContactPg