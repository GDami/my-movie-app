type OverviewProps = {
    overview: string
}

export default function Overview(props: OverviewProps) {
    return (
        <div>
            <div className="w-fit flex items-center border-b-1 px-1">
                <i className='bxr bxs-eye'  ></i> 
                <span className="text-lg text-darkblue font-bold px-2 leading-[1.2]">Overview</span>
            </div>
            <p className="text-justify">{props.overview}</p>
        </div>
    )
}