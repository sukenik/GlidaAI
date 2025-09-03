import type { JSX } from 'react'
import { Navigate } from 'react-router'
import { SIGN_IN_ROUTE } from '../consts'
import { useAuth } from '../context/AuthContext'

interface iProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: iProps) => {
    const { currentUser } = useAuth()

    return currentUser ? children : <Navigate to={SIGN_IN_ROUTE} />
}

export default PrivateRoute