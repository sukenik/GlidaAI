import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import type { FC } from 'react'
import { type iBaseChat } from '../../../entities'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

interface iProps {
	chats: iBaseChat[]
}

const ChatList: FC<iProps> = ({ chats }) => {
	return (
		<>
			<div style={{ padding: '8px 20px 0', fontSize: '18px' }}>
				{'Chats'}
			</div>
			<List>
				{chats.map(({ title }) => (
					<ListItem key={title} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={[
								{
									minHeight: 48,
									px: 2.5
								},
								{ justifyContent: 'initial' }
							]}
						>
							<ListItemText primary={title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default ChatList