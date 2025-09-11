type SearchResultProps = {
    title: string,
    description: string,
    imageUrl: string
}

export default function SearchResult(props: SearchResultProps) {
    return (
        <div className="hover:bg-white h-40 flex gap-3 rounded-20 shadow-sm overflow-clip hover:shadow-lg hover:cursor-pointer transition-shadow">
            <img className="border border-black rounded-20 h-full aspect-23/40 flex justify-center items-center" src={props.imageUrl} alt={"NO IMG"}></img>
            <div className="flex flex-col gap-2 py-3 pr-3">
                <p>{props.title}</p>
                <p className="text-gray-600">{props.description}</p>
            </div>
        </div>
    )
}