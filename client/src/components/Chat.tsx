import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import { useState, type ChangeEvent, type FC, type KeyboardEvent } from 'react'
import { useParams } from 'react-router'
import { DRAWER_WIDTH_IN_PX } from '../consts'
import { useAuth } from '../context/AuthContext'
import { useCreateChat } from '../Hooks/useCreateChat'
import { useGetChat } from '../Hooks/useGetChat'
import { useUpdateChat } from '../Hooks/useUpdateChat'

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
	const { updateChat } = useUpdateChat()

	const chatId = useParams().chatId ?? ''

	const chat = useGetChat(chatId)

	const handleSendClick = () => {
		chatId
			? updateChat({
				chatId,
				message
			})
			: createChat({
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

	console.log(chat)

	return (
		<StyledContainer open={isDrawerOpen}>
			{
				chat?.id
					? (
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
							{chat.messages.map(({ content, response }) => (
								<div key={content + response} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<div key={content} style={{ alignSelf: 'flex-start', backgroundColor: '#1976d2', padding: '10px', borderRadius: '10px', maxWidth: '60%', color: 'white' }}>
										{content}
									</div>
									<div key={response}>{response}</div>
								</div>
							))}
						</div>
					)
					: (
						<h1 style={{ textAlign: 'center', margin: 'auto' }}>
							{`Hello, ${currentUser?.displayName ?? ''}`}
						</h1>
					)
			}
			<TextField
				label={'Ask anything'}
				value={message}
				onChange={handleMessageChange}
				onKeyDown={handleSendEnterKey}
				style={{ width: '50%', alignSelf: 'center', marginTop: 'auto' }}
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