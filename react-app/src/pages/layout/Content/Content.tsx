import { PropsWithChildren } from "react";
import Header from "../../../components/Header/Header";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

export default function Content(props: PropsWithChildren) {
    return (
        <div className="container max-w-full">
            <Header />
            <div className="content border border-black px-4 py-8 mx-auto max-w-7xl flex flex-col gap-8">
                <Breadcrumbs />
                {props.children}
            </div>
        </div>
    )
}