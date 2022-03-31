function toCelsius(temp) {
          return (temp - 32) * 5 / 9;
}


function toFahrenheit(temp) {
          return (temp * 9 / 5) + 32;
}


function tryConvert(temp, convert) {
          temp = parseFloat(temp);

          if(Number.isNaN(temp)) {
                    return '';
          }

          const newTemp = convert(temp);

          return Math.round(newTemp * 1000) / 1000;
}


export  { toCelsius, toFahrenheit, tryConvert }