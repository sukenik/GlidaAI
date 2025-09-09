
import axios from 'axios'
// import { appConfig } from '../appConfig'

export interface iAddChatVars {
	userId: string
	message: string
}
export interface iUpdateChatVars {
	chatId: string
	message: string
}

export const addChat = async (vars: iAddChatVars) => {
	const res = await axios.post(
		'http://localhost:3000/chat',
		vars
	)

	return res.data
}

export const getChatsMetadata = async (userId: string) => {
	const res = await axios.get(
		`http://localhost:3000/chats/${userId}`,
	)

	return res.data
}

export const getChat = async (chatId: string) => {
	const res = await axios.get(
		`http://localhost:3000/chat/${chatId}`,
	)

	return res.data
}

export const updateChat = async (chatId: string, message: string) => {
	const res = await axios.put(
		`http://localhost:3000/chat/${chatId}`,
		{ message }
	)

	return res.data
}