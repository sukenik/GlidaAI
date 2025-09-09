import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import LoginPage from './components/SignInPage.tsx'
import { CHAT_ROUTE, HOME_ROUTE, SIGN_IN_ROUTE } from './consts.ts'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Failed to find the root element in the DOM.')
}

const root = createRoot(rootElement!)
const queryClient = new QueryClient()

root.render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path={SIGN_IN_ROUTE} element={<LoginPage />} />
						<Route path={HOME_ROUTE} element={<PrivateRoute><App /></PrivateRoute>} />
						<Route path={CHAT_ROUTE} element={<PrivateRoute><App /></PrivateRoute>} />
					</Routes>
				</BrowserRouter>
			</StrictMode>
		</AuthProvider>
	</QueryClientProvider>
)