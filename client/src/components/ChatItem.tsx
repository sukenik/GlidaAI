import MoreVertIcon from '@mui/icons-material/MoreVert'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { useState, type FC, type MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import ChatItemMenu from './ChatItemMenu'

interface iProps {
	id: string
	title: string
	userId: string
	chatId: string
	openChatId?: string
}

const ChatItem: FC<iProps> = ({ id, title, openChatId, userId, chatId }) => {
  	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  	const [isHover, setIsHover] = useState(false)

	const navigate = useNavigate()


	const handleChatClick = (e: MouseEvent<HTMLDivElement>) => {
		navigate(`/chat/${e.currentTarget.id}`)
	}

	const handleMouseEnter = () => {
		setIsHover(true)
	}

	const handleMouseLeave = () => {
		setIsHover(false)
	}

	const handleMoreClick = (e: MouseEvent<HTMLDivElement>) => {
		setAnchorEl(e.currentTarget)
	}

	const handleItemMenuClose = () => {
		setAnchorEl(null)
	}

	return (
		<ListItem
			disablePadding
			id={id}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
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
						openChatId === id && { backgroundColor: 'action.selected', ':hover': { backgroundColor: 'action.selected' } }
					]}
				>
					<ListItemText>
						<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
							{title}
						</div>
					</ListItemText>
					{
						isHover &&
						<ListItemIcon id={id} onClick={handleMoreClick} style={{ justifyContent: 'flex-end', minWidth: '28px' }}>
							<MoreVertIcon />
						</ListItemIcon>
					}
				</ListItemButton>
			</Tooltip>
			<ChatItemMenu
				handleClose={handleItemMenuClose}
				anchorEl={anchorEl}
				userId={userId}
				chatId={chatId}
			/>
		</ListItem>
	)
}

export default ChatItem