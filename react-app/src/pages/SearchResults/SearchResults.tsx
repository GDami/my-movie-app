import { useSearchParams } from "react-router";
import Content from "../layout/Content/Content";
import SearchResult from "./SearchResult";
import APICaller, { type Category } from "../../singletons/APICaller";
import { useEffect, useState } from "react";

const categories: Category[] = ["movies", "shows", "people"]

type Result = {
    title: string,
    date: string,
    description: string,
    id: number
}

type ResultList = {
    movies: Result[],
    shows: Result[],
    people: Result[],
    nbMovies: number,
    nbShows: number,
    nbPeople: number
}

export default function SearchResults() {
    
    const [ searchParams ] = useSearchParams()

    useEffect(() => {
        for (const category of categories) {
            apiCaller.search(category, query)
            .then((result) => {
                console.log(result.results)
                console.log(result)
            })
            
        }        
    }, [searchParams])

    const [ results, setResults ] = useState<ResultList>(
        { movies: [], shows: [], people: [], nbMovies: 0, nbShows: 0, nbPeople: 0 }
    )

    const apiCaller = APICaller.getInstance()

    const query = searchParams.get("query")
    
    console.log(results)

    return (
        <Content>
            <div className="search-results flex flex-col gap-9">
                <h1 className="search-title">{'Search results for "' + query + '"'}</h1>
                <div className="results-display flex flex-col gap-8">
                    <ul className="flex border-b border-b-gray-300">
                        {categories.map((category, index) => <li key={index} className={"px-2 " + (index == 0 ? "border-b border-b-black" : " text-gray-600")}>{category}</li>)}
                    </ul>
                    <ul className="results-list grid grid-cols-2 gap-4">
                        {results.movies.map((result, index) => <SearchResult key={index} title={result.title} description={result.description} />)}
                    </ul>
                </div>
            </div>
        </Content>
    )
}