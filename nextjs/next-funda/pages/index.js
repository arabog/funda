import Head from 'next/head';
import Link from 'next/link';
import Widget from '../components/Widget';


function IndexPage() {
	return (
		<>
			<Head>
				<title key='htmlTitle'> Welcome to my Next.js website </title>
			</Head>

			<div>
				<Link href='/about' passHref>
						<a>About us</a>
				</Link>

				<div>
					<Widget pageName='index' /> 
				</div>
			</div>
		</>
	);
}


export default IndexPage;

/*
import Image from "next/image";


function Homepage() {
	return (
		<div style={{width: 500, height: 200, position: 'relative'}}>
			<Image 
				src=' https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
				
				// width={500}	
				// height={200}
				layout="fill"
				objectFit="cover"
				alt= 'A beautiful English Setter'
			/>

			This is the homepage
		</div>
	)
} 

export default Homepage;



*/
