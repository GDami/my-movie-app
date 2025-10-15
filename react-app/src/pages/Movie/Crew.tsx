import type { Person } from "./MovieDetails"

type CrewProps = {
    director: Person | undefined,
    writers: Person[],
    actors: Person[]
}

export default function Crew(props: CrewProps) {
    return (
        <div>
            <div className="w-fit flex items-center border-b-1 px-1">
                <i className='bx  bxs-community'  ></i>
                <span className="text-lg text-darkblue font-bold px-2 leading-[1.2]">Crew</span>
            </div>
            { props.director ? <span className="flex gap-2">
                <span className="font-bold">Directed by</span>
                <p>{props.director.name}</p>
            </span> : "" }
            { props.writers.length ? <span className="flex gap-2">
                <span className="font-bold">Written by</span>
                <p>{props.writers.map((person) => person.name).join(" · ")}</p>
            </span> : "" }
            { props.actors.length ? <span className="flex gap-2">
                <span className="font-bold">Starring</span>
                <p>{props.actors.slice(0, Math.min(4, props.actors.length)).map((person) => person.name).join(" · ")}</p>
            </span> : "" }
        </div>
    )
}