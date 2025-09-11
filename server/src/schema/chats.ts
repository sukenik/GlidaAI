import { FieldPath, FieldValue } from 'firebase-admin/firestore'
import { iBaseChat, iChat, iMessage } from '../../../entities'
import db from '../firestore'
import { generateResponse } from '../gemini'
import { USERS_COLLECTION } from './users'

const CHATS_COLLECTION = 'chats'
const MESSAGES_COLLECTION = 'messages'

async function getChatsMetadata(chatIds: string[]): Promise<iBaseChat[]> {
	if (chatIds.length === 0) {
		console.log('No chat IDs provided')
		return []
	}

    try {
        const snapshot = await db.collection(CHATS_COLLECTION).where(FieldPath.documentId(), 'in', chatIds).get()

		const chats: iBaseChat[] = []

		snapshot.forEach(doc => {
			const data = doc.data() as iBaseChat

			chats.push({
				id: doc.id,
				title: data.title,
				lastUpdate: data.lastUpdate
			})
		})

		return chats
    } catch (error) {
        console.error('Error query chats: ', error)
    }

	return []
}

async function addChat(userId: string, content: string): Promise<iChat> {
	let newChat: iChat = {
		id: '',
		title: '',
		lastUpdate: `${FieldValue.serverTimestamp()}`,
		messages: []
	}

    try {
		const response = await generateResponse(content)
        const title = await generateResponse(`
			Can u plz give me a subject for this message: "${content}"
			Plz answer me only one subject by the message language
		`)

        const chatRef = await db.collection(CHATS_COLLECTION).add({
			title,
			lastUpdate: `${FieldValue.serverTimestamp()}`
		})

		const messagesRef = chatRef.collection(MESSAGES_COLLECTION)
		await messagesRef.doc().set({
			content,
			response
		})

		db.collection(USERS_COLLECTION).doc(userId).update({
			chatIds: FieldValue.arrayUnion(chatRef.id)
		})

        console.log('Chat successfully saved!')

		return newChat = {
			id: chatRef.id,
			title,
			lastUpdate: `${FieldValue.serverTimestamp()}`,
			messages: [{ content, response }]
		}
    }
	catch (error) {
        console.error('Error adding chat: ', error)
    }
	finally {
		return newChat
	}
}

async function getChat(chatId: string): Promise<iChat | null> {
    try {
        const chatSnapshot = await db.collection(CHATS_COLLECTION).doc(chatId).get()

		if (!chatSnapshot.exists) {
			console.log('No such chat!')
			return null
		}

		const chatData = chatSnapshot.data() as iBaseChat

		const messagesSnapshot = await chatSnapshot.ref.collection(MESSAGES_COLLECTION).get()
		const messages = messagesSnapshot.docs.map(doc => doc.data() as iMessage)

		return {
			...chatData,
			id: chatSnapshot.id,
			messages
		}
    } catch (error) {
        console.error('Error query chat: ', error)
    }

	return null
}

async function addMessage(chatId: string, content: string): Promise<void> {
    try {
        const chatRef = db.collection(CHATS_COLLECTION).doc(chatId)
		const messagesRef = chatRef.collection(MESSAGES_COLLECTION)

		const messagesSnapshot = await messagesRef.get()
		const messages = messagesSnapshot.docs.map(doc => doc.data() as iMessage)

        const response = await generateResponse(content, messages)

        await messagesRef.add({
            content,
            response
        } as iMessage)

        console.log('Message successfully saved!')
    } catch (error) {
        console.error('Error adding message: ', error)
    }
}

export {
	addChat, getChatsMetadata, getChat, addMessage
}