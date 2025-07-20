import logo from "/logo-mouvise.png"
import SearchBar from "../../components/SearchBar/SearchBar"

export default function Home() {
    return (
        <div className="home bg-white flex flex-col gap-10 items-center justify-center lg:justify-start lg:pt-20 min-h-screen max-w-[1280px] mx-auto p-4">
            <img className="w-[600px]" src={logo} alt="logo"></img>
            <SearchBar />
        </div>
    )
}