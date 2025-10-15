import imdbLogo from "/imdb-logo.svg"
import tmdbLogo from "/tmdb-square.svg"

type RatingsProps = {
    imdbId: number,
    imdbRating: number,
    rating: number,
    id: number
}

export default function Ratings(props: RatingsProps) {

    const rating = Number(props.rating).toFixed(1)
    const imdbRating = props.imdbRating ? Number(props.imdbRating).toFixed(1) : " - "

    return (
        <div>
            <div className="w-fit flex items-center border-b-1 px-1">
                <i className='bxr bxs-star'  ></i>
                <span className="text-lg text-darkblue font-bold px-2 leading-[1.2]">Ratings</span>
            </div>
            {props.imdbId && props.imdbRating && <div className="h-8 flex items-center gap-2">
                <p>
                    <span className="font-bold text-darkblue">{imdbRating}</span>
                    <span className=""> / 10</span>
                </p>
                <span className="px-1">·</span>
                <a target="_blank" className="h-full" href={`https://www.imdb.com/title/${props.imdbId}`}><img className="h-full rounded-sm bg-[#f5c518]" src={imdbLogo} alt="imdb logo"></img></a>
            </div>}
            <div className="h-8 flex items-center gap-2">
                <p>
                    <span className="font-bold text-darkblue">{rating}</span>
                    <span className=""> / 10</span>
                </p>
                <span className="px-1">·</span>
                <a target="_blank" className="h-full" href={`https://www.themoviedb.org/movie/${props.id}`}><img className="h-full rounded-sm " src={tmdbLogo} alt="imdb logo"></img></a>
            </div>
        </div>
    )
}