
import ProductCard from '../components/ProductCard';
import products from '../data/items';
import HomeStyle from './styleModule'


function Home() {

	
	return (
		<>
			<div className="grid grid-cols-4 gap-4">
				{
					products.map((product) => (
						<ProductCard key={product.id} {...product} />
						))
					}

			</div>

			<HomeStyle />
		</>
	);
}


export default Home;