import express, { type Request, type Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.get("/", (request: Request, response: Response) => {
    response.send("Hello World !")
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
}).on("error", (error) => {
    throw new Error(error.message)
})