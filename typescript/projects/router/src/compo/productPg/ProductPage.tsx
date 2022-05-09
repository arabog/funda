import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {Products, prods, getProduct} from '../data/ProductsData';
import Product from '../product/Product';


interface Display {
	product: Products[];
	inBasket: boolean;
	addToBasket: () => void;
	children: React.ReactNode;

	loading: boolean,
	// getProduct(): void;
}

const ProductPage: React.FC<Display> = (props) => {
	const [inBasket, setInBasket] = useState<boolean>(false);
	const [loading, setLoading] = useState(true)
	const [product, setProduct] = useState()


	let params: any = useParams();
	let id = parseInt(params.id);

	/*
		let product;
		
		const selectedProduct:any[] = prods.filter((prod) =>  (
			prod.id === id ? prod : null
		))

		for (const key in selectedProduct) {
			product = (selectedProduct[key]);
		}

		useEffect(() => {
			const timer = setTimeout(() => {
				console.log('This will run after 1 second!')
			}, 1000);

			return () => clearTimeout(timer);
		}, []);


		*/

	const addToBasket = () => {
		setInBasket(true) 
	}


	useEffect(() => {
		async function getProp() {
			const res = await getProduct(id);
			setLoading(false);
			setProduct(res);
		}
		
		getProp()
	}, [id])
	
	console.log(product) 


	return (
		<div className="page-container">
			
			{
				// todo: start from here tomorrow
				(product || (loading && <div>Loading</div>))
					?  (
							<Product 
								product={product}
								inBasket={inBasket}
								addToBasket={addToBasket}
								children = {props.children}
							/>
					) : (
							<p>Product not found!</p>
					)

			}
		</div>
	)
}


export default ProductPage

