import { PropsWithChildren } from "react";
import Header from "../../../components/Header/Header";

export default function Content(props: PropsWithChildren) {
    return (
        <div className="container max-w-full">
            <Header />
            <div className="content border border-black p-4 mx-auto max-w-7xl">
                {props.children}
            </div>
        </div>
    )
}