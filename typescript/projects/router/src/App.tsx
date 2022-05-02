import { useState } from 'react';
import './App.css';

import {
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import AdminPage from "./compo/admin/AdminPage";
import ProductsPage from './compo/ProductsPage/ProductsPage';
import Home from './compo/home/Home';
import Navbar from './compo/navbar/Navbar';
import ProductPage from './compo/productPg/ProductPage';
import PgNotFound from './compo/PgNotFound/PgNotFound';
import Login from './compo/login/Login';


type handleLogin = () => void;
type handleLogout = () => void;


const App = () => {
	const [logIn, setLogIn] = useState<Boolean>(false);

	const handleLogin:handleLogin = () => {
		setLogIn(true);

	}

	const handleLogout:handleLogout = () => {
		setLogIn(false)
	} 

	console.log(logIn);

	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/pros" element={<ProductsPage products={[]} />} />
				<Route path='/pros/:id' element={<ProductPage product={[]} added = {false}  />} />

				{
					!logIn 
					?  <Route path='/admin' element={<Navigate replace to='/login' />} /> 
					: <Route path="/login" element= {<Navigate replace to='/admin' />} />
				}

				<Route path='/admin' element={<AdminPage signout={handleLogout} />} />
				<Route path='/login' element={<Login login={handleLogin} />} />
				<Route path='*' element={<PgNotFound />} />

			</Routes>
		</div>
	);
}


export default App;
