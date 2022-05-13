import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
	<ChakraProvider>
		<Component {...pageProps} />
	</ChakraProvider>
}

export default MyApp

/*
npm i @chakra-ui/react @emotion/react @emotion/styled 
@stripe/stripe-js framer-motion graphql graphql-request
*/
