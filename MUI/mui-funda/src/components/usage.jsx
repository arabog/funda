/* 
You can use any of the components as demonstrated in the documentation. 
Please refer to each component's demo page to see how they should be imported.

https://mui.com/components/buttons/

Quick start
Here's a quick example to get you started, it's literally all you need:

import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));

*/
import Button from '@mui/material/Button';


const MaterialButton = () => {
          return <Button variant="contained">Hello World</Button>;
}

export default MaterialButton;

/*
Globals
MUI usage experience can be improved with a handful of important 
globals that you'll need to be aware of.

Responsive meta tag
MUI is developed mobile-first, a strategy in which we first write code 
for mobile devices, and then scale up components as necessary using 
CSS media queries. To ensure proper rendering and touch zooming 
for all devices, add the responsive viewport meta tag to your <head> 
element.

<meta name="viewport" content="initial-scale=1, width=device-width" />
