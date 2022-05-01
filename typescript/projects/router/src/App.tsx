import './App.css';

import {
	Routes,
	Route,
} from "react-router-dom";

import AdminPage from "./compo/AdminPage";
import ProductsPage from './compo/ProductsPage';
import Home from './compo/Home';


function App() {

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<ProductsPage products={[]} />} />
				<Route path="/admin" element={<AdminPage />} />
			</Routes>
		</div>
	);
}


export default App;
