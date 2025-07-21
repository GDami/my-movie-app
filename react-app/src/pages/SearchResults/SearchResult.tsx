type SearchResultProps = {
    title: string,
    description: string
}

export default function SearchResult(props: SearchResultProps) {
    return (
        <div className="result border border-black p-4">
            {props.title}
            {props.description}
        </div>
    )
}