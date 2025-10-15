import { Link } from "react-router";
import type { Person } from "../../pages/Movie/MovieDetails";
import noImg from "/no-img.png"


type ActorCarousselProps = {
    actorsDetails: Person[]
}

export default function ActorCaroussel(props: ActorCarousselProps) {
    return (
        <div className="flex flex-col gap-1 relative shadow-lg-centered px-4 py-2 border border-darkblue/10">
            <div className="w-fit flex items-center border-b-1 px-1">
                <i className='bx  bxs-community'  ></i>
                <span className="text-lg text-darkblue font-bold px-2 leading-[1.2]">Actors</span>
            </div>
            <div className="overflow-x-scroll scrollbar-hidden">
                <div className="flex py-2 w-fit gap-4">
                    {props.actorsDetails.slice(0, Math.min(10, props.actorsDetails.length)).map((actor, index) => (
                        <Link to={"/"} key={index} className="flex flex-col w-40 gap-1 pb-2 rounded-md bg-darkblue/8 hover:bg-mouvise hover:border-mouvise transition-colors">
                            <img className="rounded-t w-40 aspect-2/3 object-cover" src={actor.imageUrl ? actor.imageUrl : noImg} alt={`${actor.name} img`}></img>
                            <span className="flex-1 flex justify-center items-center text-center px-1">{actor.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="absolute top-0 right-0"></div>
        </div>
    )
}