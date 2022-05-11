import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { capitalize } from '../filters/colors';


const Header = () => {
	const [text, setText] = useState('');
	const dispatch = useDispatch()

	const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setText(e.target.value);
	}

	const handleKeyDown = (e: { which: number; }) => {
		// If the user pressed the Enter key:
		const trimmedText = text.trim();

		if (e.which === 13 && trimmedText) {
			// Dispatch the "todo added" action with this text
			dispatch(
				{
					type: 'todos/todoAdded', 
					payload: capitalize(trimmedText)
				}
			);

			// And clear out the text input
			setText('');
		}
	}


	return (
		<div className='header'>
			<input 
				className='new-todo'
				placeholder='What needs to be done?'
				value={text}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
		</div>
	)
}


export default Header