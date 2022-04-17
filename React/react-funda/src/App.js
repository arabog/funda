import React from 'react'
import Example from './advancedGuides/OtherLib/JQuery/Example'


const App = () => {


	return (
		<div>
			<Example />
		</div>
	)
}

export default App

/* Fragmemts
import React from 'react'

import Fragment from './advancedGuides/Fragments'

const App = () => {


	return (
		<div>
			<Fragment />
		</div>
	)
}

export default App


ForwardRef
import React from 'react'
import ForwardRef from './advancedGuides/forwardRef/code/ForwardRef'

const App = () => {


	return (
		<div>
			<ForwardRef />
		</div>
	)
}


export default App

*/


/* ErrorRecovery from react-error-boundary npmjs page

import React, { useState } from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Bomb, ErrorFallback} from './advancedGuides/errorBoundaries/ErrorRecover/ErrorRecovery'



const App = () => {
	const [explode, setExplode] = useState(false);


	return (
		<div>
			<button onClick={() => setExplode(e => !e )}>Toggle Explode </button>
			
			<ErrorBoundary 
				FallbackComponent={ErrorFallback}
				onReset={() => setExplode(false)}
				resetKeys= {[explode]}
			>
				{ explode ? <Bomb /> : null }
			</ErrorBoundary>
		</div>
	)
}

export default App


ErrorBoundary with React Error Boundary 
import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import { City, Country, ErrorHandler } from './advancedGuides/errorBoundaries/ReactErrorBoundary/ReactErrorBoundry'


function App() {


	return (
		<ErrorBoundary FallbackComponent={ErrorHandler}>
                              <Country />

                              <City />
                    </ErrorBoundary>
	)
}

export default App


ErrorBoundary with trycatch 
import React from 'react'
import TryAndCatch from './advancedGuides/errorBoundaries/tryCatch/TryAndCatch'


function App() {
	return (
		<div>
			<TryAndCatch />
		</div>
	)
}


export default App


Error boundary A
import React from 'react'
import MyErrorComponent from './advancedGuides/ErrorBoundaries'


const App = () => {

	return (
		<div>
			<MyErrorComponent />
		</div>
	)
}


export default App


Using router with code splitting
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Home = lazy(() => import('./advancedGuides/codeSplitting/fourth/routes/Home'));
const About = lazy(() => import('./advancedGuides/codeSplitting/fourth/routes/About'));


const App = () => {


	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path='/' element={<Home />} />

					<Route path='/about' element={<About />} />
				</Routes>
			</Suspense>
		</Router>
	)
}


export default App


Code splitting
import React from 'react'
import MyComponent from './advancedGuides/codeSplitting/first/MyComponent'
import MyComponent2 from './advancedGuides/codeSplitting/second/MyComponent2'
// import MyComponent3 from './advancedGuides/codeSplitting/third/MyComponent3'


const App = () => {
	return (
		<div>
			<MyComponent />

			<MyComponent2 />

		</div>
	)
}


export default App


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



context and nested components
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



Toggle:

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


export default App;
*/