import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import NavBar from '../component/Navbar';

import CartContext from '../lib/graphql/context/Cart/index';

import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
	const [items, setItems] = useState({});


	return (
		<ChakraProvider>

			<CartContext.Provider value={{items, setItems}}>

				<Flex w="full" minH="100vh" bgColor="gray.100" >
					<NavBar />

					<Box maxW="70vw" m="auto">
						<Component {...pageProps} />
					</Box>
				</Flex>

			</CartContext.Provider>

		</ChakraProvider>
	)
}


export default MyApp

/*
npm i @chakra-ui/react @emotion/react @emotion/styled 
@stripe/stripe-js framer-motion graphql graphql-request
*/
