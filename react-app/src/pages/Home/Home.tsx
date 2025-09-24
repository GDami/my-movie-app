import logo from "/logo-mouvise-white-transparent.png"
import tmdbLogo from "/tmdb-white.svg"
import SearchBar from "../../components/SearchBar/SearchBar"

export default function Home() {
    return (
        <div className="home flex flex-col gap-10 items-center justify-center min-h-screen max-w-[600px] mx-auto p-4">
            <div className="relative">
                <img className="" src={logo} alt="logo"></img>
                <img className="absolute w-1/4 bottom-0 right-0" src={tmdbLogo} alt="tmdb-logo"></img>
            </div>
            <SearchBar />
        </div>
    )
}