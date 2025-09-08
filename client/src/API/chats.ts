
import axios from 'axios'
// import { appConfig } from '../appConfig'

export interface iAddChatVars {
	userId: string
	message: string
}

export const addChat = async (vars: iAddChatVars) => {
	const res = await axios.post(
		'http://localhost:3000/chat',
		vars
	)

	return res.data
}