const baseUrl = "https://api.themoviedb.org/3/"

const searchEndpoints = {
    movies: "search/movie",
    shows: "search/tv",
    people: "search/person"
}

export type Category = keyof typeof searchEndpoints 

const authToken = "Bearer "

export default class APICaller {

    private static instance: APICaller | null = null

    private static apiKey: string
    private static apiToken: string

    private constructor() {
        APICaller.apiKey = import.meta.env.VITE_TMDB_KEY
        APICaller.apiToken = import.meta.env.VITE_TMDB_TOKEN
    }

    public static getInstance(): APICaller {
        if (this.instance === null) {
            this.instance = new APICaller()
        }

        return this.instance
    }

    public callAPI() {
        console.log("calling API...")
    }

    public async search(category: Category, query: string | null) {
        const endpoint = baseUrl + searchEndpoints[category]
        const url = endpoint + "?query=" + (query ? query : "")
        const request = new Request(url)
        request.headers.append("Authorization", authToken + APICaller.apiToken)

        return fetch(request)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Response error : ${response.status}`)
            }

            const result = await response.json()
            return result
        })
        .catch((error:any) => console.log(error.message))

    }
}