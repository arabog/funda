import React, { forwardRef } from 'react'


export const FancyButton = forwardRef((props, ref) => (

                    <button ref={ref.current} className='FancyButton' onClick={() => console.log(ref.current)}>
                              {props.children}
                    </button>

))




