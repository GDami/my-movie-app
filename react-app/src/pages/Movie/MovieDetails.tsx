import { useLocation, useParams } from "react-router";
import Content from "../layout/Content/Content";
import APICaller from "../../singletons/APICaller";
import { useEffect, useState } from "react";

import noImg from "/no-img.png"
import type { BreadcrumbEntry } from "../../components/Breadcrumbs/Breadcrumbs";

type Person = {
    name: string,
    id: number,
    imageUrl: string
}

type MovieDetails = {
    title: string,
    date: string,
    duration: number,
    genres: string[],
    overview: string,
    rating: number,
    posterUrl: string,
    director: Person | undefined,
    writers: Person[],
    actors: Person[]
}

const emptyMovie: MovieDetails = {
    title: "", date: "", duration: 0, genres: [], overview: "Overview", rating: 5.0, posterUrl: "",
    director: undefined, writers: [], actors: []
}

export default function MovieDetails() {

    const [ details, setDetails ] = useState<MovieDetails>(emptyMovie)

    const params = useParams()
    const movieId = params.movieId!.split("-")[0]

    const apiCaller = APICaller.getInstance()

    async function fetchDetails() {
        console.log("querying movie details")
        const response = await apiCaller.getMovieDetails(movieId)
        const movieResponse = response.shift()
        const creditsResponse = response.shift()

        const newDetails: MovieDetails = structuredClone(emptyMovie)

        newDetails.title = movieResponse.title
        newDetails.date = movieResponse.release_date
        newDetails.duration = movieResponse.runtime
        newDetails.genres = movieResponse.genres.map((genre: { id:number, name: string}) => genre.name)
        newDetails.overview = movieResponse.overview
        newDetails.rating = movieResponse.vote_average
        newDetails.posterUrl = apiCaller.getPosterSource(movieResponse.poster_path, "w300")

        const directorEntry = creditsResponse.crew.find((member:any) => member.job == "Director")
        newDetails.director = {
            name: directorEntry.name,
            id: directorEntry.id,
            imageUrl: directorEntry.profile_url
        }

        const writerEntries = creditsResponse.crew.filter((member:any) => member.job == "Screenplay")
        newDetails.writers = []
        for (const writer of writerEntries) {
            newDetails.writers.push({
                name: writer.name,
                id: writer.id,
                imageUrl: writer.profile_url,
            })
        }

        newDetails.actors = []
        for (const actor of creditsResponse.cast) {
            newDetails.actors.push({
                name: actor.name,
                id: actor.id,
                imageUrl: actor.profile_url,
            })
        }

        console.log(newDetails)
        setDetails(newDetails)
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    const hours = Math.trunc(details.duration / 60)
    const minutes = details.duration % 60

    const location = useLocation()

    const crumbs: BreadcrumbEntry[] = [
        { link: location.pathname, display: "Movies" },
        { link: location.pathname, display: details.title }
    ]

    return (
        <Content crumbs={crumbs}>
            <div className="movie-details flex flex-col gap-2 md:gap-6">
                <div className="flex gap-8 md:gap-14">
                    <div className="shrink-0 poster-container">
                        <img className=" w-75 aspect-2/3 object-cover" src={details.posterUrl ? details.posterUrl : noImg} alt="no-img"></img>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-1">
                            <p className="chewy text-2xl">
                                <span className="font-bold">{`${details.title} `}</span>
                                <span className="text-gray-400">{details.date &&`(${details.date.substring(0,4)})`}</span>
                            </p>
                            <p className="text-gray-600 text-sm">
                                {hours ? <span>{`${hours}h `}</span> : ""}
                                {minutes ? <span>{`${minutes}min`}</span> : ""}
                                &nbsp;-&nbsp;
                                <span>{details.genres.join(" / ")}</span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xl font-bold">Overview</span>
                            <span>{details.overview}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            { details.director ? <p className="flex gap-2">
                                <span className="font-bold">Directed by</span>
                                <span>{details.director.name}</span>
                            </p> : "" }
                            { details.writers.length ? <p className="flex gap-2">
                                <span className="font-bold">Written by</span>
                                <span>{details.writers.map((person) => person.name).join(" - ")}</span>
                            </p> : "" }
                            { details.actors.length ? <p className="flex gap-2">
                                <span className="font-bold">Starring</span>
                                <span>{details.actors.slice(0, Math.min(4, details.actors.length)).map((person) => person.name).join(" - ")}</span>
                            </p> : "" }
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}