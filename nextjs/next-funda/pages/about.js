import Head from 'next/head';
import Link from 'next/link';


function AboutPage() {
	return (
		<>
			<Head>
				<title> About this website </title>
			</Head>

			<div>
				<Link href='/' passHref>
						<a>Back to home</a>
				</Link>
			</div>
		</>
	);
}

export default AboutPage;
