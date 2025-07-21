
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
}