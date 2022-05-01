import { Button, VStack } from '@chakra-ui/react'
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

// @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4 @chakra-ui/icons

export default function Home() {


	return (
		<VStack padding='10'>
			<Button backgroundColor='brand.100'>brand.100</Button>
			<Button backgroundColor='brand.200'>brand.200</Button>
			<Button backgroundColor='brand.300'>brand.300</Button>
			<Button backgroundColor='brand.400'>brand.400</Button>
		</VStack>
	)
}
