const baseUrl = "https://api.themoviedb.org/3/"

const searchEndpoints = {
    movies: "search/movie",
    shows: "search/tv",
    people: "search/person"
}

const configEndpoint = "configuration"

export type Category = keyof typeof searchEndpoints 

const authToken = "Bearer "

export default class APICaller {

    private static instance: APICaller | null = null

    private static apiKey: string
    private static apiToken: string

    private static imageBaseUrl: string
    private static backdropSizes: string[]
    private static posterSizes: string[]

    private constructor() {
        APICaller.apiKey = import.meta.env.VITE_TMDB_KEY
        APICaller.apiToken = import.meta.env.VITE_TMDB_TOKEN

        APICaller.initConfiguration()
    }

    private static makeRequest(url: string): Request {
        const request = new Request(url)
        request.headers.append("Authorization", authToken + APICaller.apiToken)
        return request
    }

    private static initConfiguration() {
        const endpoint = baseUrl + configEndpoint
        const request = APICaller.makeRequest(endpoint)

        fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Response error : ${response.status}`)
            }

            return response.json()
        })
        .then((json) => {
            APICaller.imageBaseUrl = json.images.secure_base_url
            APICaller.backdropSizes = json.images.backdrop_sizes
            APICaller.posterSizes = json.images.poster_sizes
        })
        .catch((error:any) => console.error(error.message))
    }

    public static getInstance(): APICaller {
        if (this.instance === null) {
            this.instance = new APICaller()
        }

        return this.instance
    }

    public async search(category: Category, query: string | null) {
        const endpoint = baseUrl + searchEndpoints[category]
        const url = endpoint + "?query=" + (query ? query : "")
        const request = APICaller.makeRequest(url)

        return fetch(request)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Response error : ${response.status}`)
            }

            const result = await response.json()

            return result
        })
        .then(async (json) => {
            for (let i = 0; i < json.results.length; i++) {
                if (json.results[i].poster_path) {
                    json.results[i].poster = APICaller.imageBaseUrl + APICaller.posterSizes[0] + json.results[i].poster_path
                } else if (json.results[i].backdrop_path) {
                    json.results[i].backdrop = APICaller.imageBaseUrl + APICaller.backdropSizes[0] + json.results[i].backdrop_path
                }
                console.log(json.results[i])
            }
            return json
        })
        .catch((error:any) => console.error(error.message))

    }
}