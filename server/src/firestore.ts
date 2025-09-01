import * as dotenv from 'dotenv'
import { cert, initializeApp } from 'firebase-admin/app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

dotenv.config()

const serviceAccountJson = process.env.GCP_CREDENTIALS

if (!serviceAccountJson) {
    console.error('Error: GCP_CREDENTIALS environment variable is not set')
    process.exit(1)
}

try {
    initializeApp({
        credential: cert(JSON.parse(serviceAccountJson))
    })

    console.log('Firebase initialized successfully')
} catch (error) {
    console.error('Error initializing Firebase:', error)
    process.exit(1)
}

const db: Firestore = getFirestore()

export default db