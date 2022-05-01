// import { Button, useColorMode, VStack, Text } from '@chakra-ui/react'
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import UserCard from "../compon/UserCard";
import users from "../data/users";

// @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4 @chakra-ui/icons

export default function Home() {
	// const { colorMode, toggleColorMode } = useColorMode();


	return (
		// <VStack padding='10'>
		// 	<Button backgroundColor='brand.100'>brand.100</Button>
		// 	<Button backgroundColor='brand.200'>brand.200</Button>
		// 	<Button backgroundColor='brand.300'>brand.300</Button>
		// 	<Button backgroundColor='brand.400'>brand.400</Button>

		// 	<Text fontSize= '2xl' fontWeight='semibold' as='h2'>
		// 		Rendering in {colorMode}
		// 	</Text>

		// 	<Button
		// 		aria-label='UI Theme'
		// 		onClick={toggleColorMode}
		// 	>
		// 		Toggle {colorMode === 'light' ? 'dark' : 'light'} mode
		// 	</Button>
		// </VStack>

		<Box>
			<Text
				fontSize="xxx-large"
				fontWeight="extrabold"
				textAlign="center"
				marginTop="9"
			>
				ACME Corporation Employees
			</Text>

			<Grid 
				gridTemplateColumns={ ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'] }
				gridGap='10'
				padding='10'
			>
				{
					users.map((user) => (
						<GridItem key={user.id}>
							<UserCard {...user} />
						</GridItem>
					))
				}
			</Grid>
		</Box>
	)
}
