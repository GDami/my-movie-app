type SearchResultProps = {
    title: string,
    description: string,
    imageUrl: string
}

export default function SearchResult(props: SearchResultProps) {
    return (
        <div className="hover:bg-white h-40 flex gap-3 p-3 shadow-sm overflow-clip hover:shadow-lg hover:cursor-pointer transition-shadow">
            <img className="h-full aspect-23/40 flex justify-center items-center" src={props.imageUrl ? props.imageUrl : undefined} alt={"no img"}></img>
            <div className="flex flex-col gap-2">
                <p>{props.title}</p>
                <p className="text-gray-600 overflow-hidden shadow-[inset_0_30px_40px_rgba(255,255,255,.1)]">{props.description}</p>
            </div>
        </div>
    )
}