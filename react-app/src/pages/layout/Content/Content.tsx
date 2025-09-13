import type { PropsWithChildren } from "react";
import Header from "../../../components/Header/Header";
import Breadcrumbs, { type BreadcrumbEntry } from "../../../components/Breadcrumbs/Breadcrumbs";

type ContentProps = {
    crumbs: BreadcrumbEntry[]
} & PropsWithChildren

export default function Content(props: ContentProps) {
    return (
        <div className="container max-w-full">
            <div className="max-w-7xl min-h-dvh mx-auto flex flex-col">
                <Header />
                <div className="content-container w-full flex justify-center px-10 flex-1">
                    <div className="content w-full rounded-t-20 bg-white px-8 pb-4 flex flex-col gap-8">
                        <Breadcrumbs crumbs={props.crumbs}/>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}