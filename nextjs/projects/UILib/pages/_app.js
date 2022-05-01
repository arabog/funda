import '../styles/globals.css'
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react'
import TopBar from '../compon/TopBar'

const customTheme = extendTheme({
	colors: {
		brand: {
			100: '#ffebee',
			200: '#e57373',
			300: '#f44336',
			400: '#e53935',
		},
	},
})


function MyApp({ Component, pageProps }) {


	return (
		// <ChakraProvider theme={customTheme}>
		<ChakraProvider theme={customTheme}>
			<TopBar />

			<Box maxWidth= 'container.xl' margin= 'auto' >
				<Component {...pageProps} />
			</Box>
		</ChakraProvider>
	)
}

export default MyApp
