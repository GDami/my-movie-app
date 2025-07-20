type SearchResultProps = {
    title: string,
    description: string
}

export default function SearchResult(props: SearchResultProps) {
    return (
        <div className="result">
            {props.title}
            {props.description}
        </div>
    )
}