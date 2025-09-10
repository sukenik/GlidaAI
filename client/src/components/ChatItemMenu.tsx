import type { FC } from 'react'
import Popover from '@mui/material/Popover'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useDeleteChat } from '../Hooks/useDeleteChat'

interface iProps {
	handleClose: () => void
	anchorEl: HTMLDivElement | null
	userId: string
	chatId: string
}

const ChatItemMenu: FC<iProps> = ({ handleClose, anchorEl, userId, chatId }) => {
	const isItemMenuOpen = Boolean(anchorEl)
	const popoverId = isItemMenuOpen ? 'simple-popover' : undefined

	const { deleteChat } = useDeleteChat()

	const handleDeleteClick = () => {
		deleteChat({ chatId, userId  })
	}

	return (
		<Popover
			id={popoverId}
			open={isItemMenuOpen}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
		>
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={handleDeleteClick} style={{ gap: '10px' }}>
						<DeleteIcon />
						<ListItemText style={{ paddingRight: '10px' }}>{'Delete'}</ListItemText>
					</ListItemButton>
				</ListItem>
			</List>
		</Popover>
	)
}

export default ChatItemMenu