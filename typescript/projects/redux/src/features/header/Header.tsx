import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// import { capitalize } from '../filters/colors';
import { saveNewTodo } from '../todos/todoSlice';


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
			// // Dispatch the "todo added" action with this text
			// dispatch(
			// 	{
			// 		type: 'todos/todoAdded', 
			// 		payload: capitalize(trimmedText)
			// 	}
			// );

			 // Create the thunk function with the text the user wrote
			// const saveNewTodoThunk = saveNewTodo(trimmedText);

			 // Then dispatch the thunk function itself
			// dispatch(saveNewTodoThunk as any)

			// Create the thunk function and immediately dispatch it
			dispatch(saveNewTodo(trimmedText) as any)

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