import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { FC } from 'react'
import { Link } from 'react-router'
import { SIGN_UP_ROUTE } from '../consts'
import Divider from '@mui/material/Divider'
import GoogleLogo from '../assets/Google.png'

const StyledBox = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column'
})

const LoginPage: FC = () => {

  	return (
		<StyledBox>
			<Typography variant={'h4'} gutterBottom>
				{'Welcome'}
			</Typography>
			<Box
				component={'form'}
				sx={{ '& > :not(style)': { m: 1, width: '50%', maxWidth: '400px' } }}
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
				// noValidate
				// autoComplete={'off'}
			>
				<TextField id={'outlined-basic'} label={'Email address'} variant={'outlined'} />
				<Button variant={'contained'}>{'Continue'}</Button>
			</Box>
			<Box
				sx={{ '& > :not(style)': { m: 1, width: '50%', maxWidth: '400px' } }}
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
			>
				<Typography variant={'subtitle1'} gutterBottom>
					{`Don't have an account? `}
					<Link to={SIGN_UP_ROUTE}>{'Sign Up'}</Link>
				</Typography>
				<Divider>{'OR'}</Divider>
				<Button variant={'outlined'} style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
					<img src={GoogleLogo} alt={'Google icon'} style={{ height: '18px', width: '18px' }} />
					<div style={{ marginTop: '3px' }}>{'Continue with Google'}</div>
				</Button>
			</Box>
		</StyledBox>
	)
}

export default LoginPage