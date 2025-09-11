import { GoogleGenAI, Part } from '@google/genai'
import { iMessage } from '../../entities'

const MODEL_NAME = 'gemini-2.5-flash'

const geminiApiKey = process.env.GEMINI_API_KEY

if (!geminiApiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not set')
    process.exit(1)
}

interface iParsedMessage {
	role: 'user' | 'model'
	parts: Part[]
}

const gemini = new GoogleGenAI({
	apiKey: geminiApiKey
})

const generateResponse = async (
	newMessage: string,
	chatHistory?: iMessage[]
): Promise<string> => {
	const parsedChatHistory = chatHistory?.reduce((prevValue, currValue) => {
		return [
			...prevValue,
			{ role: 'user', parts: [{ text: currValue.content }] } as iParsedMessage,
			{ role: 'model', parts: [{ text: currValue.response }] } as iParsedMessage,
		]
	}, [] as iParsedMessage[])

	const chat = gemini.chats.create({
		model: MODEL_NAME,
		history: parsedChatHistory
	})

	const stream = await chat.sendMessageStream({ message: newMessage })

	for await (const chunk of stream) {
		return chunk.text || ''
	}

	return ''
}

export { generateResponse }