type SearchResultProps = {
    title: string,
    description: string
}

export default function SearchResult(props: SearchResultProps) {
    return (
        <div className="h-40 flex gap-3 rounded-20 inset-shadow-lg inset-shadow-amber-300">
            <img className="border border-black rounded-20 h-full" alt={props.title + " img"}></img>
            <div className="flex flex-col gap-2">
                <p>{props.title}</p>
                <p className="text-gray-600">{props.description}</p>
            </div>
        </div>
    )
}