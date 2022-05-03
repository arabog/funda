import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserInfo from './compo/UserInfo';
import Home from './compo/Home';
import NoMatch from './compo/NoMatch';


function App() {


	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/?user' element={<UserInfo />} />
				<Route path='*' element = {<NoMatch />} />
			</Routes>
		</div>
	);
}

export default App;
