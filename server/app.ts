import express from 'express'
import cors from 'cors'
import { addChat, getChatsMetadata } from './src/schema/chats'
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

app.post('/chat', async (req, res) => {
	const { userId, message } = req.body

	const newChat = await addChat(userId, message)

	res.status(200).send(newChat)
})

app.post('/user', async (req, res) => {
	const { userId } = req.body

	await addUser(userId)

	res.send('Hi')
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})