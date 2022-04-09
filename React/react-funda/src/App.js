import React, { useState } from 'react';
import './App.css';

// import Calculator from './mainConcept/calculator/Calculator';
// import FitterableProductTable from './mainConcept/shopApp/FitterableProductTable';
// import OuterClickExample from './advancedGuides/Acessisibility';

// import { ThemeContext, themes } from './advancedGuides/context/toggle/ThemeContext'
// import Toolbar from './advancedGuides/context/toggle/Toolbar'
// import ThemedButton from './advancedGuides/context/toggle/ThemedButton'

import { ThemeContext, themes } from './advancedGuides/context/toggle2/ThemeContext'
import Content from './advancedGuides/context/toggle2/Content';

function App() {
	const [theme, setTheme] = useState(themes.light);


	const toggleTheme = () => {
		setTheme(
			theme === themes.dark ? themes.light : themes.dark
		)
	}


	return (
		<ThemeContext.Provider value ={{theme, toggleTheme}}>
			<Content />
		</ThemeContext.Provider>
	)

	

	// return (
	// 	<div>
	// 		<Calculator />

	// 		<FitterableProductTable />

	// 		{/* <OuterClickExample /> */}

	// 		<ThemeContext.Provider value={theme} >
	// 			<Toolbar changeTheme={toggleTheme} />
	// 		</ThemeContext.Provider>

	// 		<ThemedButton />
	// 	</div>
	// );
}


export default App;
