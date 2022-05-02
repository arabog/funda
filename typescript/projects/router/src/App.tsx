import './App.css';

import {
	Routes,
	Route,
} from "react-router-dom";

import AdminPage from "./compo/AdminPage";
import ProductsPage from './compo/ProductsPage';
import Home from './compo/Home';
import Navbar from './compo/Navbar';
import ProductPage from './compo/ProductPage';


function App() {

	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/pros" element={<ProductsPage products={[]} />} />

				<Route path='/pros/:id' element={<ProductPage product={[]} added = {false}  />} />

				<Route path="/admin" element={<AdminPage />} />
			</Routes>
		</div>
	);
}


export default App;
