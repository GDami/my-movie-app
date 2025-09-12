import { Link } from "react-router";

export default function Breadcrumbs() {
    

    return (
        <div className="breadcrumbs w-fit text-sm text-gray-600 flex py-2 ">
            <Link to="/" className="breadcrumb hover:underline">Home</Link>&nbsp;&gt;&nbsp; 
            <Link to="/" className="breadcrumb hover:underline">Search results for "{"kick ass"}"</Link>
        </div>
    )
}