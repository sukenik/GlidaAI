import { GoogleGenAI } from '@google/genai'

const MODEL_NAME = 'gemini-2.5-flash'

const geminiApiKey = process.env.GEMINI_API_KEY

if (!geminiApiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not set')
    process.exit(1)
}

const gemini = new GoogleGenAI({
	apiKey: geminiApiKey
})

const generateResponse = async (content: string): Promise<string> => {
	const response = await gemini.models.generateContent({
		model: MODEL_NAME,
		contents: content
	})

	return response.text || ''
}

export { generateResponse }