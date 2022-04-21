import React, { useEffect, useRef } from 'react'
import RefAndDOM from './RefsAndDOM'


const AutoFocusTextInput = () => {
          const textInput = useRef(null)

          useEffect(() => {
                    textInput.current.focus()
          }, [])


          return (
                    <div>
                              <RefAndDOM ref={textInput} />          
                    </div>
          )
}


export default AutoFocusTextInput