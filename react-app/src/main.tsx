import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App'
import Home from './pages/Home/Home.js'
import './index.css'
import "./tailwind.css"
import SearchResults from './pages/SearchResults/SearchResults.js'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>	
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/search" element={<SearchResults />} />
		</Routes>
	</BrowserRouter>
)
