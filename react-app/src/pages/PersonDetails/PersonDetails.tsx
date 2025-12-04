import { useParams } from "react-router"
import APICaller from "../../singletons/APICaller"
import { useState } from "react"

type PersonDetails = {
    name: string,
    gender: number,
    biography: string,
    birthday: string,
    deathday: string,
    knownForDepartment: string,

}

const emptyPerson: PersonDetails = {
    name: "",
    gender: 0,
    biography: "",
    birthday: "",
    deathday: "",
    knownForDepartment: "",
}

export default function PersonDetails() {

    const [ details, setDetails ] = useState<PersonDetails>(emptyPerson)

    const params = useParams()
    const movieId = params.movieId!.split("-")[0]

    const apiCaller = APICaller.getInstance()


    return (
        <></>
    )
}