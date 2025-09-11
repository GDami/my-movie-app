import type { PropsWithChildren } from "react";
import Header from "../../../components/Header/Header";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

export default function Content(props: PropsWithChildren) {
    return (
        <div className="container max-w-full">
            <div className="max-w-7xl mx-auto">
                <Header />
                <div className="content-container w-full flex justify-center px-10">
                    <div className="content w-full rounded-t-20 bg-gray-50 px-8 pb-4 flex flex-col gap-8">
                        <Breadcrumbs />
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}