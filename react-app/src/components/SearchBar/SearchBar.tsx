import { useNavigate } from "react-router"


export default function SearchBar() {
const navigate = useNavigate()

    const onSubmit = (e: any) => {
        e.preventDefault()
        console.log()
        navigate("/search?query=" + e.target.firstChild.value)
    }

    return (
        <form id="search-form" onSubmit={onSubmit} className="flex w-full max-w-[600px]">
            <input
            name="query"
            className="searchbar bg-white px-4 h-10 rounded-l-xl w-full border-r-0 border-2 border-white border-r-mouvise focus:border-mouvise focus:outline-0 transition-colors"
            placeholder="Search a movie, tv show, anime..."
            ></input>
            <button className="min-w-10 rounded-r-xl flex justify-center items-center bg-mouvise cursor-pointer" type="submit"><i className='text-darkblue bxr  bx-search'  ></i> </button>
        </form>
    )
}