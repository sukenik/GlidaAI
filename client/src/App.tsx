import { useState, type FC } from 'react'
import Chat from './components/Chat'
import Drawer from './components/Drawer'
import UserModal from './components/UserModal'

const App: FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)

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