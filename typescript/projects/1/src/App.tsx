import React from 'react';
import './App.css';
import Confirm from './compo/confirm/Confirm';

const App = () => {

	return (
		<Confirm 
			title="React and TypeScript"
			content="Are you sure you want to learn React and TypeScript?"
			cancelCaption ='No way'
			okCaption = 'Yes pls!'
		/>
	);
}

export default App;
