import {useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'


export async function getServerSideProps() {
	// we'll mk d REST req to our APIs here
	const usersReq = await axios.get('https://api.rwnjs.com/04/users');

	return {
		props: {users: usersReq.data}
	}
}


function HomePage({users}) {


	return (
		<ul>
			{
				users.map(user => 
					<li key={user.id}>
						<Link href={`/users/${user.username}`} passHref>
							<a> {user.username} </a>
						</Link>
					</li>
				)
			}
		</ul>
	)
}


export default HomePage