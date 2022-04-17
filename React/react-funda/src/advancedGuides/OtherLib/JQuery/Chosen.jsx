import React, { useEffect } from 'react'
import $ from 'jquery'
import './Select.css'



const Chosen = (props) => {
          const handleChange = (e) => {
                    $('.select').click(function() {
                              alert('clicked');

                              // let $value = e.target.value;
                              // console.log($value);
                    })
          }

          useEffect(() => {
                    handleChange()
          }, [])


          return (
                    <div>
                              <select className='select'  onChange={(e) => handleChange(e)}>
                                        {props.children}
                              </select>
                    </div>
          )
}


export default Chosen