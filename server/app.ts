import cors from 'cors'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { addChat, addMessage, getChat, getChatsMetadata } from './src/schema/chats'
import { addUser, getChatIdsByUserId } from './src/schema/users'
import { iCreateChatVars } from '../types'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT']
	}
})

app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
	console.log('A user connected')

	socket.on('createChat', async (vars: iCreateChatVars) => {
		const { userId, message } = vars

		const newChat = await addChat(userId, message)

		io.emit('createChat', newChat)
	})

	socket.on('disconnect', () => {
		console.log('User disconnected')
	})
})

app.get('/', (req, res) => {
	res.send('Hello from Express!')
})

server.listen(3000, () => {
  	console.log('Listening on http://localhost:3000')
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