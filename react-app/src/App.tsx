import './App.css'
import { Route, Routes } from 'react-router'
import SearchResults from './pages/SearchResults/SearchResults'
import Home from './pages/Home/Home'
import { useEffect } from 'react'
import APICaller from './singletons/APICaller'


function App() {
	return (
    	<div className='app bg-darkblue'>
		    <Routes>
        		<Route path="/search" element={<SearchResults />} />
          		<Route path="/" element={<Home />} />
		    	</Routes>
    	</div>
	)
}

export default App
