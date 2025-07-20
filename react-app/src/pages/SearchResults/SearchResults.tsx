import { useSearchParams } from "react-router";
import Content from "../layout/Content/Content";

export default function SearchResults() {
    const [ searchParams ] = useSearchParams()
    console.log(searchParams.has("query"))

    const query = searchParams.get("query")

    return (
        <Content>
            <div className="search-results flex flex-col">
                <span className="search-title">{ query ? "Found 123 results for " + query : "No results found" }</span>
            </div>
        </Content>
    )
}