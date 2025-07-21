import { useSearchParams } from "react-router";
import Content from "../layout/Content/Content";
import SearchResult from "./SearchResult";


const mockList = [
    {
        title: "Superman",
        description: "Superhero movie"
    },
    {
        title: "Kick-Ass",
        description: "Superhero movie"
    },
]

export default function SearchResults() {
    const [ searchParams ] = useSearchParams()

    const query = searchParams.get("query")

    return (
        <Content>
            <div className="search-results flex flex-col gap-4">
                <span className="search-title">{'Search results for "' + query + '"'}</span>
                <div className="results-display flex flex-col gap-8 border">
                    <ul className="category-list border border-black h-10">
                        Categories
                    </ul>
                    <ul className="results-list flex flex-col gap-4">
                        {mockList.map((result) => <SearchResult title={result.title} description={result.description} />)}
                    </ul>
                </div>
            </div>
        </Content>
    )
}