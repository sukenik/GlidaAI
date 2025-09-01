import { DocumentReference } from 'firebase-admin/firestore'
import { iUser } from '../entities'
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

export { addUser }