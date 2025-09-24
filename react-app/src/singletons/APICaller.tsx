const baseUrl = "https://api.themoviedb.org/3/"

const lookupEndpoints = {
    movies: "movie/",
    shows: "tv/",
    people: "person/"
}

const searchEndpoints = {
    movies: "search/movie",
    shows: "search/tv",
    people: "search/person"
}

const configEndpoint = "configuration"

const imdbUrl = "https://api.imdbapi.dev/titles/"

export type Category = keyof typeof searchEndpoints 

const authToken = "Bearer "

export default class APICaller {

    private static instance: APICaller | null = null

    private static apiKey: string
    private static apiToken: string

    private static imageBaseUrl: string
    private static backdropSizes: string[]
    private static posterSizes: string[]
    private static profileSizes: string[]

    private static configPromise: Promise<boolean | void>

    private constructor() {
        APICaller.apiKey = import.meta.env.VITE_TMDB_KEY
        APICaller.apiToken = import.meta.env.VITE_TMDB_TOKEN

        APICaller.configPromise = APICaller.initConfiguration()
    }

    private static makeRequest(url: string): Request {
        const request = new Request(url)
        request.headers.append("Authorization", authToken + APICaller.apiToken)
        return request
    }

    private static initConfiguration() {
        const endpoint = baseUrl + configEndpoint
        const request = APICaller.makeRequest(endpoint)

        return fetch(request)
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
            APICaller.profileSizes = json.images.profile_sizes

            return true
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
                    json.results[i].poster = this.getPosterSource(json.results[i].poster_path)
                } else if (json.results[i].backdrop_path) {
                    json.results[i].backdrop = this.getBackdropSource(json.results[i].backdrop_path)
                } else if (json.results[i].profile_path) {
                    json.results[i].profile = this.getProfileSource(json.results[i].profile_path)
                }
            }
            return json
        })
        .catch((error:any) => console.error(error.message))

    }

    public async getMovieDetails(movieId:string) {
        await APICaller.configPromise
        const endpoint = baseUrl + lookupEndpoints.movies
        const movieUrl = endpoint + movieId
        const movieRequest = APICaller.makeRequest(movieUrl)
        const creditsUrl = movieUrl + "/credits"
        const creditsRequest = APICaller.makeRequest(creditsUrl)

        const moviePromise = fetch(movieRequest)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Response error : ${response.status}`)
            }

            const result = await response.json()

            return result
        })
        .then (async (json) => {
            if (!json.imdb_id) {
                json.imdbRating = undefined
                return json
            }
            const imdbEndpoint = imdbUrl + json.imdb_id
            const imdbRating = await fetch(imdbEndpoint)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Response error : ${response.status}`)
                }

                const result = await response.json()

                return result.rating?.aggregateRating

            })

            json.imdbRating = imdbRating

            return json
        })
        .catch((error:any) => console.error(error.message))

        const creditsPromise = fetch(creditsRequest)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Response error : ${response.status}`)
            }

            const result = await response.json()

            return result
        })
        .then(async (json) => {
            for (const actor of json.cast) {
                if (actor.hasOwnProperty("profile_path") && actor.profile_path) {
                    actor.profile_url = APICaller.imageBaseUrl + APICaller.profileSizes[1] + actor.profile_path
                } else {
                    actor.profil_url = ""
                }
            }
            for (const member of json.crew) {
                if (member.hasOwnProperty("profile_path") && member.profile_path) {
                    member.profile_url = APICaller.imageBaseUrl + APICaller.profileSizes[1] + member.profile_path
                } else {
                    member.profil_url = ""
                }
            }
            return json
        })
        .catch((error:any) => console.error(error.message))

        return Promise.all([moviePromise, creditsPromise])
    }

    public getPosterSource(link: string, size?: string) {
        return APICaller.imageBaseUrl + (size ? size : APICaller.posterSizes[0]) + link
    }

    public getBackdropSource(link: string, size?: string) {
        return APICaller.imageBaseUrl + (size ? size : APICaller.backdropSizes[0]) + link
    }

    public getProfileSource(link: string, size?: string) {
        return APICaller.imageBaseUrl + (size ? size : APICaller.profileSizes[1]) + link
    }
}