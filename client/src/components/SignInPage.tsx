import { Visibility, VisibilityOff } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState, type ChangeEvent, type FC } from 'react'
import { useNavigate } from 'react-router'
import GitHubLogo from '../assets/GitHub.png'
import GoogleLogo from '../assets/Google.png'
import { HOME_ROUTE } from '../consts'
import { useAuth } from '../context/AuthContext'
import { useCreateUser } from '../Hooks/useCreateUser'

const StyledBox = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column'
})

const LoginPage: FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [generalError, setGeneralError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
	
    const navigate = useNavigate()

    const { login, signUp, signWithGoogle, signWithGithub } = useAuth()
	const { createUser } = useCreateUser()

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleSignUpClick = () => {
		isSignUp ? setIsSignUp(false) : setIsSignUp(true)
	}

	const handleClickShowPassword = () => {
		setShowPassword(prevState => !prevState)
	}

	const resetErrors = () => {
		setEmailError('')
		setPasswordError('')
		setGeneralError('')
	}
	
	const handleSubmit = async () => {
        if (!email) {
			return setEmailError('Please insert email')
		}
		else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (emailRegex.test(email)) {
				setEmailError('')
			}
			else {
				return setEmailError('Please insert a valid email')
			}
		}
        if (!password) {
			return setPasswordError('Please insert password')
		}
		else {
			if (password.length >= 6) {
				setPasswordError('')
			}
			else {
				return setPasswordError('Password should be at least 6 characters')
			}
		}

        try {
			resetErrors()
            setLoading(true)

			if (isSignUp) {
				const user = await signUp(email, password)

				createUser(user.user.uid)
			}
			else {
				await login(email, password)
			}

            navigate(HOME_ROUTE)
        }
		catch {
            setGeneralError('Failed to sign in')
        }
		finally {
			setLoading(false)
		}
	}

    const handleSignWithGoogle = async () => {
        try {
			resetErrors()
            setLoading(true)

			const user = await signWithGoogle()

			createUser(user.user.uid)

            navigate(HOME_ROUTE)
        }
		catch {
            setGeneralError('Failed to sign in with Google')
        }
		finally {
			setLoading(false)
		}
    }

    const handleSignWithGithub = async () => {
        try {
			resetErrors()
            setLoading(true)

            const user = await signWithGithub()

			createUser(user.user.uid)

            navigate(HOME_ROUTE)
        }
		catch {
            setGeneralError('Failed to sign in with GitHub')
        }
		finally {
			setLoading(false)
		}
    }

  	return (
		<StyledBox>
			<Typography variant={'h4'} gutterBottom>
				{isSignUp ? 'Sign up' : 'Log in'}
			</Typography>
			<Box
				component={'form'}
				sx={{ '& > :not(style)': { m: 1, width: '50%', maxWidth: '400px' } }}
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
			>
				<TextField
					value={email}
					onChange={handleEmailChange}
					label={'Email address'}
					variant={'outlined'}
					error={!!emailError}
					helperText={emailError}
				/>
				<TextField
					value={password}
					type={showPassword ? 'text' : 'password'}
					onChange={handlePasswordChange}
					label={'Password'}
					variant={'outlined'}
					error={!!passwordError}
					helperText={passwordError}
					autoComplete={'on'}
					slotProps={{
						input: { endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={handleClickShowPassword}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						)}
					}}
				/>
				<Button disabled={loading} onClick={handleSubmit} variant={'contained'}>{'Continue'}</Button>
				{
					generalError &&
					<Typography color={'error'}>{generalError}</Typography>
				}
			</Box>
			<Box
				sx={{ '& > :not(style)': { m: 1, width: '50%', maxWidth: '400px' } }}
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
			>
				<Typography variant={'subtitle1'} gutterBottom style={{ display: 'flex', gap: '5px' }}>
					{isSignUp ? 'Back to ' : `Don't have an account? `}
					<div onClick={handleSignUpClick} style={{ color: '#1976d2', cursor: 'pointer' }}>
						{isSignUp ? 'Login' : 'Sign Up'}
					</div>
				</Typography>
				<Divider>{'OR'}</Divider>
				<Button
					disabled={loading}
					onClick={handleSignWithGoogle}
					variant={'outlined'}
					style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}
				>
					<img src={GoogleLogo} alt={'Google icon'} style={{ height: '18px', width: '18px' }} />
					<div style={{ marginTop: '3px' }}>{'Continue with Google'}</div>
				</Button>
				<Button
					disabled={loading}
					onClick={handleSignWithGithub}
					variant={'outlined'}
					style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}
				>
					<img src={GitHubLogo} alt={'Github icon'} style={{ height: '18px', width: '18px' }} />
					<div style={{ marginTop: '3px' }}>{'Continue with GitHub'}</div>
				</Button>
			</Box>
		</StyledBox>
	)
}

export default LoginPage