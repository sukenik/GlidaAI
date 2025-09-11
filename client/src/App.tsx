import { useEffect, useState, type FC } from 'react'
import { socket } from './socket'
import Chat from './components/Chat'
import Drawer from './components/Drawer'
import UserModal from './components/UserModal'

const App: FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)

	useEffect(() => {
		socket.on('createChat', (message: string) => {
			console.log('new message', message)
		})

		return () => {
			socket.off('createChat')
		}
	}, [])

	const handleDrawerToggle = () => {
		setIsDrawerOpen(prevState => !prevState)
	}

    const handleUserModalToggle = () => {
        setShowUserModal(prevState => !prevState)
    }

	return (
		<div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
			<Drawer isOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} handleUserModalToggle={handleUserModalToggle} />
			<Chat isDrawerOpen={isDrawerOpen} />
            {showUserModal && <UserModal isDrawerOpen={isDrawerOpen} closeModal={handleUserModalToggle} />}
		</div>
	)
}

export default App