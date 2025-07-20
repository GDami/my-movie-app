import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
    return (
        <header className="header h-15 bg-black text-white flex items-center gap-10 px-10">
            <a className="chewy text-4xl" href="/">mouvies</a>
            <SearchBar />
        </header>
    )
}