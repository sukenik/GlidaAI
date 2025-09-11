import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme, type CSSObject, type Theme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { type FC } from 'react'
import { useNavigate, useParams } from 'react-router'
import { APP_NAME, DRAWER_WIDTH_IN_PX, HOME_ROUTE } from '../consts'
import { useAuth } from '../context/AuthContext'
import { useGetChatsMetadata } from '../Hooks/useGetChatsMetadata'
import ChatList from './ChatList'
import iceCream from '/ice-cream.png'
import Tooltip from '@mui/material/Tooltip'

const openedMixin = (theme: Theme): CSSObject => ({
	width: DRAWER_WIDTH_IN_PX,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  	shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				marginLeft: DRAWER_WIDTH_IN_PX,
				width: `calc(100% - ${DRAWER_WIDTH_IN_PX}px)`,
				transition: theme.transitions.create(['width', 'margin'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}))

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme }) => ({
		width: DRAWER_WIDTH_IN_PX,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		variants: [
			{
				props: ({ open }) => open,
				style: {
					...openedMixin(theme),
					'& .MuiDrawer-paper': openedMixin(theme),
				},
			},
			{
				props: ({ open }) => !open,
				style: {
					...closedMixin(theme),
					'& .MuiDrawer-paper': closedMixin(theme),
				},
			},
		],
	}),
)

interface iProps {
	isOpen: boolean
	handleDrawerToggle: () => void
	handleUserModalToggle: () => void
}

const Drawer: FC<iProps> = ({ isOpen, handleDrawerToggle, handleUserModalToggle }) => {
	const theme = useTheme()
	const { currentUser } = useAuth()
	const navigate = useNavigate()
	const openChatId = useParams().chatId

	const chats = useGetChatsMetadata(currentUser?.uid ?? '')

	const handleNewChatClick = () => {
		navigate(HOME_ROUTE)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={isOpen}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerToggle}
						edge='start'
						sx={[
							{ marginRight: '18px' },
							isOpen && { display: 'none' },
						]}
					>
						<MenuIcon />
					</IconButton>
					<img src={iceCream} alt={`${APP_NAME} icon`} style={{ height: '48px', width: '48px' }} />
					<Typography variant='h6' noWrap component='div'>
						{APP_NAME}
					</Typography>
				</Toolbar>
			</AppBar>
			<StyledDrawer variant='permanent' open={isOpen}>
				<DrawerHeader>
				<IconButton onClick={handleDrawerToggle}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
				</DrawerHeader>
				<Divider />
				<ListItem key={'new-chat'} disablePadding sx={{ display: 'block' }}>
					<Tooltip title={'New chat'} placement={'right'} arrow>
						<ListItemButton
							onClick={handleNewChatClick}
							sx={[
								{
									minHeight: 48,
									px: 2.5,
								},
								isOpen
									? { justifyContent: 'initial' }
									: { justifyContent: 'center' },
								!openChatId && {
									backgroundColor: 'action.selected',
									':hover': { backgroundColor: 'action.selected' }
								}
							]}
						>
							<ListItemIcon sx={[
								{
									minWidth: 0,
									justifyContent: 'center',
								},
								isOpen
									? { mr: 3 }
									: { mr: 'auto' }
							]}>
								<AddBoxOutlinedIcon />
							</ListItemIcon>
							{
								isOpen && <ListItemText primary={'New Chat'} />
							}
						</ListItemButton>
					</Tooltip>
				</ListItem>
				<Divider />
				{
					isOpen &&
					<ChatList chats={chats} openChatId={openChatId} />
				}
				<Divider style={{ marginTop: 'auto' }} />
				<ListItem key={'profile'} disablePadding sx={{ display: 'block' }}>
					<ListItemButton
						onClick={handleUserModalToggle}
						sx={[
							{
								minHeight: 48,
								px: 2.5,
							},
							isOpen
								? { justifyContent: 'initial' }
								: { justifyContent: 'center' }
						]}
					>
						<ListItemIcon sx={[
							{
								minWidth: 0,
								justifyContent: 'center',
							},
							isOpen
								? { mr: 3 }
								: { mr: 'auto' }
						]}>
							<AccountCircleOutlinedIcon />
						</ListItemIcon>
						{
							isOpen && <ListItemText primary={currentUser?.displayName ?? currentUser?.email} />
						}
					</ListItemButton>
				</ListItem>
			</StyledDrawer>
			<Box component='main' sx={{ flexGrow: 1 }}>
				<DrawerHeader />
			</Box>
		</Box>
	)
}

export default Drawer