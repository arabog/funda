import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'


const ThemedButton = (props) => {
	const anodaTheme = useContext(ThemeContext);


	return (
		<div>
			<button
				{...props}
				style={{backgroundColor: anodaTheme.background, color: anodaTheme.foreground}}
			>
				{props.children || 'Hello'}
			</button>
		</div>
	)
}


export default ThemedButton