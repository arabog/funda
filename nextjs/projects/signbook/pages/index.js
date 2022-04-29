import { useQuery } from "@apollo/client";
import GET_LATEST_SIGNS from "../lib/queries/getLatestSigns";

function HomePage() {
	const { loading, data} = useQuery(GET_LATEST_SIGNS, {
		fetchPolicy: 'no-cache',
	});

	return <div>Hello there</div>
}

export default HomePage