import React from 'react';
import './App.css';
import ProductsPage from './compo/ProductsPage';

function App() {
	return (
		<div className="App">
			React and TypeScript

			<ProductsPage products={[]} />
		</div>
	);
}

export default App;
