import List from '@mui/material/List'
import { type FC } from 'react'
import { type iBaseChat } from '../../../entities'
import ChatItem from './ChatItem'
import { useParams } from 'react-router'
import { useAuth } from '../context/AuthContext'

interface iProps {
	chats: iBaseChat[]
}

const ChatList: FC<iProps> = ({ chats }) => {
	const openChatId = useParams().chatId
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