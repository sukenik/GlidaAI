import MoreVertIcon from '@mui/icons-material/MoreVert'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useState, type FC, type MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import { type iBaseChat } from '../../../entities'
import Tooltip from '@mui/material/Tooltip'

interface iProps {
	chats: iBaseChat[]
}

const ChatList: FC<iProps> = ({ chats }) => {
	const [hoverItemId, setHoverItemId] = useState('')

	const navigate = useNavigate()
	const chatId = useParams().chatId

	const handleChatClick = (e: MouseEvent<HTMLDivElement>) => {
		navigate(`/chat/${e.currentTarget.id}`)
	}

	const handleMouseHover = (e: MouseEvent<HTMLLIElement>) => {
		setHoverItemId(e.currentTarget.id)
	}

	return (
		<>
			<div style={{ padding: '8px 20px 0', fontSize: '18px' }}>
				{'Chats'}
			</div>
			<List>
				{chats.map(({ title, id }) => (
					<ListItem
						disablePadding
						id={id}
						key={id}
						onMouseEnter={handleMouseHover}
						sx={{ display: 'block' }}
					>
						<Tooltip title={title} placement={'right'} arrow>
							<ListItemButton
								id={id}
								onClick={handleChatClick}
								sx={[
									{
										minHeight: 48,
										px: 2.5
									},
									{ justifyContent: 'initial' },
									chatId === id && { backgroundColor: 'action.selected', ":hover": { backgroundColor: 'action.selected' } }
								]}
							>
								<ListItemText primary={title} />
								{hoverItemId === id && <MoreVertIcon />}
							</ListItemButton>
						</Tooltip>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default ChatList