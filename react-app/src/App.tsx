import './App.css'
import { Route, Routes } from 'react-router'
import SearchResults from './pages/SearchResults/SearchResults'
import Home from './pages/Home/Home'
import { useEffect } from 'react'
import APICaller from './singletons/APICaller'
import MovieDetails from './pages/Movie/MovieDetails'


function App() {
    useEffect(() => {APICaller.getInstance()})

	return (
    	<div className='app bg-darkblue leading-[1.4]'>
		    <Routes>
        		<Route path="/search" element={<SearchResults />} />
        		<Route path="/movies/:movieId" element={<MovieDetails />} />
          		<Route path="/" element={<Home />} />
            </Routes>
    	</div>
	)
}

export default App
