type MovieResultProps = {
    title: string,
    description: string,
    imageUrl: string
}

export default function MovieResult(props: MovieResultProps) {
    return (
        <div className="box-content border border-gray-300 hover:bg-white h-40 select-none flex shadow-md shadow-black/20 overflow-clip hover:-translate-0.5 hover:shadow-lg hover:shadow-mouvise/70 hover:border-mouvise hover:text-mouvise hover:cursor-pointer transition-all">
            <img className="shrink-0 h-full aspect-23/40 flex justify-center items-center" src={props.imageUrl ? props.imageUrl : undefined} alt={"no img"}></img>
            <div className="flex flex-col p-3 gap-1 mask-b-from-75%">
                <p className="font-bold">{props.title}</p>
                <p className={`relative text-gray-600 overflow-hidden ${props.description ? "" : "italic"}`}>{props.description ? props.description : "no summary"}</p>
            </div>
        </div>
    )
}