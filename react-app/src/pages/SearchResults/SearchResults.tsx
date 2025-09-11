import { useSearchParams } from "react-router";
import Content from "../layout/Content/Content";
import SearchResult from "./SearchResult";
import APICaller, { type Category } from "../../singletons/APICaller";
import { useEffect, useState } from "react";

const categories: Category[] = ["movies", "shows", "people"]

type MovieItem = {
    title: string,
    date: string,
    description: string,
    id: number,
    imageUrl: string
}

type Entries = { nb: number, items: MovieItem[]}

type ResultList = {
    movies: Entries,
    shows: Entries,
    people: Entries,
}

const emptyList:ResultList = { movies: { nb: 0, items: [] }, shows: { nb: 0, items: [] }, people: { nb: 0, items: [] } }

const createMovieItem = (responseItem: any) => {
    const url = selectUrl(responseItem)
    const item:MovieItem = {
        title: responseItem.title,
        date: responseItem.release_date,
        description: responseItem.overview,
        id: responseItem.id,
        imageUrl: url
    }

    return item
}

const createShowItem = (responseItem: any) => {
    const url = selectUrl(responseItem)
    const item:MovieItem = {
        title: responseItem.name,
        date: responseItem.first_air_date,
        description: responseItem.overview,
        id: responseItem.id,
        imageUrl: url
    }

    return item
}

const selectUrl = (responseItem: any) => {
    let url = ""
    if (responseItem.hasOwnProperty("poster")) url = responseItem.poster
    else if (responseItem.hasOwnProperty("backdrop")) url = responseItem.backdrop
    return url
}

const apiCaller = APICaller.getInstance()

export default function SearchResults() {

    const [ results, setResults ] = useState<ResultList>(emptyList)

    const [ currentTab, setCurrentTab ] = useState(0)
    
    const [ searchParams ] = useSearchParams()

    const onClickCategory = (index:number) => {
        setCurrentTab(index)
    }

    const query = searchParams.get("query")

    async function fetchAndSet() {
        console.log("querying")
        const newData: ResultList = structuredClone(emptyList)

        for (const category of categories) {
            const response = await apiCaller.search(category, query)
            newData[category].nb = response.total_results
            newData[category].items = []
            for (const result of response.results) {
                switch (category) {
                    case "movies":
                        newData[category].items.push(createMovieItem(result))
                        break
                    case "shows":
                        newData[category].items.push(createShowItem(result))
                        break
                }
            }
        }
        setResults(newData)
    }

    useEffect(() => {
        setResults(emptyList)
        fetchAndSet()
    }, [ searchParams ])
    
    console.log("render")

    return (
        <Content>
            <div className="search-results flex flex-col gap-9">
                <h1 className="search-title">{'Search results for "' + query + '"'}</h1>
                <div className="results-display flex flex-col gap-8">
                    <ul className="flex inset-shadow-[0_-0.25px_gray]">
                        {categories.map((category, index) => <li key={index} className={"px-2 cursor-pointer transition-colors border-b " + (index == currentTab ? "border-b-black" : "border-b-transparent text-gray-600 hover:text-black")} onClick={() => onClickCategory(index)}>{`${category} (${results[category].nb}${results[category].nb == 10000 ? "+" : ""})`}</li>)}
                    </ul>
                    <ul className="results-list grid grid-cols-2 gap-4">
                        {results[categories[currentTab]].items.map((result, index) => <SearchResult key={index} title={result.title} description={result.description} imageUrl={result.imageUrl ? result.imageUrl : null} />)}
                    </ul>
                </div>
            </div>
        </Content>
    )
}