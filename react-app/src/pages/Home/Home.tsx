import logo from "/logo-mouvise-white-transparent.png"
import tmdbLogo from "/tmdb-white.svg"
import SearchBar from "../../components/SearchBar/SearchBar"

export default function Home() {
    return (
        <div className="home flex flex-col gap-10 items-center justify-center lg:justify-start lg:pt-20 min-h-screen max-w-[1280px] mx-auto p-4">
            <div className="relative w-[600px]">
                <img className="" src={logo} alt="logo"></img>
                <img className="absolute w-1/3 bottom-0 right-0" src={tmdbLogo} alt="tmdb-logo"></img>
            </div>
            <SearchBar />
        </div>
    )
}