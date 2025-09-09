import express from 'express'
import cors from 'cors'
import { addChat, addMessage, getChat, getChatsMetadata } from './src/schema/chats'
import { addUser, getChatIdsByUserId } from './src/schema/users'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello from Express!')
})

app.get('/chats/:userId', async (req, res) => {
	const userId = req.params.userId

	const chatIds = await getChatIdsByUserId(userId)
	const chats = await getChatsMetadata(chatIds)

	res.status(200).send(chats)
})

app.get('/chat/:chatId', async (req, res) => {
	const chatId = req.params.chatId

	const chat = await getChat(chatId)

	res.status(200).send(chat)
})

app.post('/chat', async (req, res) => {
	const { userId, message } = req.body

	const newChat = await addChat(userId, message)

	res.status(200).send(newChat)
})

app.put('/chat/:chatId', async (req, res) => {
	const chatId = req.params.chatId

	const { message } = req.body

	const newChat = await addMessage(chatId, message)

	res.status(200).send(newChat)
})

app.post('/user', async (req, res) => {
	const { userId } = req.body

	await addUser(userId)

	res.status(200).send({ message: 'User added successfully' })
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})