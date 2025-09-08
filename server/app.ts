import express from 'express'
import cors from 'cors'
import { addChat } from './src/schema/chats'
import { addUser } from './src/schema/users'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello from Express!')
})

app.get('/chat/1', async (req, res) => {
	// await addMessage('hU9ZDon376MZCWWdffuk', 'Hello, who are Dreamville?')
	// await addChat('s9036218', 'Your favorite night song?')
	// console.log(await getChatsMetadata(['Pt9RBgGVpUUbw62cdzvM', 'W32iGUGK8WW8NnQRQ82W']))

	res.send('Hi')
})

app.post('/chat', async (req, res) => {
	const { userId, message } = req.body

	await addChat(userId, message)

	res.send('Hi')
})

app.post('/user', async (req, res) => {
	const { userId } = req.body

	await addUser(userId)

	res.send('Hi')
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})