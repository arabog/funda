import React from 'react';


const scaleNames = {
          c: 'Celsius',
          f: 'Fahrenheit',
}

const TempInput = (props) => {
          const temp  = props.temp;
          const scale = props.scale;


          const handleChange = (e) => { 
                    const value = e.target.value;
                    
                    props.onTempChange(value);
          }


          return (
                    <div>
                              <fieldset>
                                        <legend>Enter temperature in {scaleNames[scale]}:</legend>

                                        <input
                                                  value={temp}

                                                  onChange={(e) => handleChange(e)}
                                        />
                              </fieldset>
                    </div>
          )
}


export default TempInput;