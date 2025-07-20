import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router'
import App from './App'
import './index.css'
import "./tailwind.css"

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>
)
