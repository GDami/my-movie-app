import { Link } from "react-router";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
    return (
        <header className="header h-20">
            <div className="header-inside h-full max-w-7xl mx-auto flex items-center gap-10 px-10">
                <Link className="text-white chewy text-4xl" to="/">mouvise</Link>
                <SearchBar />
            </div>
        </header>
    )
}