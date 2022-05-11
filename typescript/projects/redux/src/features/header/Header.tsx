import React, { useState } from 'react'


const Header = () => {
	const [text, setText] = useState('');

	const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setText(e.target.value);
	}


	return (
		<div className='header'>
			<input 
				className='new-todo'
				placeholder='What needs to be done?'
				value={text}
				onChange={handleChange}
			/>
		</div>
	)
}


export default Header