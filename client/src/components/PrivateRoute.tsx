import type { JSX } from 'react'
import { Navigate } from 'react-router'
import { LOGIN_ROUTE } from '../consts'

interface iProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: iProps) => {
    // const { currentUser } = useAuth()

    return false ? children : <Navigate to={LOGIN_ROUTE} />
}

export default PrivateRoute