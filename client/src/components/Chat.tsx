import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import { useState, type ChangeEvent, type FC, type KeyboardEvent } from 'react'
import { DRAWER_WIDTH_IN_PX } from '../consts'
import { useAuth } from '../context/AuthContext'
import { useCreateChat } from '../Hooks/useCreateChat'

interface iStyledContainerProps {
	open?: boolean
}

const StyledContainer = styled('div', {
	shouldForwardProp: (prop) => prop !== 'open'
})<iStyledContainerProps>(
	({ theme, open }) => ({
		alignSelf: 'flex-end',
		height: '100%',
		width: open ? `calc(100% - ${DRAWER_WIDTH_IN_PX}px)` : `calc(100% - ${theme.spacing(8)})`,
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	})
)

interface iProps {
	isDrawerOpen: boolean
}

const Chat: FC<iProps> = ({ isDrawerOpen }) => {
	const [message, setMessage] = useState('')

	const { currentUser } = useAuth()
	const { createChat } = useCreateChat()

	const handleSendClick = () => {
		createChat({
			userId: currentUser?.uid ?? '',
			message
		})
		setMessage('')
	}

	const handleSendEnterKey = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			handleSendClick()
		}
	}
	
	const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value)
	}

	return (
		<StyledContainer open={isDrawerOpen}>
			<h1 style={{ textAlign: 'center', margin: 'auto' }}>
				{`Hello, ${currentUser?.displayName ?? ''}`}
			</h1>
			<TextField
				label={'Ask anything'}
				value={message}
				onChange={handleMessageChange}
				onKeyDown={handleSendEnterKey}
				style={{ width: '50%', alignSelf: 'center' }}
				slotProps={{
					input: { endAdornment: (
						<InputAdornment position='end'>
							<IconButton onClick={handleSendClick}>
								<SendIcon style={{ cursor: 'pointer' }} />
							</IconButton>
						</InputAdornment>
					)}
				}}
			/>
		</StyledContainer>
	)
}

export default Chat