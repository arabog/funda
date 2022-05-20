import React, { Suspense, useState } from 'react';
import './App.css';

import logo from './logo.svg'

import {
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import ProductsPage from './compo/ProductsPage/ProductsPage';
import Home from './compo/home/Home';
import Navbar from './compo/navbar/Navbar';
import ProductPage from './compo/productPg/ProductPage';
import PgNotFound from './compo/PgNotFound/PgNotFound';
import Login from './compo/login/Login';
import AdminUsers from './compo/admin/AdminUsers';
import AdminProducts from './compo/admin/AdminProducts';
import AdminUser from './compo/admin/AdminUser';
import Contact from './compo/Contact/Contact';

const AdminPage = React.lazy(() => import("./compo/admin/AdminPage"));


type handleLogin = () => void;
type handleLogout = () => void;

// https://reactrouter.com/docs/en/v6/getting-started/tutorial
// https://reactcommunity.org/react-transition-group/

const App = () => {
	const [logIn, setLogIn] = useState<Boolean>(false);

	const handleLogin:handleLogin = () => {
		setLogIn(true);

	}

	const handleLogout:handleLogout = () => {
		setLogIn(false)
	} 


	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/pros" element={<ProductsPage products={[]} search='' handleSearch={() => {}} />} />
				<Route path='/pros/:id' 
					element={
						<ProductPage 
							// product = {[]} 
							inBasket = {false} 
							addToBasket={() =>{}} 
							// children= {props.children} 
							children
							loading={true}
						/>
					} 
				/>

				<Route path="/contact" element={<Contact /> } />
				
				{
					!logIn 
						? <Route path='/admin' element={ <Navigate replace to='/login' /> } /> 
						: <Route path="/login" element= { <Navigate replace to='/admin' /> } />
				}

				<Route path='/admin' element={
					<Suspense fallback={<div>Loading.... <img src={logo} className="header-logo" alt="logo" /> </div>}>
						<AdminPage signout={handleLogout} />
					</Suspense>
				}>
					<Route path='users' element={<AdminUsers />}>
						<Route path='/admin/users/:id' element={<AdminUser user={[]} />} />
					</Route>

					<Route path='products' element={<AdminProducts />} />
				</Route>

				<Route path='/login' element={<Login login={handleLogin} />} />
				<Route path='*' element={<PgNotFound />} />

			</Routes>
		</div>
	);
}


export default App;
