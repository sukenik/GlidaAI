import { DocumentReference, FieldPath, FieldValue } from 'firebase-admin/firestore'
import { iUser } from '../../../entities'
import db from '../firestore'

export const USERS_COLLECTION = 'users'

async function addUser(userId: string): Promise<void> {
    try {
        const docRef: DocumentReference = db.collection(USERS_COLLECTION).doc(userId)

        const newUser: iUser = {
			chatIds: []
        }

        await docRef.set(newUser)

        console.log('User successfully saved!')
    } catch (error) {
        console.error('Error adding user: ', error)
    }
}


async function getChatIdsByUserId(userId: string): Promise<string[]> {
    try {
        const snapshot = await db.collection(USERS_COLLECTION).doc(userId).get()

        if (!snapshot.exists) {
            console.log('No such user!')
            return []
        }

        const userData = snapshot.data() as iUser

        return userData.chatIds
    } catch (error) {
        console.error('Error query chats: ', error)
    }

	return []
}

export { addUser, getChatIdsByUserId }