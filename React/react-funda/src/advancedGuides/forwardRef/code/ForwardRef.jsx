import React from 'react'
import { FancyButton } from './FancyButton';


const ForwardRef = () => {
          const ref = React.createRef();

          console.log(ref.current);


          return (

                    <FancyButton ref={ref} >Click me!</FancyButton>
          )
}


export default ForwardRef