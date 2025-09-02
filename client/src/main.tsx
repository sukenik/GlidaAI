import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import { HOME_ROUTE, LOGIN_ROUTE } from './consts.ts'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Failed to find the root element in the DOM.')
}

const root = createRoot(rootElement!)

root.render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path={HOME_ROUTE} element={<PrivateRoute><App /></PrivateRoute>} />
				<Route path={LOGIN_ROUTE} element={<div>{'Auth'}</div>} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
)