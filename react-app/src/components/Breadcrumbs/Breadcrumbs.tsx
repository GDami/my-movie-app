import { Link } from "react-router";

export type BreadcrumbEntry = {
    display:string,
    link:string
}

type BreadcrumbsProps = {
    crumbs: BreadcrumbEntry[]
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
    

    return (
        <div className="breadcrumbs w-fit text-sm text-gray-600 flex py-2 ">
            <Link to="/" className="breadcrumb hover:underline">Home</Link>
            <span>&nbsp;&gt;&nbsp;</span>
            {props.crumbs.map((crumb, index) => (
                <><Link key={index} to={crumb.link } className="breadcrumb hover:underline">{`${crumb.display}`}</Link>{index < props.crumbs.length - 1 && <span>&nbsp;&gt;&nbsp;</span>}</>
            ))}
        </div>
    )
}