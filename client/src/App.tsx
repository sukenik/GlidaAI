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
import { useState } from 'react'
import UserModal from './components/UserModal'
import { useAuth } from './context/AuthContext'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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
  shouldForwardProp: (prop) => prop !== 'open',
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
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
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

export default function MiniDrawer() {
	const [open, setOpen] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)

  	const theme = useTheme()
	const { currentUser } = useAuth()

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

    const handleCloseUserModal = () => {
        setShowUserModal(false)
    }

    const handleToggleUserModal = () => {
        setShowUserModal(prevState => !prevState)
    }

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position='fixed' open={open}>
					<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={[
						{
							marginRight: 5,
						},
						open && { display: 'none' },
						]}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						{'Glida AI'}
					</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant='permanent' open={open}>
					<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
					</DrawerHeader>
					<Divider />
					<ListItem key={'new-chat'} disablePadding sx={{ display: 'block', marginBottom: 'auto' }}>
						<ListItemButton
							onClick={handleToggleUserModal}
							sx={[
								{
									minHeight: 48,
									px: 2.5,
								},
								open
									? { justifyContent: 'initial' }
									: { justifyContent: 'center' }
							]}
						>
							<ListItemIcon sx={[
								{
									minWidth: 0,
									justifyContent: 'center',
								},
								open
									? { mr: 3 }
									: { mr: 'auto' }
							]}>
								<AddBoxOutlinedIcon />
							</ListItemIcon>
							{
								open && <ListItemText primary={'New Chat'} />
							}
						</ListItemButton>
					</ListItem>
					<ListItem key={'profile'} disablePadding sx={{ display: 'block', marginTop: 'auto' }}>
						<ListItemButton
							onClick={handleToggleUserModal}
							sx={[
								{
									minHeight: 48,
									px: 2.5,
								},
								open
									? { justifyContent: 'initial' }
									: { justifyContent: 'center' }
							]}
						>
							<ListItemIcon sx={[
								{
									minWidth: 0,
									justifyContent: 'center',
								},
								open
									? { mr: 3 }
									: { mr: 'auto' }
							]}>
								<AccountCircleOutlinedIcon />
							</ListItemIcon>
							{
								open && <ListItemText primary={currentUser?.displayName ?? currentUser?.email} />
							}
						</ListItemButton>
					</ListItem>
				</Drawer>
				<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
				</Box>
			</Box>
            {showUserModal && <UserModal open={open} closeModal={handleCloseUserModal} />}
		</>
	)
}