import { FieldValue } from "firebase-admin/firestore"

export interface iUser {
    chatIds: string[]
}

export interface iMessage {
	content: string
	response: string
}

export interface iBaseChat {
	id: string
	title: string
	lastUpdate: FieldValue
}

export interface iChat extends iBaseChat {
	messages: iMessage[]
}