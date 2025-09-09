import React, { type CSSProperties, type FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { SIGN_IN_ROUTE } from '../consts'

const MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 1
}

const MODAL_CONTENT_STYLES: CSSProperties = {
    width: 300,
    backgroundColor: '#fff',
    position: 'fixed',
    marginTop: '450px',
    marginLeft: '70px',
    border: '1px solid #000000',
    borderRadius: '10px',
}

const MODAL_TITLE_STYLES: CSSProperties = {
    textAlign: 'center',
    margin: 0,
    fontSize: 20,
    wordWrap: 'break-word',
    padding: '10px 0 0',
    minHeight: '40px'
}

const MODAL_BODY_STYLES: CSSProperties = {
    padding: 10,
    borderTop: '1px solid #000000'
}

const ICON_STYLES: CSSProperties = {
    height: '64px',
    width: '64px',
    borderRadius: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
}

const TEXT_STYLE: CSSProperties = {
    textAlign: 'center',
    opacity: 0.7,
    minHeight: '24px'
}

export const EMAIL_AUTH = 'password'

interface iProps {
    isDrawerOpen: boolean
    closeModal: () => void
}

const UserModal: FC<iProps> = ({ isDrawerOpen, closeModal }) => {
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()

    const displayName = currentUser?.displayName
    
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        closeModal()
    }
    
    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            navigate(SIGN_IN_ROUTE)
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div style={MODAL_STYLES} onClick={handleOutsideClick}>
            <div
                style={isDrawerOpen ? { ...MODAL_CONTENT_STYLES, marginLeft: '250px' } : MODAL_CONTENT_STYLES}
                onClick={handleContentClick}
            >
                {error && <Alert>{error}</Alert>}
                <div style={{ padding: 10 }}>
                    {
                        currentUser?.photoURL
                            ? <img style={ICON_STYLES} src={currentUser.photoURL} alt={'User icon'} />
                            : <AccountCircleOutlinedIcon style={ICON_STYLES} />
                    }
                    <p style={MODAL_TITLE_STYLES}>
                        {displayName ?? currentUser?.email ?? ''}
                    </p>  
                    <p style={TEXT_STYLE}>
                        {displayName ? currentUser?.email : ''}
                    </p>
                </div>
                <div style={MODAL_BODY_STYLES}>
                    <div>
                        <Button onClick={handleLogout}>{'Log Out'}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal