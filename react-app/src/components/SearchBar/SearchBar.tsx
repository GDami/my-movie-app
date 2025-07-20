

export default function SearchBar() {
    return (
        <form id="search-form" action="/search" className="w-full max-w-[600px]">
            <input
            name="query"
            className="searchbar px-4 h-10 border-2 rounded-lg w-full border-gray-400 focus:border-inherit focus:outline-0 transition-[border-color]"
            placeholder="Search a movie, tv show, anime..."
            ></input>
        </form>
    )
}