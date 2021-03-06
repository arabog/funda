import React, { useState } from 'react'
import BoilingWater from './BoilingWater';
import TempInput from './TempInput'

import { toCelsius, toFahrenheit, tryConvert } from './TempConvert';


const Calculator = () => {
          const [temp, setTemp] = useState('');
          const [scale, setScale] = useState('c');

          const onCelsChange = (inp) => {
                    setTemp(inp);

                    setScale('c')
          }

          const onFahChange = (inp) => {
                    setTemp(inp);

                    setScale('f')
          }

          const celsius = scale === 'f' 
                                                  ? tryConvert(temp, toCelsius)
                                                  : temp;

          const fahren = scale === 'c' 
                                                  ? tryConvert(temp, toFahrenheit)
                                                  : temp;

          return (
                    <div>
                              <h1>Calculator</h1>

                              <TempInput
                                        // values sent to TempInput 
                                        scale= 'c'
                                        // values sent to TempInput wc get updated based  
                                        // on value brought in by onTempChange 
                                        temp= {celsius} 
                                        // values brought from TempInput 
                                        onTempChange= {onCelsChange}
                              />

                              <TempInput
                                        // values sent to TempInput 
                                        scale= 'f' 
                                        // values sent to TempInput wc get updated based  
                                        // on value brought in by onTempChange 
                                        temp= {fahren} 
                                        // values brought from TempInput 
                                        onTempChange= {onFahChange}
                              />

                              <BoilingWater 
                                        celsius = {celsius}
                              /> 

                    </div>
          )
}


export default Calculator