import { useNavigate } from "react-router"


export default function SearchBar() {
const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        console.log()
        navigate("/search?query=" + e.target.firstChild.value)
    }

    return (
        <form id="search-form" onSubmit={onSubmit} className="w-full max-w-[600px]">
            <input
            name="query"
            className="searchbar px-4 h-10 border-2 rounded-lg w-full bg-gray-100 text-black border-gray-400 focus:border-(--color-accent) focus:outline-0 transition-[border-color]"
            placeholder="Search a movie, tv show, anime..."
            ></input>
        </form>
    )
}