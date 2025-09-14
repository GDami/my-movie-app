import noImg from "/no-img.png"

type PersonResultProps = {
    name: string,
    knownForDepartment: string,
    knownFor: string[],
    imageUrl: string
}

export default function PersonResult(props: PersonResultProps) {
    return (
        <div className="box-content rounded-20 border border-gray-300 hover:bg-mouvise/5 h-23 select-none flex shadow-md shadow-black/20 overflow-clip hover:-translate-0.5 hover:shadow-lg hover:shadow-mouvise/50 hover:border-mouvise hover:text-mouvise hover:cursor-pointer transition-all">
            <img className="shrink-0 rounded-l-20 w-23 h-full object-cover flex justify-center items-center" src={props.imageUrl ? props.imageUrl : noImg} alt={"no img"}></img>
            <div className="flex flex-col justify-center p-3 gap-1 w-[calc(100%-92px)]">
                <div className="truncate"><span className="font-bold">{props.name}</span> - <span>{props.knownForDepartment}</span></div>
                <p className="relative text-gray-600 truncate w-[calc(100%)]">{props.knownFor.join(", ")}</p>
            </div>
        </div>
    )
}