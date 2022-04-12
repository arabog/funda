import React from 'react'
import { FancyButton } from './FancyButton';


const ForwardRef = () => {
          const ref = React.createRef();


          return (

                    <FancyButton ref={ref} >Click me!</FancyButton>
          )
}


export default ForwardRef