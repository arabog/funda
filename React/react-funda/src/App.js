import React, { useState } from 'react';
import './App.css';
import Calculator from './mainConcept/calculator/Calculator';
import FitterableProductTable from './mainConcept/shopApp/FitterableProductTable';
// import OuterClickExample from './advancedGuides/Acessisibility';

import { ThemeContext, themes } from './advancedGuides/context/ThemeContext'
import Toolbar from './advancedGuides/context/Toolbar'
import ThemedButton from './advancedGuides/context/ThemedButton'


function App() {
	const [theme, setTheme] = useState(themes.light);

	const toggleTheme = () => {
		setTheme(
			// eslint-disable-next-line no-unused-expressions
			theme === themes.dark ? themes.light : themes.dark
		)
	}
	

	return (
		<div>
			<Calculator />

			<FitterableProductTable />

			{/* <OuterClickExample /> */}

			<ThemeContext.Provider value={theme} >
				<Toolbar changeTheme={toggleTheme} />
			</ThemeContext.Provider>

			{/* <Section> */}
				<ThemedButton />
			{/* </Section> */}
		</div>
	);
}


export default App;
