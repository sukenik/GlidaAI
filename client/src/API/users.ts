
import axios from 'axios'
// import { appConfig } from '../appConfig'

export const addUser = async (uid: string) => {
	const res = await axios.post(
		'http://localhost:3000/user',
		{ userId: uid }
	)

	return res.data
}