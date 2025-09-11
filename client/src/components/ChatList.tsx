import List from '@mui/material/List'
import { type FC } from 'react'
import { type iBaseChat } from '../../../entities'
import { useAuth } from '../context/AuthContext'
import ChatItem from './ChatItem'

interface iProps {
	chats: iBaseChat[]
	openChatId: string | undefined
}

const ChatList: FC<iProps> = ({ chats, openChatId }) => {
	const userId = useAuth().currentUser?.uid || ''

	return (
		<>
			<div style={{ padding: '8px 20px 0', fontSize: '18px' }}>
				{'Chats'}
			</div>
			<List>
				{chats.map(({ title, id }) => (
					<ChatItem
						key={id}
						id={id}
						title={title}
						openChatId={openChatId}
						userId={userId}
						chatId={id}
					/>
				))}
			</List>
		</>
	)
}

export default ChatList