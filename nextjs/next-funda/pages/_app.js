import '../styles/globals.css'
import { useState } from 'react'

import {ThemeContext, themes} from '../components/themeContext';

import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState('light');
	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
	

	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			<div
				style={{
					width: '100%',
					minHeight: '100vh',
					...themes[theme]
				}}
			>
				<Navbar />

				<Component {...pageProps} />
			</div>

		</ThemeContext.Provider>
	) 
}

export default MyApp
