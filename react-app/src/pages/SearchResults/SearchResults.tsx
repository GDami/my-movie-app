import { useLocation, useSearchParams } from "react-router";
import Content from "../layout/Content/Content";
import MovieResult from "./MovieResult";
import APICaller, { type Category } from "../../singletons/APICaller";
import { useEffect, useState } from "react";
import type { BreadcrumbEntry } from "../../components/Breadcrumbs/Breadcrumbs";
import PersonResult from "./PersonResult";

const categories: Category[] = ["movies", "shows", "people"]

type MovieItem = {
    title: string,
    date: string,
    description: string,
    id: number,
    imageUrl: string
}

type PersonItem = {
    name: string,
    knownForDepartment: string,
    knownFor: string[],
    id: number,
    imageUrl: string
}

type MovieEntries = { nb: number, items: MovieItem[]}
type PersonEntries = { nb: number, items: PersonItem[]}

type ResultList = {
    movies: MovieEntries,
    shows: MovieEntries,
    people: PersonEntries,
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

const createPersonItem = (responseItem: any) => {
    const url = selectUrl(responseItem)
    const item:PersonItem = {
        name: responseItem.name,
        knownForDepartment: responseItem.known_for_department,
        knownFor: responseItem.known_for.map((value: any) => value.title),
        id: responseItem.id,
        imageUrl: url
    }

    return item
}

const selectUrl = (responseItem: any) => {
    let url = ""
    if (responseItem.hasOwnProperty("poster")) url = responseItem.poster
    else if (responseItem.hasOwnProperty("backdrop")) url = responseItem.backdrop
    else if (responseItem.hasOwnProperty("profile")) url = responseItem.profile
    return url
}

const apiCaller = APICaller.getInstance()

export default function SearchResults() {

    const [ results, setResults ] = useState<ResultList>(emptyList)

    const [ currentTab, setCurrentTab ] = useState(0)
    
    const [ searchParams ] = useSearchParams()
    const location = useLocation()

    const onClickCategory = (index:number) => {
        setCurrentTab(index)
    }

    const query = searchParams.get("query")

    const title = `Search results for "${query}"`
    const link = `${location.pathname}?query=${query}`
    const crumbs: BreadcrumbEntry[] = [{ link, display: title }]

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
                    case "people":
                        newData[category].items.push(createPersonItem(result))
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
        <Content crumbs={crumbs}>
            <div className="search-results flex flex-col gap-2 md:gap-6">
                <h1 className="search-title">{title}</h1>
                <div className="results-display flex flex-col gap-4 md:gap-8">
                    <ul className="flex inset-shadow-[0_-0.25px_gray]">
                        {categories.map((category, index) => <li key={index} className={"px-2 cursor-pointer transition-colors border-b truncate " + (index == currentTab ? "border-b-black" : "border-b-transparent text-gray-600 hover:text-black")} onClick={() => onClickCategory(index)}>{`${category} (${results[category].nb}${results[category].nb == 10000 ? "+" : ""})`}</li>)}
                    </ul>
                    <div className="results-list grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-4 px-2 md:px-4">
                        { categories[currentTab] != "people" ?
                        results[categories[currentTab]].items.map((result, index) => (
                            <MovieResult key={index} title={(result as MovieItem).title} description={(result as MovieItem).description} imageUrl={(result as MovieItem).imageUrl} />
                        )) : results[categories[currentTab]].items.map((result, index) => (
                            <PersonResult key={index} name={(result as PersonItem).name} knownForDepartment={(result as PersonItem).knownForDepartment} knownFor={(result as PersonItem).knownFor} imageUrl={(result as PersonItem).imageUrl}></PersonResult>
                        ))}
                    </div>
                </div>
            </div>
        </Content>
    )
}