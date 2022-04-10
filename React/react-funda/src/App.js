// /*
import React, {  useContext } from 'react';


import {ThemeContext} from './advancedGuides/context/multipleConsumers/ThemeContext'
import {UserContext} from './advancedGuides/context/multipleConsumers/UserContext'
import Layout from './advancedGuides/context/multipleConsumers/Layout';


// If two or more context values are often used together, you 
// might want to consider creating your own render prop 
// component that provides both.



function App(props) {
	const theme = useContext(ThemeContext);
	const signedInUser = useContext(UserContext);


	return (
		<ThemeContext.Provider value={theme}>

			<UserContext.Provider value={signedInUser}>
				
				<Layout />
			
			</UserContext.Provider>
		
		</ThemeContext.Provider>
	)

}

// */


/* context and nested components
import React, { useState } from 'react';

import { ThemeContext, themes } from './advancedGuides/context/contextAndNestedComponent/ThemeContext'
import Content from './advancedGuides/context/contextAndNestedComponent/Content';


function App(props) {
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
	
}

*/


/* Toggle:

import React, { useState } from 'react';

import { ThemeContext, themes } from './advancedGuides/context/toggle/ThemeContext'
import Toolbar from './advancedGuides/context/toggle/Toolbar'
import ThemedButton from './advancedGuides/context/toggle/ThemedButton'


function App(props) {
	const [theme, setTheme] = useState(themes.light);


	const toggleTheme = () => {
		setTheme(
			theme === themes.dark ? themes.light : themes.dark
		)
	}


	return (
		<div>
			<ThemeContext.Provider value ={theme}>
				<Toolbar changeTheme={toggleTheme} />
			</ThemeContext.Provider>

			<ThemedButton />
		</div>
	)
	
}

*/


/*
import Calculator from './mainConcept/calculator/Calculator';
import FitterableProductTable from './mainConcept/shopApp/FitterableProductTable';


function App(props) {
	

	return (
		<div>
			<Calculator />

			<FitterableProductTable />

		</div>
	);
}
*/


export default App;
