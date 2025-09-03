import {
    createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword,
    signInWithPopup, updateEmail, updatePassword, type User, type UserCredential
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react'
import { auth } from '../Firebase'

interface iAuthContext {
    currentUser: User | null
    signUp: (email: string, password: string) => Promise<UserCredential>
    loading: boolean
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
    updateUserEmail: (email: string) => Promise<void>
    updateUserPassword: (password: string) => Promise<void>
    signWithGoogle: () => Promise<UserCredential>
    signWithGithub: () => Promise<UserCredential>
}
const AuthContext = createContext<iAuthContext | null>(null)

export const useAuth = () => useContext(AuthContext) as iAuthContext

interface iProps {
    children: ReactNode
}

export const AuthProvider: FC<iProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [loading, setLoading] = useState(true)
    
    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signWithGoogle = async () => {
        const provider = new GoogleAuthProvider()

        return await signInWithPopup(auth, provider)
    }

    const signWithGithub = () => {
        const provider = new GithubAuthProvider()

        return signInWithPopup(auth, provider)
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserEmail = (email: string) => {
        return updateEmail(currentUser ?? {} as User, email)
    }

    const updateUserPassword = (password: string) => {
        return updatePassword(currentUser ?? {} as User, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            signUp, 
            loading, 
            login, 
            logout, 
            resetPassword, 
            updateUserEmail, 
            updateUserPassword,
            signWithGoogle,
            signWithGithub,
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}