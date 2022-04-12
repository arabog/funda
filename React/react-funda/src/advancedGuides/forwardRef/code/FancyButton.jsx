import React, { forwardRef } from 'react'


export const FancyButton = forwardRef((props, ref) => (

          <button ref={ref} className='FancyButton'>
                    {props.children}
          </button>

))




