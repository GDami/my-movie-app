import { Link } from "react-router";

export default function Breadcrumbs() {
    return (
        <div className="breadcrumbs flex ">
            <Link to="/" className="breadcrumb">Home</Link>
        </div>
    )
}